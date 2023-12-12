import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState, sideMenuState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import MyInfo from "../components/mypage/MyInfo";
import MyPageHeader from "../components/mypage/MyPageHeader";
import Withdraw from "../components/mypage/section/Withdraw";

export default function MyPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [selected, setSelected] = useState<string>("주문/배송");
  const sidebar = useRecoilValue<number>(sideMenuState);

  useEffect(() => {
    sidebar === 1
      ? setSelected("위시리스트")
      : sidebar === 2
      ? setSelected("최근상품")
      : setSelected("주문/배송");
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
        <div className="mt-10">
          {selected === "주문/배송" ? (
            <div>
              <p className="text-2xl font-bold">주문/배송</p>
            </div>
          ) : selected === "예약/픽업" ? (
            <div>
              <p className="text-2xl font-bold">예약/픽업</p>
            </div>
          ) : selected === "위시리스트" ? (
            <div>
              <p className="text-2xl font-bold">위시리스트</p>
            </div>
          ) : selected === "최근상품" ? (
            <div>
              <p className="text-2xl font-bold">최근 본 상품</p>
            </div>
          ) : selected === "구독관리" ? (
            <div>
              <p className="text-2xl font-bold">구독 관리</p>
            </div>
          ) : selected === "상품문의" ? (
            <div>
              <p className="text-2xl font-bold">상품 문의</p>
            </div>
          ) : selected === "상품후기" ? (
            <div>
              <p className="text-2xl font-bold">상품 후기</p>
            </div>
          ) : selected === "회원정보" ? (
            <div>
              <p className="text-2xl font-bold">회원정보 수정</p>
            </div>
          ) : selected === "쿠폰관리" ? (
            <div>
              <p className="text-2xl font-bold">쿠폰 관리</p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold">회원 탈퇴 안내</p>
              <Withdraw />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
