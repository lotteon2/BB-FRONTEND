import { useRecoilState, useRecoilValue } from "recoil";
import { notiEventState, notiShowState } from "../../recoil/atom/noti";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAllNotifications } from "../../apis/noti";
import { FailToast } from "./toast/FailToast";
import { Empty } from "antd";
import { notiDto } from "../../recoil/common/interfaces";
import { EventSourcePolyfill } from "event-source-polyfill";
import { storeIdState } from "../../recoil/atom/common";

export default function Notification() {
  const storeId = useRecoilValue<number>(storeIdState);
  const isNotiShow = useRecoilValue<boolean>(notiShowState);
  const [notiEvent, setNotiEvent] = useRecoilState<boolean>(notiEventState);
  const [notiList, setNotiList] = useState<notiDto[]>([]);

  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification/subscribe/manager/${storeId}`;

  const getAllNotiMutation = useMutation(
    ["getAllNotifications"],
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

  useEffect(() => {
    getAllNotiMutation.mutate();
  }, [notiEvent]);

  useEffect(() => {
    const accesToken = localStorage.getItem("accessToken");

    if (accesToken && storeId !== 0) {
      let eventSource = new EventSourcePolyfill(subscribeUrl, {
        headers: {
          "Content-Type": "text/event-stream",
          "Access-Control-Allow-Origin": "",
          Authorization: `${localStorage.getItem("accessToken")}`,
          "Cache-Control": "no-cache",
          //   storeId: storeId.toString(),
        },
        heartbeatTimeout: 86400000,
        withCredentials: true,
      });

      eventSource.onopen = () => {
        eventSource.addEventListener("CONNECT", () => {
          console.log("CONNECT!!!");
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("QUESTION", () => {
          console.log("!!!!!!!!!!");
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

      eventSource.onerror = () => {
        eventSource.close();
        eventSource = new EventSourcePolyfill(subscribeUrl, {
          headers: {
            "Content-Type": "text/event-stream",
            "Access-Control-Allow-Origin": "",
            Authorization: `${localStorage.getItem("accessToken")}`,
            "Cache-Control": "no-cache",
            // storeId: storeId.toString(),
          },
          heartbeatTimeout: 86400000,
          withCredentials: true,
        });

        eventSource.addEventListener("CONNECT", () => {
          console.log("CONNECT!!!");
          setNotiEvent((cur) => !cur);
        });

        eventSource.addEventListener("QUESTION", (event: any) => {
          console.log("!!!!!!!!!!" + event);
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

      getAllNotiMutation.mutate();

      return () => eventSource.close();
    }
  }, [storeId]);

  return (
    <div>
      {isNotiShow ? (
        <div className="w-60 max-h-80 bg-grayscale1 overflow-auto rounded-sm shadow-lg">
          {notiList.length === 0 ? (
            <Empty description="알림이 없습니다." className="my-10" />
          ) : (
            <div className="py-3 px-2">
              {notiList.map((item: notiDto) => (
                <p className="my-2" key={item.notificationId}>
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
