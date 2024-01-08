import { useEffect, useState } from "react";
import { Button, Empty } from "antd";
import { useMutation, useQuery } from "react-query";
import {
  downloadAllCoupons,
  downloadSingleCoupon,
  getCouponListFromProductDetail,
} from "../../../apis/store";
import CouponBg from "../../../assets/images/coupon.png";
import { DownloadOutlined } from "@ant-design/icons";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";
import Loading from "../../common/Loading";
import { couponDto, simpleUserInfo } from "../../../recoil/common/interfaces";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atom/common";

interface param {
  storeId: number | undefined;
  phoneNumber: string;
}
export default function CouponModal(param: param) {
  const nickname = useRecoilValue<string>(nicknameState);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [userSimpleInfo, setUserSimpleInfo] = useState<simpleUserInfo>();

  const { data, isLoading } = useQuery({
    queryKey: ["getCouponListFromProductDetail", isChange],
    queryFn: () => getCouponListFromProductDetail(param.storeId),
  });

  const handleDownloadSingleCoupon = (couponId: number) => {
    singleMutation.mutate(couponId);
  };
  const handleDownloadAllCoupons = () => {
    allMutation.mutate();
  };

  const singleMutation = useMutation(
    ["downloadSingle"],
    (couponId: number) => downloadSingleCoupon(couponId, userSimpleInfo),
    {
      onSuccess: () => {
        SuccessToast("발급되었습니다.");
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const allMutation = useMutation(
    ["downloadAll"],
    () => downloadAllCoupons(param.storeId, userSimpleInfo),
    {
      onSuccess: () => {
        SuccessToast("발급되었습니다.");
        setIsChange((cur) => !cur);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    const userInfo = {
      nickname: nickname,
      phoneNumber: param.phoneNumber,
    };

    setUserSimpleInfo(userInfo);
    // eslint-disable-next-line
  }, []);

  if (!data || isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-3 max-h-[500px] overflow-auto">
      {data.data.data.length === 0 ? (
        <Empty description="사용가능한 쿠폰이 없습니다." className="my-20" />
      ) : (
        <div>
          {data.data.data.map((item: couponDto) => (
            <div
              key={item.couponId}
              className="w-[80%] mx-auto relative pb-5 pr-3 mt-10"
            >
              <img src={CouponBg} alt="쿠폰 배경" className="w-full" />
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
                {item.isIssued ? (
                  <div className="w-16 h-16 bg-grayscale7 rounded-full absolute bottom-0 right-0 drop-shadow-lg text-grayscale1 flex flex-col py-3 pl-[19px] max-[400px]:w-12 max-[400px]:h-12 max-[400px]:text-[0.6rem] max-[400px]:pl-[15px]">
                    <span>발급</span>
                    <span>완료</span>
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 bg-grayscale1 rounded-full absolute bottom-0 right-0 drop-shadow-lg text-grayscale7 text-4xl py-3 px-[14px] cursor-pointer max-[400px]:w-12 max-[400px]:h-12 max-[400px]:text-2xl max-[400px]:px-[12px]"
                    onClick={() => handleDownloadSingleCoupon(item.couponId)}
                  >
                    <DownloadOutlined />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="text-center mt-10">
            <Button
              size="large"
              style={{ width: "80%", height: 60, backgroundColor: "#315136" }}
              type="primary"
              onClick={handleDownloadAllCoupons}
            >
              전체 다운로드
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
