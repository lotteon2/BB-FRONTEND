import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState, sideMenuState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import MyInfo from "../components/mypage/MyInfo";
import MyPageHeader from "../components/mypage/MyPageHeader";

export default function MyPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [selected, setSelected] = useState<string>("마이페이지");
  const sidebar = useRecoilValue<number>(sideMenuState);

  useEffect(() => {
    sidebar === 1
      ? setSelected("위시리스트")
      : sidebar === 2
      ? setSelected("최근상품")
      : setSelected("마이페이지");
  }, [sidebar]);

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row gap-10 max-[840px]:flex-col p-2">
      <div>
        <MyPageHeader selected={selected} setSelected={setSelected} />
      </div>
      <div className="w-full">
        <MyInfo setSelected={setSelected} />
      </div>
    </div>
  );
}
