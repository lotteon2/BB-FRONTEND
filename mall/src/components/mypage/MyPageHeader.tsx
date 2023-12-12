interface param {
  selected: string;
  setSelected: (selected: string) => void;
}

export default function MyPageHeader(param: param) {
  return (
    <div className="flex flex-col gap-5 max-[840px]:flex-row">
      <p className="text-3xl font-bold w-[120px]">MY 쇼핑</p>
      <div className="flex flex-col gap-5 font-thin max-[840px]:flex-row max-[500px]:flex-col">
        <div>
          <p className="text-2xl font-regular border-b-[1px] border-grayscale3">
            나의 쇼핑
          </p>
          <p
            className={
              param.selected === "주문/배송"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("주문/배송")}
          >
            주문/배송
          </p>
          <p
            className={
              param.selected === "예약/픽업"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("예약/픽업")}
          >
            예약/픽업
          </p>
          <p
            className={
              param.selected === "위시리스트"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("위시리스트")}
          >
            위시리스트
          </p>
          <p
            className={
              param.selected === "최근상품"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("최근상품")}
          >
            최근 본 상품
          </p>
        </div>
        <div>
          <p className="text-2xl font-regular border-b-[1px] border-grayscale3">
            나의 구독
          </p>
          <p
            className={
              param.selected === "구독관리"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("구독관리")}
          >
            구독 관리
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 font-thin max-[840px]:flex-row  max-[500px]:flex-col">
        <div>
          <p className="text-2xl font-regular border-b-[1px] border-grayscale3">
            나의 활동
          </p>
          <p
            className={
              param.selected === "상품문의"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("상품문의")}
          >
            상품 문의
          </p>
          <p
            className={
              param.selected === "상품후기"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("상품후기")}
          >
            상품 후기
          </p>
        </div>
        <div>
          <p className="text-2xl font-regular border-b-[1px] border-grayscale3">
            나의 정보
          </p>
          <p
            className={
              param.selected === "회원정보"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("회원정보")}
          >
            회원정보 수정
          </p>
          <p
            className={
              param.selected === "쿠폰관리"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("쿠폰관리")}
          >
            쿠폰 관리
          </p>
          <p
            className={
              param.selected === "회원탈퇴"
                ? "font-regular cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => param.setSelected("회원탈퇴")}
          >
            회원 탈퇴
          </p>
        </div>
      </div>
    </div>
  );
}
