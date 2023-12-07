import { mainStoreListDto } from "../../recoil/common/interfaces";
import { Rate } from "antd";
import { HeartFilled } from "@ant-design/icons";
import BigListFallback from "../fallbacks/BigListFallback";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeWishState } from "../../recoil/atom/member";
import { useQuery } from "react-query";
import { loginState } from "../../recoil/atom/common";
import { useNavigate } from "react-router";
import { getStoreList } from "../../apis/store";

export default function BestShop() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getStoreList"],
    queryFn: () => getStoreList(0, 4),
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

  if (!data || isLoading)
    return (
      <div className="my-10">
        <p className="text-[1.8rem] font-bold">베스트 샵 🌸</p>
        <BigListFallback />
      </div>
    );

  return (
    <div className="my-10">
      <p className="text-[1.8rem] font-bold">베스트 샵 🌸</p>
      <p className="flex justify-end text-primary4 font-bold cursor-pointer">
        전체보기
      </p>
      <div className="mt-5">
        <div className="flex flex-row gap-3 text-center flex-wrap">
          {data.simpleStores.map((item: mainStoreListDto) => (
            <div
              className="flex flex-col gap-1 text-left mx-auto w-[23vw] min-w-[180px] max-w-[320px] cursor-pointer"
              key={item.storeId}
              onClick={() => navigate("/store/detail/" + item.storeId)}
            >
              <div className="h-[23vw] min-h-[180px] max-h-[320px] relative">
                <img
                  src={item.storeThumbnailImage}
                  alt="상품 이미지"
                  className="rounded-lg"
                />
                {storeWishList.includes(item.storeId) ? (
                  !item.isLiked ? (
                    <div
                      className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={(e) => handleWishButton(e, item.storeId)}
                    >
                      <HeartFilled />
                    </div>
                  ) : (
                    <div
                      className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={(e) => handleWishButton(e, item.storeId)}
                    >
                      <HeartFilled />
                    </div>
                  )
                ) : item.isLiked ? (
                  <div
                    className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.storeId)}
                  >
                    <HeartFilled />
                  </div>
                ) : (
                  <div
                    className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.storeId)}
                  >
                    <HeartFilled />
                  </div>
                )}
              </div>
              <p className="font-extrabold text-[1.3rem]">{item.storeName}</p>
              <div className="flex flex-row gap-2">
                <div className="pt-[5px]">
                  <Rate
                    defaultValue={item.averageRating}
                    allowHalf
                    disabled
                    style={{ color: "#85C031" }}
                  />
                </div>
                <span className="pt-1 text-grayscale5 font-thin">
                  ({item.averageRating})
                </span>
              </div>
              <p className="line-clamp-1 text-grayscale5">{item.detailInfo}</p>
              {/* <p className="text-primary4 font-bold text-[1.2rem]">
                {item.productPrice.toLocaleString()}원
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
