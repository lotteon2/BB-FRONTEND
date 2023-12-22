import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { kakaoLogin, login } from "../../apis/auth";
import { FailToast } from "../common/toast/FailToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  loginState,
  mallState,
  nicknameState,
  profileImageState,
} from "../../recoil/atom/common";
import { loginDto } from "../../recoil/common/interfaces";
import Loading from "../common/Loading";

export default function KakaoLoginRedirect() {
  const url = new URL(window.location.href);
  const code: string | null = url.searchParams.get("code");

  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const setNickname = useSetRecoilState<string>(nicknameState);
  const setProfileImage = useSetRecoilState<string>(profileImageState);
  const isMall = useRecoilValue<boolean>(mallState);

  const kakaoMutation = useMutation(["kakaoLogin"], () => kakaoLogin(code), {
    onSuccess: (data) => {
      loginMutation.mutate(data);
    },
    onError: () => {
      FailToast(null);
      navigate("/login");
    },
  });

  const loginMutation = useMutation(
    ["login"],
    (loginDto: loginDto) => login(loginDto),
    {
      onSuccess: (res) => {
        setIsLogin(true);
        setNickname(res.data.nickname);
        setProfileImage(res.data.profileImage);
        localStorage.setItem("accessToken", res.headers["authorization"]);
        isMall ? navigate("/") : navigate("/pickup");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    kakaoMutation.mutate();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-[1320px] mx-auto">
      <Loading />
    </div>
  );
}
