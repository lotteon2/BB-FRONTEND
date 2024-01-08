import { useRecoilValue, useSetRecoilState } from "recoil";
import { notiEventState, notiShowState } from "../../recoil/atom/noti";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAllNotifications } from "../../apis/noti";
import { FailToast } from "./toast/FailToast";
import { Empty } from "antd";
import { notiDto } from "../../recoil/common/interfaces";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const isNotiShow = useRecoilValue<boolean>(notiShowState);
  const setNotiEvent = useSetRecoilState<boolean>(notiEventState);
  const [notiList, setNotiList] = useState<notiDto[]>([]);

  const subscribeUrl = `${process.env.REACT_APP_API_URL}/notification/subscribe/customer`;

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

      getAllNotiMutation.mutate();

      return () => eventSource.close();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {isNotiShow ? (
        <div className="w-60 max-h-80 bg-grayscale1 overflow-auto rounded-sm shadow-lg">
          {notiList.length === 0 ? (
            <Empty description="알림이 없습니다." className="my-10" />
          ) : (
            <div className="py-1 px-2">
              {notiList.map((item: notiDto) => (
                <p
                  className="my-2 cursor-pointer hover:font-bold"
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
