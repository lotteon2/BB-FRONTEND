import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { SuccessToast } from "./toast/SuccessToast";
import { useMutation } from "react-query";
import { loginState } from "../../recoil/atom/common";
import { FailToast } from "./toast/FailToast";
import { logout } from "../../apis/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {
  notiCountState,
  notiEventState,
  notiShowState,
} from "../../recoil/atom/noti";
import { getUnreadNotificationsCount } from "../../apis/noti";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import Notification from "./Notification";

export default function ProfileBar() {
  const navigate = useNavigate();
  const resetLoginState = useResetRecoilState(loginState);
  const isLogin = useRecoilValue<boolean>(loginState);
  const notiEvent = useRecoilValue<boolean>(notiEventState);
  const setNotiShow = useSetRecoilState<boolean>(notiShowState);
  const [notiCount, setNotiCount] = useRecoilState<number>(notiCountState);

  const logoutMutation = useMutation(["logout"], () => logout(), {
    onSuccess: () => {
      SuccessToast("로그아웃되었습니다.");
      resetLoginState();
      localStorage.removeItem("accessToken");
      navigate("/login");
    },
    onError: () => {
      FailToast(null);
    },
  });

  const notiCountMutate = useMutation(
    ["getUnreadNotificationsCount", notiEvent],
    () => getUnreadNotificationsCount(),
    {
      onSuccess: (data) => {
        setNotiCount(data.data.unreadCount);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) notiCountMutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, notiEvent]);

  return (
    <div className="w-full h-[32px] mt-4">
      <div className="flex flex-row gap-2 mr-5 justify-end">
        <span>안녕하세요, 관리자님</span>
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
