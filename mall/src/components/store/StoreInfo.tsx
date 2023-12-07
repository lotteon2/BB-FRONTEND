import { useQuery } from "react-query";
import { getStoreDetailInfo } from "../../apis/store";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router";
import StoreDetailFallback from "../fallbacks/StoreDetailFallback";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../recoil/atom/common";
import { storeWishState } from "../../recoil/atom/member";

interface param {
  storeId: number;
}
export default function StoreInfo(param: param) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getStoreDetailInfo"],
    queryFn: () => getStoreDetailInfo(param.storeId),
  });

  const handleWishButton = (storeId: number) => {
    if (isLogin) {
      if (storeWishList.includes(storeId)) {
        setStoreWishList(storeWishList.filter((prev) => prev !== storeId));
      } else {
        setStoreWishList((prev) => [...prev, storeId]);
      }
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  if (!data || isLoading) return <StoreDetailFallback />;

  return (
    <div className="w-full h-full flex flex-row gap-5 flex-wrap justify-center">
      <div className="w-[20vw] min-w-[250px] max-w-[300px]">
        <img src={data.storeThumbnailImage} alt="" className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-2 w-[70vw] max-w-[1000px]">
        <div>
          <div className="flex flex-row gap-3">
            <p className="text-4xl font-bold">{data.storeName}</p>
            <div className="flex flex-row gap-1 text-primary4">
              <StarFilled />
              <span className="mt-2">{data.averageRating}</span>
            </div>
          </div>
          <p className="text-grayscale5 text-lg">
            {data.address} {data.detailAddress}
          </p>
          <p>{data.phoneNumber}</p>
          <p className="my-3 h-18 overflow-auto">{data.detailInfo}</p>
        </div>

        {storeWishList.includes(param.storeId) ? (
          !data.isLiked ? (
            <div
              className="text-[#FF6464] text-[40px] flex justify-end hover:-translate-y-[2px] cursor-pointer"
              onClick={(e) => handleWishButton(param.storeId)}
            >
              <HeartFilled />
            </div>
          ) : (
            <div
              className="text-grayscale5 text-[40px] flex justify-end hover:-translate-y-[2px] cursor-pointer"
              onClick={(e) => handleWishButton(param.storeId)}
            >
              <HeartFilled />
            </div>
          )
        ) : data.isLiked ? (
          <div
            className="text-[#FF6464] text-[40px] flex justify-end text-[40px] hover:-translate-y-[2px] cursor-pointer"
            onClick={(e) => handleWishButton(param.storeId)}
          >
            <HeartFilled />
          </div>
        ) : (
          <div
            className="text-grayscale5 text-[40px] flex justify-end hover:-translate-y-[2px] cursor-pointer"
            onClick={(e) => handleWishButton(param.storeId)}
          >
            <HeartFilled />
          </div>
        )}
        <div className="flex justify-end">
          <Button
            style={{
              width: "20vw",
              height: 50,
              minWidth: "200px",
              maxWidth: "300px",
            }}
            type="primary"
            onClick={() =>
              navigate(
                "/product/subscription/detail/" + data.subscriptionProductId
              )
            }
          >
            정기구독 신청
          </Button>
        </div>
      </div>
    </div>
  );
}
