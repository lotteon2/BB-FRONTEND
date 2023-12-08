import { useState } from "react";
import { useQuery } from "react-query";
import {
  couponForPayDto,
  pickupOrderDto,
} from "../../recoil/common/interfaces";
import { getValidCouponListForPayment } from "../../apis/store";
import Loading from "../common/Loading";
import { couponListForPay } from "../../mocks/order";
import CouponBg from "../../assets/images/coupon.png";
import { useRecoilState } from "recoil";
import { pickupOrderState } from "../../recoil/atom/order";
import { Button } from "antd";

interface param {
  handleCancel: () => void;
}
export default function MyCouponModal(param: param) {
  const [pickupOrder, setPickupOrder] =
    useRecoilState<pickupOrderDto>(pickupOrderState);
  const [couponId, setCouponId] = useState<number>(pickupOrder.couponId);
  const [couponAmount, setCouponAmount] = useState<number>(
    pickupOrder.couponAmount
  );

  const handleCoupon = () => {
    setPickupOrder((prev) => ({
      ...prev,
      couponId: couponId,
      couponAmount: couponAmount,
    }));

    param.handleCancel();
  };

  //   const data = couponListForPay;
  const { data, isLoading } = useQuery({
    queryKey: ["getValidCouponListForPayment"],
    queryFn: () =>
      getValidCouponListForPayment(
        pickupOrder.storeId,
        pickupOrder.actualAmount
      ),
  });

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full mt-10 text-center">
      {data.data.map((item: couponForPayDto) => (
        <div
          key={item.couponId}
          className={`w-[80%] mx-auto relative pb-5 pr-3 text-left ${
            item.isAvailable ? "cursor-pointer" : "opacity-60"
          }`}
          onClick={() => {
            if (item.isAvailable) {
              setCouponId(item.couponId);
              setCouponAmount(item.discountPrice);
            }
          }}
        >
          <img
            src={CouponBg}
            alt="쿠폰 배경"
            className={
              pickupOrder.couponId === item.couponId
                ? "border-4 border-primary4"
                : ""
            }
          />
          <div className="absolute top-0 left-0 w-full h-full text-grayscale1 p-3">
            <p className="max-[600px]:text-[0.8rem] max-[400px]:text-[0.6rem]">
              {item.storeName}
            </p>
            <p className="font-bold text-[1.5rem] max-[600px]:text-[1.2rem] max-[400px]:text-[0.9rem]">
              {item.couponName}
            </p>
            <p className="font-extrabold text-6xl max-[600px]:text-5xl max-[400px]:text-2xl">
              {item.discountPrice.toLocaleString()}원
            </p>
            <p className="mt-2 max-[600px]:text-[0.8rem] max-[400px]:text-[0.6rem]">
              {item.endDate}까지
            </p>
            <p className="max-[600px]:text-[0.8rem] max-[400px]:text-[0.6rem]">
              최소 주문금액: {item.minPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      ))}
      <Button
        size="large"
        style={{
          width: 370,
          height: 60,
          backgroundColor: "#315136",
          marginRight: 10,
        }}
        type="primary"
        onClick={handleCoupon}
      >
        적용하기
      </Button>
    </div>
  );
}
