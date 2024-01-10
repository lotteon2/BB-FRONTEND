import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { couponForPayDto } from "../../../recoil/common/interfaces";
import { getValidCouponListForPayment } from "../../../apis/store";
import Loading from "../../common/Loading";
import CouponBg from "../../../assets/images/coupon.png";
import { Button, Empty } from "antd";

interface param {
  handleCancel: () => void;
  handleCoupons: (couponId: number | null, couponAmount: number) => void;
  storeId: number;
  actualAmount: number;
  couponId: number | null;
  couponAmount: number;
}
export default function MyCouponModal(param: param) {
  const [couponId, setCouponId] = useState<number | null>(param.couponId);
  const [couponAmount, setCouponAmount] = useState<number>(param.couponAmount);

  const { data, isLoading } = useQuery({
    queryKey: ["getValidCouponListForPayment", param],
    queryFn: () =>
      getValidCouponListForPayment(param.storeId, param.actualAmount),
  });

  useEffect(() => {
    setCouponId(param.couponId);
  }, [data, param]);

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full mt-10 text-center">
      {data.data.data.length === 0 ? (
        <Empty description="적용가능한 쿠폰이 없습니다." className="my-10" />
      ) : (
        <div>
          {data.data.data.map((item: couponForPayDto) => (
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
                  couponId === item.couponId ? "border-4 border-primary4" : ""
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
            onClick={() => param.handleCoupons(couponId, couponAmount)}
          >
            적용하기
          </Button>
        </div>
      )}
    </div>
  );
}
