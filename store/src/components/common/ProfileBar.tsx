import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { SuccessToast } from "./toast/SuccessToast";
import { useMutation } from "react-query";
import { loginState, nameState } from "../../recoil/atom/common";
import { FailToast } from "./toast/FailToast";
import { logout } from "../../apis/auth";
import { useNavigate } from "react-router";

export default function ProfileBar() {
  const navigate = useNavigate();
  const resetLoginState = useResetRecoilState(loginState);
  const resetNameState = useResetRecoilState(nameState);
  const name = useRecoilValue(nameState);

  const logoutMutation = useMutation(["logout"], () => logout(), {
    onSuccess: () => {
      SuccessToast("로그아웃되었습니다.");
      resetLoginState();
      resetNameState();
      localStorage.removeItem("accessToken");
      navigate("/login");
    },
    onError: () => {
      FailToast(null);
    },
  });

  return (
    <div className="w-full h-[32px] mt-4">
      <div className="flex flex-row gap-2 mr-5 justify-end">
        <span>안녕하세요, {name}님</span>
        <Badge badgeContent={1} color="warning">
          <NotificationsIcon fontSize="medium" />
        </Badge>
        <button className="ml-10" onClick={() => logoutMutation.mutate()}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
