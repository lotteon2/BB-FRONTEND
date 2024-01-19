import { useRecoilState, useRecoilValue } from "recoil";
import { notiEventState, notiShowState } from "../../recoil/atom/noti";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAllNotifications, modifyNotiState } from "../../apis/noti";
import { FailToast } from "./toast/FailToast";
import { Empty } from "antd";
import { notiDto } from "../../recoil/common/interfaces";
import { EventSourcePolyfill } from "event-source-polyfill";
import { storeIdState } from "../../recoil/atom/common";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/noti.mp3";

export default function NotificationDropDown() {
  const navigate = useNavigate();
  const storeId = useRecoilValue<number>(storeIdState);
  const [isNotiShow, setIsNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiEvent, setNotiEvent] = useRecoilState<boolean>(notiEventState);
  const [notiList, setNotiList] = useState<notiDto[]>([]);

  const notiOption = {
    badge: "https://i.ibb.co/10mtrnW/Group-1000004121.png",
    icon: "",
  };
  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification/subscribe/manager/${storeId}`;

  const getAllNotiMutation = useMutation(
    ["getAllNotifications", notiEvent],
    () => getAllNotifications(storeId),
    {
      onSuccess: (data) => {
        setNotiList(data.data.notifications);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const handleCheckAll = () => {
    let list: number[] = [];

    notiList.forEach((item) => {
      list.push(item.notificationId);
    });

    checkMutation.mutate(list);
  };

  const checkMutation = useMutation(
    ["modifyNotiState"],
    (list: number[]) => modifyNotiState(list, storeId),
    {
      onSuccess: () => {
        setIsNotiShow(false);
        setNotiEvent((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    const accesToken = localStorage.getItem("accessToken");

    if (accesToken && storeId !== null) {
      let eventSource = new EventSourcePolyfill(subscribeUrl, {
        headers: {
          "Content-Type": "text/event-stream",
          "Access-Control-Allow-Origin": "",
          Authorization: `${localStorage.getItem("accessToken")}`,
          "Cache-Control": "no-cache",
          // storeId: storeId.toString(),
        },
        withCredentials: true,
      });

      eventSource.onerror = () => {
        eventSource.close();
        eventSource = new EventSourcePolyfill(subscribeUrl, {
          headers: {
            "Content-Type": "text/event-stream",
            "Access-Control-Allow-Origin": "",
            Authorization: `${localStorage.getItem("accessToken")}`,
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
        });

        eventSource.addEventListener("CONNECT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("QUESTION", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SHOPPINGMALL", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("PICKUP", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("SUBSCRIBE", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("SETTLEMENT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("OUT_OF_STOCK", () => {
          setNotiEvent((cur) => !cur);
          new Notification("재고가 부족합니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("ORDERCANCEL", () => {
          setNotiEvent((cur) => !cur);
          new Notification("주문이 취소되었습니다.", notiOption);
          new Audio(sound).play();
        });
      };

      eventSource.onopen = () => {
        eventSource.addEventListener("CONNECT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("QUESTION", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SHOPPINGMALL", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("PICKUP", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("SUBSCRIBE", () => {
          setNotiEvent((cur) => !cur);
          new Notification("신규 주문이 접수되었습니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("SETTLEMENT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("OUT_OF_STOCK", () => {
          setNotiEvent((cur) => !cur);
          new Notification("재고가 부족합니다.", notiOption);
          new Audio(sound).play();
        });

        eventSource.addEventListener("ORDERCANCEL", () => {
          setNotiEvent((cur) => !cur);
          new Notification("주문이 취소되었습니다.", notiOption);
          new Audio(sound).play();
        });
      };

      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && storeId !== null) getAllNotiMutation.mutate();

      return () => eventSource.close();
    }
    // eslint-disable-next-line
  }, [storeId]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && storeId !== null) getAllNotiMutation.mutate();
    // eslint-disable-next-line
  }, [isNotiShow]);

  useEffect(() => {
    if (!Notification) return;

    if (Notification.permission !== "granted") {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission().then((permission) => {
            if (permission !== "granted") return;
          });
        }
      }
    }
  }, []);
  return (
    <div>
      {isNotiShow ? (
        <div className="bg-grayscale1 rounded-sm shadow-lg text-left">
          <div className="w-64 max-h-80 overflow-auto">
            {notiList.length === 0 ? (
              <Empty description="알림이 없습니다." className="my-10" />
            ) : (
              <div className="py-1 px-2">
                <p className="font-bold pb-2 border-b-2 border-grayscale7">
                  알림
                </p>
                {notiList.map((item: notiDto) => (
                  <p
                    className={`my-3 cursor-pointer hover:font-bold ${
                      item.isRead ? "text-grayscale4" : ""
                    }`}
                    key={item.notificationId}
                    onClick={() => {
                      checkMutation.mutate([item.notificationId]);
                      navigate(item.notificationLink);
                      setIsNotiShow(false);
                    }}
                  >
                    {item.notificationContent}
                  </p>
                ))}
              </div>
            )}
          </div>
          {notiList.length === 0 ? (
            ""
          ) : (
            <div
              className="text-right text-[0.8rem] font-light p-2 cursor-pointer"
              onClick={handleCheckAll}
            >
              전체 읽음
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
