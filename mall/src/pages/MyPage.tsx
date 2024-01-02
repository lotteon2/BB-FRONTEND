import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, sideMenuState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import MyInfo from "../components/mypage/MyInfo";
import MyPageHeader from "../components/mypage/MyPageHeader";
import Withdraw from "../components/mypage/section/Withdraw";
import ModifyMemberInfo from "../components/mypage/section/ModifyMemberInfo";
import MyCouponList from "../components/mypage/section/MyCouponList";
import MyQuestions from "../components/mypage/section/MyQuestions";
import MySubscription from "../components/mypage/section/MySubscription";
import MyWishList from "../components/mypage/section/MyWishList";
import MyOrderList from "../components/mypage/section/MyOrderList";
import MyPickupOrderList from "../components/mypage/section/MyPickupOrderList";
import MyReviewList from "../components/mypage/section/MyReviewList";
import { useMutation } from "react-query";
import { productWishState, storeWishState } from "../recoil/atom/member";
import { modifyStoreWishList, modifyWishList } from "../apis/member";
import { FailToast } from "../components/common/toast/FailToast";
import MyGiftCardList from "../components/mypage/section/MyGiftCardList";

export default function MyPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [selected, setSelected] = useState<string>("주문/배송");
  const sidebar = useRecoilValue<number>(sideMenuState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);

  const productWishMutation = useMutation(
    ["modifyWishList"],
    () => modifyWishList(productWishList),
    {
      onSuccess: () => {
        setProductWishList([]);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const storeWishMutation = useMutation(
    ["modifyStoreWishList"],
    () => modifyStoreWishList(storeWishList),
    {
      onSuccess: () => {
        setStoreWishList([]);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

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
    } else {
      productWishMutation.mutate();
      storeWishMutation.mutate();
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
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                주문/배송
              </p>
              <MyOrderList />
            </div>
          ) : selected === "예약/픽업" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                예약/픽업
              </p>
              <MyPickupOrderList />
            </div>
          ) : selected === "위시리스트" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                위시리스트
              </p>
              <MyWishList />
            </div>
          ) : selected === "최근상품" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                최근 본 상품
              </p>
            </div>
          ) : selected === "구독관리" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                구독 관리
              </p>
              <MySubscription />
            </div>
          ) : selected === "상품문의" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                상품 문의
              </p>
              <MyQuestions />
            </div>
          ) : selected === "상품후기" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                상품 후기
              </p>
              <MyReviewList />
            </div>
          ) : selected === "기프트카드" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                기프트 카드
              </p>
              <MyGiftCardList />
            </div>
          ) : selected === "회원정보" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                회원정보 수정
              </p>
              <ModifyMemberInfo />
            </div>
          ) : selected === "쿠폰관리" ? (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                쿠폰 관리
              </p>
              <MyCouponList />
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold pb-2 border-b-[1px]">
                회원 탈퇴 안내
              </p>
              <Withdraw />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
