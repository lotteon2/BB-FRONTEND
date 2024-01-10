import { useQuery } from "react-query";
import { getMyCouponList } from "../../../apis/member";
import { couponItemDto } from "../../../recoil/common/interfaces";
import CouponBg from "../../../assets/images/coupon.png";
import { Empty } from "antd";
import MypageDivFallback from "../../fallbacks/MypageDivFallback";

export default function MyCouponList() {
  const { data, isLoading } = useQuery({
    queryKey: ["getMyCouponList"],
    queryFn: () => getMyCouponList(),
  });

  if (!data || isLoading) return <MypageDivFallback />;

  return (
    <div>
      {data.data.data.length === 0 ? (
        <Empty description="발급받은 쿠폰이 없습니다." className="my-10" />
      ) : (
        <div className="flex flex-row gap-2 flex-wrap mt-3 justify-center">
          {data.data.data.map((item: couponItemDto) => (
            <div
              className="w-[370px] h-[180px] bg-primary7 text-grayscale1 p-4 rounded-lg relative"
              key={item.couponId}
            >
              <img
                src={CouponBg}
                alt="쿠폰 배경"
                className="absolute top-0 right-0 w-full h-full rounded-lg z-0"
              />
              <div className="relative z-10">
                <p className="text-[1.8rem] font-bold">
                  {item.discountPrice.toLocaleString()}원 할인
                </p>
                <p className="font-thin text-[0.8rem]">
                  {item.minPrice.toLocaleString()}원 이상 구매 시
                </p>
                <p className="mt-2 font-light">{item.couponName}</p>
                <p className="font-light text-sm">{item.storeName}</p>

                <p className="text-right">유효기간: {item.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
