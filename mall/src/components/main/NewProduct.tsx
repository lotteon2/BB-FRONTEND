import { mainProductListDto } from "../../recoil/common/interfaces";
import { Rate } from "antd";
import { HeartFilled } from "@ant-design/icons";
import BigListFallback from "../fallbacks/BigListFallback";
import { useRecoilState, useRecoilValue } from "recoil";
import { productWishState } from "../../recoil/atom/member";
import { useQuery } from "react-query";
import { getMainProductList } from "../../apis/product";
import { loginState } from "../../recoil/atom/common";
import { useNavigate } from "react-router";

export default function NewProduct() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getMainProductList"],
    queryFn: () => getMainProductList("new-arrival"),
  });

  const handleWishButton = (productId: string) => {
    if (isLogin) {
      if (productWishList.includes(productId)) {
        setProductWishList(
          productWishList.filter((prev) => prev !== productId)
        );
      } else {
        setProductWishList((prev) => [...prev, productId]);
      }
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  if (!data || isLoading)
    return (
      <div className="my-10">
        <p className="text-[1.8rem] font-bold">이달의 신상 ❤️‍🔥</p>
        <BigListFallback />
      </div>
    );

  return (
    <div className="my-10">
      <p className="text-[1.8rem] font-bold">이달의 신상 ❤️‍🔥</p>
      <div className="mt-5">
        <div className="flex flex-row gap-3 text-center flex-wrap">
          {data.map((item: mainProductListDto) => (
            <div
              className="flex flex-col gap-1 text-left mx-auto w-[23vw] min-w-[180px] max-w-[320px]"
              key={item.productId}
            >
              <div className="h-[23vw] min-h-[180px] max-h-[320px] relative">
                <img
                  src={item.productThumbnail}
                  alt="상품 이미지"
                  className="rounded-lg"
                />
                {productWishList.includes(item.productId) ? (
                  !item.isLiked ? (
                    <div
                      className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={() => handleWishButton(item.productId)}
                    >
                      <HeartFilled />
                    </div>
                  ) : (
                    <div
                      className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={() => handleWishButton(item.productId)}
                    >
                      <HeartFilled />
                    </div>
                  )
                ) : item.isLiked ? (
                  <div
                    className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={() => handleWishButton(item.productId)}
                  >
                    <HeartFilled />
                  </div>
                ) : (
                  <div
                    className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={() => handleWishButton(item.productId)}
                  >
                    <HeartFilled />
                  </div>
                )}
              </div>
              <p className="font-extrabold text-[1.3rem]">{item.productName}</p>
              <div className="flex flex-row gap-2">
                <div className="pt-[5px]">
                  <Rate
                    defaultValue={item.productAverageRating}
                    allowHalf
                    disabled
                    style={{ color: "#85C031" }}
                  />
                </div>
                <span className="pt-1 text-grayscale5 font-thin">
                  ({item.productAverageRating})
                </span>
              </div>
              <p className="line-clamp-1 text-grayscale5">
                {item.productSummary}
              </p>
              <p className="text-primary4 font-bold text-[1.2rem]">
                {item.productPrice.toLocaleString()}원
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
