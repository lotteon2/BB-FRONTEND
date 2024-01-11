import { useRecoilValue, useSetRecoilState } from "recoil";
import { notiEventState, notiShowState } from "../../recoil/atom/noti";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAllNotifications } from "../../apis/noti";
import { FailToast } from "./toast/FailToast";
import { Empty } from "antd";
import { notiDto } from "../../recoil/common/interfaces";
import { EventSourcePolyfill } from "event-source-polyfill";
import { storeIdState } from "../../recoil/atom/common";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const storeId = useRecoilValue<number>(storeIdState);
  const isNotiShow = useRecoilValue<boolean>(notiShowState);
  const setNotiEvent = useSetRecoilState<boolean>(notiEventState);
  const [notiList, setNotiList] = useState<notiDto[]>([]);

  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification/subscribe/manager/${storeId}`;

  const getAllNotiMutation = useMutation(
    ["getAllNotifications"],
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
        heartbeatTimeout: 86400000,
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
        });

        eventSource.addEventListener("PICKUP", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SUBSCRIBE", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SETTLEMENT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("OUT_OF_STOCK", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("ORDERCANCEL", () => {
          setNotiEvent((cur) => !cur);
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
        });

        eventSource.addEventListener("PICKUP", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SUBSCRIBE", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("SETTLEMENT", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("OUT_OF_STOCK", () => {
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("ORDERCANCEL", () => {
          setNotiEvent((cur) => !cur);
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

  return (
    <div>
      {isNotiShow ? (
        <div className="w-64 max-h-80 bg-grayscale1 overflow-auto rounded-sm shadow-lg">
          {notiList.length === 0 ? (
            <Empty description="알림이 없습니다." className="my-10" />
          ) : (
            <div className="py-1 px-2">
              <p className="font-bold pb-2 border-b-2 border-grayscale7">
                알림
              </p>
              {notiList.map((item: notiDto) => (
                <p
                  className="my-3 cursor-pointer hover:font-bold"
                  key={item.notificationId}
                  onClick={() => navigate(item.notificationLink)}
                >
                  {item.notificationContent}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
