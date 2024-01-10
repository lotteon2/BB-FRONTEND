import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { SuccessToast } from "./toast/SuccessToast";
import { useMutation } from "react-query";
import { loginState, nameState, storeIdState } from "../../recoil/atom/common";
import { FailToast } from "./toast/FailToast";
import { logout } from "../../apis/auth";
import { useNavigate } from "react-router";
import {
  notiCountState,
  notiEventState,
  notiShowState,
} from "../../recoil/atom/noti";
import { getUnreadNotificationsCount } from "../../apis/noti";
import { useEffect } from "react";
import Notification from "./Notification";

export default function ProfileBar() {
  const navigate = useNavigate();
  const resetLoginState = useResetRecoilState(loginState);
  const resetNameState = useResetRecoilState(nameState);
  const resetStoreIdState = useResetRecoilState(storeIdState);
  const name = useRecoilValue(nameState);
  const storeId = useRecoilValue<number>(storeIdState);
  const isLogin = useRecoilValue<boolean>(loginState);
  const notiEvent = useRecoilValue<boolean>(notiEventState);
  const [isNotiShow, setNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiCount, setNotiCount] = useRecoilState<number>(notiCountState);

  const logoutMutation = useMutation(["logout"], () => logout(), {
    onSuccess: () => {
      navigate("/login");
      SuccessToast("로그아웃되었습니다.");
      resetLoginState();
      resetNameState();
      resetStoreIdState();
      localStorage.removeItem("accessToken");
    },
    onError: () => {
      FailToast(null);
    },
  });

  const notiCountMutate = useMutation(
    ["getUnreadNotificationsCount", notiEvent],
    () => getUnreadNotificationsCount(storeId),
    {
      onSuccess: (data) => {
        setNotiCount(data.data.unreadCount);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && storeId !== null) notiCountMutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, notiEvent, storeId]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && storeId !== null) notiCountMutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotiShow]);

  return (
    <div className="w-full h-[32px] mt-4">
      <div className="flex flex-row gap-2 mr-5 justify-end">
        <span>안녕하세요, {name}님</span>
        <button onClick={() => setNotiShow((cur) => !cur)}>
          <Badge badgeContent={notiCount} color="warning">
            <NotificationsIcon fontSize="medium" />
          </Badge>
        </button>
        <div className="absolute top-[48px] right-5 z-20">
          <Notification />
        </div>
        <button className="ml-10" onClick={() => logoutMutation.mutate()}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
