import { mainProductListDto } from "../../recoil/common/interfaces";
import { Empty, Rate } from "antd";
import { HeartFilled } from "@ant-design/icons";
import BigListFallback from "../fallbacks/BigListFallback";
import { useRecoilState, useRecoilValue } from "recoil";
import { productWishState } from "../../recoil/atom/member";
import { useQuery } from "react-query";
import { getMainProductList } from "../../apis/product";
import { loginState } from "../../recoil/atom/common";
import { useNavigate } from "react-router";

export default function BestProduct() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getBestProductList", isLogin],
    queryFn: () => getMainProductList("rating", isLogin),
  });

  const handleWishButton = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
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
        <p className="text-[1.8rem] font-bold">고객 만족 100% 🥰</p>
        <BigListFallback />
      </div>
    );

  return (
    <div className="my-10">
      <p className="text-[1.8rem] font-bold">고객 만족 100% 🥰</p>
      <div className="mt-5">
        {data.data.products.length === 0 ? (
          <Empty description="등록된 상품이 없습니다." />
        ) : (
          <div className="flex flex-row gap-3 text-center flex-wrap">
            {data.data.products.map((item: mainProductListDto) => (
              <div
                className="flex flex-col gap-1 text-left mx-auto w-[23vw] min-w-[180px] max-w-[320px] cursor-pointer hover:-translate-y-1"
                key={item.key}
                onClick={() => navigate("/product/detail/" + item.key)}
              >
                <div className="h-[23vw] min-h-[180px] max-h-[320px] relative">
                  <img
                    src={item.productThumbnail}
                    alt="상품 이미지"
                    className="rounded-lg w-full h-full"
                  />
                  {productWishList.includes(item.key) ? (
                    !item.isLiked ? (
                      <div
                        className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                        onClick={(e) => handleWishButton(e, item.key)}
                      >
                        <HeartFilled />
                      </div>
                    ) : (
                      <div
                        className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                        onClick={(e) => handleWishButton(e, item.key)}
                      >
                        <HeartFilled />
                      </div>
                    )
                  ) : item.isLiked ? (
                    <div
                      className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={(e) => handleWishButton(e, item.key)}
                    >
                      <HeartFilled />
                    </div>
                  ) : (
                    <div
                      className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                      onClick={(e) => handleWishButton(e, item.key)}
                    >
                      <HeartFilled />
                    </div>
                  )}
                </div>
                <p className="font-extrabold text-[1.3rem]">
                  {item.productName}
                </p>
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
        )}
      </div>
    </div>
  );
}
