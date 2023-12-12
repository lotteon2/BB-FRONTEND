import { useState } from "react";
import { Checkbox, Button } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FailToast } from "../../common/toast/FailToast";
import { useMutation } from "react-query";
import { withdraw } from "../../../apis/member";
import { useResetRecoilState } from "recoil";
import {
  locationstate,
  loginState,
  mallState,
  nicknameState,
  profileImageState,
  sideMenuState,
} from "../../../recoil/atom/common";
import { productWishState, storeWishState } from "../../../recoil/atom/member";
import {
  cartOrderState,
  orderInfoState,
  orderState,
  pickupOrderState,
  subscriptionOrderState,
} from "../../../recoil/atom/order";

export default function Withdraw() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const resetIsLoginState = useResetRecoilState(loginState);
  const resetMallState = useResetRecoilState(mallState);
  const resetSideMenuState = useResetRecoilState(sideMenuState);
  const resetNickname = useResetRecoilState(nicknameState);
  const resetProfileImage = useResetRecoilState(profileImageState);
  const resetLocation = useResetRecoilState(locationstate);
  const resetProductWish = useResetRecoilState(productWishState);
  const resetStoreWish = useResetRecoilState(storeWishState);
  const resetPickupOrder = useResetRecoilState(pickupOrderState);
  const resetOrder = useResetRecoilState(orderState);
  const resetSubscribeOrder = useResetRecoilState(subscriptionOrderState);
  const reseetOrderInfo = useResetRecoilState(orderInfoState);
  const resetCartOrder = useResetRecoilState(cartOrderState);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleWithdraw = () => {
    if (isChecked) {
      withdrawMutation.mutate();
    } else {
      alert("유의사항 항목에 동의해주세요.");
    }
  };

  const withdrawMutation = useMutation(["withdraw"], () => withdraw("kakao"), {
    onSuccess: () => {
      resetIsLoginState();
      resetMallState();
      resetSideMenuState();
      resetNickname();
      resetProfileImage();
      resetLocation();
      resetProductWish();
      resetStoreWish();
      resetPickupOrder();
      resetOrder();
      resetSubscribeOrder();
      reseetOrderInfo();
      resetCartOrder();
    },
    onError: () => {
      FailToast(null);
    },
  });

  return (
    <div>
      <div className="border-b-[1px] border-grayscale7 my-2"></div>
      <p className="mb-5 text-[1.2rem]">회원탈퇴 전 유의사항을 확인해주세요.</p>
      <ul className="flex flex-col gap-3 font-light">
        <li>
          • 부정 이용을 방지하기 위해 회원탈퇴 후 24시간 이내로 재가입이
          불가합니다.
        </li>
        <li>• 회원탈퇴 후 사용하시던 쿠폰 혜택은 복원할 수 없습니다.</li>
        <li>
          • 회원탈퇴 후 쿠폰을 비롯한 모든 배송/예약 주문의 취소/환불이
          불가능합니다.
        </li>
        <li>
          • 탈퇴 즉시 개인정보가 삭제되면 어떠한 방법으로도 복원할 수 없습니다.
        </li>
        <li>
          • 교환/반품/환불 및 사후처리(A/S) 등을 위하여 전자상거래 등에서의
          소비자보호에 관한 법률에 의거해 일정 기간동안 보관 후 파기됩니다.
        </li>
      </ul>
      <div className="mt-10">
        <Checkbox style={{ fontSize: 15 }} onChange={onChange}>
          위 유의사항을 모두 확인하였고, 회원탈퇴에 동의합니다.
        </Checkbox>
      </div>
      <div className="border-b-[1px] border-grayscale5 my-5"></div>
      <div className="flex justify-center">
        <Button
          size="large"
          style={{
            paddingLeft: 50,
            paddingRight: 50,
          }}
          onClick={handleWithdraw}
        >
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
}
