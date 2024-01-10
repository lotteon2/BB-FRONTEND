import { useQuery } from "react-query";

import RegionImage from "../../../assets/images/region.gif";
import { Empty } from "antd";
import { HeartFilled, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getFlowerShopsRegion } from "../../../apis/store";
import PickupListFallback from "../../fallbacks/PickupListFallback";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeWishState } from "../../../recoil/atom/member";
import { loginState } from "../../../recoil/atom/common";
import { storeListNearByDto } from "../../../recoil/common/interfaces";

interface param {
  sido: string | null;
  gugun: string;
}
export default function RegionStoreList(param: param) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getFlowerShopsRegion", param.sido, param.gugun, isLogin],
    queryFn: () => getFlowerShopsRegion(param.sido, param.gugun, isLogin),
  });

  const handleWishButton = (e: React.MouseEvent, storeId: number) => {
    e.stopPropagation();

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

  if (!data || isLoading) return <PickupListFallback />;

  return (
    <div className="w-full h-full">
      {data === "ready" ? (
        <div className="flex flex-col gap-5 mt-40">
          <img src={RegionImage} alt="" className="m-auto" />
          <p className="text-center my-auto">지역을 선택해주세요</p>
        </div>
      ) : (
        <div>
          {data.data.stores.length === 0 ? (
            <Empty
              description="등록된 가게가 존재하지 않습니다."
              className="mt-40"
            />
          ) : (
            <div>
              {data.data.stores.map((item: storeListNearByDto) => (
                <div
                  className="px-[2vw] flex flex-row gap-1 cursor-pointer py-2 hover:bg-[#C2DABC55]"
                  key={item.storeId}
                  onClick={() => navigate("/store/detail/" + item.storeId)}
                >
                  <div className="relative">
                    <img
                      src={item.thumbnailImage}
                      alt="가게 썸네일"
                      className="w-[12vw] h-[12vw] max-w-[150px] max-h-[150px] min-w-[100px] min-h-[100px] rounded-lg"
                    />
                    {storeWishList.includes(item.storeId) ? (
                      !item.isLiked ? (
                        <div
                          className="absolute bottom-0 right-2 text-[#FF6464] text-[25px] hover:-translate-y-[2px] cursor-pointer"
                          onClick={(e) => handleWishButton(e, item.storeId)}
                        >
                          <HeartFilled />
                        </div>
                      ) : (
                        <div
                          className="absolute bottom-0 right-2 text-[#02020233] text-[25px] hover:-translate-y-[2px] cursor-pointer"
                          onClick={(e) => handleWishButton(e, item.storeId)}
                        >
                          <HeartFilled />
                        </div>
                      )
                    ) : item.isLiked ? (
                      <div
                        className="absolute bottom-0 right-2 text-[#FF6464] text-[25px] hover:-translate-y-[2px] cursor-pointer"
                        onClick={(e) => handleWishButton(e, item.storeId)}
                      >
                        <HeartFilled />
                      </div>
                    ) : (
                      <div
                        className="absolute bottom-0 right-2 text-[#02020233] text-[25px] hover:-translate-y-[2px] cursor-pointer"
                        onClick={(e) => handleWishButton(e, item.storeId)}
                      >
                        <HeartFilled />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 justify-center">
                    <p className="w-[25vw] min-w-[150px] max-w-[300px] text-[1.3rem] max-[1000px]:text-[1rem]">
                      {item.storeName}
                    </p>
                    <p className="w-[32vw] min-w-[220px] max-w-[430px] text-[1rem] text-grayscale5 max-[1000px]:text-[0.8rem] mt-[-8px] line-clamp-2">
                      {item.detailInfo}
                    </p>
                    <p className="font-light text-[0.8rem]">
                      {item.address} {item.detailAddress}
                    </p>
                    <div className="w-[25vw] min-w-[100px] max-w-[400px] text-primary4">
                      <div className="flex flex-row gap-2 text-[1rem] max-[1000px]:text-[0.8rem]">
                        <StarFilled />
                        <span>{item.averageRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
