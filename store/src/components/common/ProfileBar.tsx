import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
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

export default function ProfileBar() {
  const navigate = useNavigate();
  const resetLoginState = useResetRecoilState(loginState);
  const resetNameState = useResetRecoilState(nameState);
  const resetStoreIdState = useResetRecoilState(storeIdState);
  const name = useRecoilValue(nameState);
  const storeId = useRecoilValue<number>(storeIdState);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [isNotiShow, setIsNotiShow] = useRecoilState<boolean>(notiShowState);
  const [notiCount, setNotiCount] = useRecoilState<number>(notiCountState);
  const notiEvent = useRecoilValue<boolean>(notiEventState);

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
    if (accessToken !== null && storeId !== 0) notiCountMutate.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, notiEvent, isNotiShow, storeId]);

  return (
    <div className="w-full h-[32px] mt-4">
      <div className="flex flex-row gap-2 mr-5 justify-end">
        <span>안녕하세요, {name}님</span>
        <button onClick={() => setIsNotiShow((cur) => !cur)}>
          <Badge badgeContent={notiCount} color="warning">
            <NotificationsIcon fontSize="medium" />
          </Badge>
        </button>
        <button className="ml-10" onClick={() => logoutMutation.mutate()}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
