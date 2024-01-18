import { useRecoilState } from "recoil";
import { notiEventState, notiShowState } from "../../recoil/atom/noti";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAllNotifications, modifyNotiState } from "../../apis/noti";
import { FailToast } from "./toast/FailToast";
import { Empty } from "antd";
import { notiDto } from "../../recoil/common/interfaces";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const [isNotiShow, setIsNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiEvent, setNotiEvent] = useRecoilState<boolean>(notiEventState);
  const [notiList, setNotiList] = useState<notiDto[]>([]);

  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification/subscribe/customer`;

  const getAllNotiMutation = useMutation(
    ["getAllNotifications", isNotiShow, notiEvent],
    () => getAllNotifications(),
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
    (list: number[]) => modifyNotiState(list),
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

    if (accesToken) {
      let eventSource = new EventSourcePolyfill(subscribeUrl, {
        headers: {
          "Content-Type": "text/event-stream",
          "Access-Control-Allow-Origin": "",
          Authorization: `${localStorage.getItem("accessToken")}`,
          "Cache-Control": "no-cache",
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

        eventSource.addEventListener("DELIVERY", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("RESALE", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("INQUERY", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("INVALID_COUPON", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("ORDER_SUCCESS", () => {
          setNotiEvent((cur) => !cur);
        });
      };

      eventSource.onopen = () => {
        eventSource.addEventListener("CONNECT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("DELIVERY", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("RESALE", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("INQUERY", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("INVALID_COUPON", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("ORDER_SUCCESS", () => {
          setNotiEvent((cur) => !cur);
        });
      };

      return () => eventSource.close();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isNotiShow) {
      getAllNotiMutation.mutate();
    }
    // eslint-disable-next-line
  }, [isNotiShow]);
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
