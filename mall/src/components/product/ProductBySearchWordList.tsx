import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, searchWordState } from "../../recoil/atom/common";
import { useQuery } from "react-query";
import { searchProductList } from "../../apis/product";
import { Empty, Pagination, PaginationProps, Rate, Tag } from "antd";
import { productListDto } from "../../recoil/common/interfaces";
import { useState } from "react";
import { productWishState } from "../../recoil/atom/member";
import { HeartFilled } from "@ant-design/icons";
import ProductListFallback from "../fallbacks/ProductListFallback";

export default function ProductBySearchWordList() {
  const navigate = useNavigate();
  const word = useRecoilValue<string>(searchWordState);
  const [page, setPage] = useState<number>(1);
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getSearchProductList"],
    queryFn: () => searchProductList(word),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

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

  if (data || isLoading)
    return (
      <div>
        <div className="text-center font-bold mt-5">"{word}"</div>
        <div className="text-center mb-5">검색결과</div>
        <ProductListFallback />
      </div>
    );

  return (
    <div>
      <div className="text-center font-bold mt-5">"{word}"</div>
      <div className="text-center mb-5">검색결과</div>
      {data.data.totalCnt === 0 ? (
        <Empty
          description="검색어에 대한 결과를 찾을 수 없습니다."
          className="my-10"
        />
      ) : (
        <div>
          <div className="flex flex-row gap-3 text-center flex-wrap">
            {data.data.products.map((item: productListDto) => (
              <div
                className="flex flex-col text-left mx-auto cursor-pointer"
                key={item.key}
                onClick={() => navigate("/product/detail/" + item.key)}
              >
                <div className="relative">
                  <div className="absolute z-20 p-2">
                    {item.productSaleStatus === "DISCONTINUED" ? (
                      <Tag bordered={false} color="red">
                        판매중지
                      </Tag>
                    ) : (
                      ""
                    )}
                  </div>
                  <img
                    src={item.productThumbnail}
                    alt="상품 썸네일"
                    className="w-[23vw] h-[23vw] min-w-[180px] min-h-[180px] max-w-[320px] max-h-[320px] rounded-lg drop-shadow-lg hover:drop-shadow-none"
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
                <div className="flex flex-col gap-1 mt-2">
                  <p className="w-[20vw] min-w-[180px] max-w-[320px]">
                    {item.productName}
                  </p>
                  <div className="flex flex-row gap-2">
                    <Rate
                      defaultValue={item.averageRating}
                      allowHalf
                      disabled
                      style={{ color: "#85C031" }}
                    />
                    <span className="text-grayscale5 font-thin">
                      ({item.averageRating})
                    </span>
                  </div>
                  <p className="w-[20vw] min-w-[180px] max-w-[300px] text-grayscale5 font-light text-[0.8rem] line-clamp-1">
                    {item.productSummary}
                  </p>
                  <p className="w-[20vw] min-w-[170px] text-primary4 max-w-[320px]">
                    {item.productPrice.toLocaleString()}원
                  </p>
                  <div className="flex flex-row gap-1 text-[0.8rem] text-grayscale4">
                    <span>구매 {item.salesCount.toLocaleString()}</span>
                    <span>후기 {item.reviewCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Pagination
              defaultPageSize={24}
              total={data.data.totalCnt}
              defaultCurrent={page}
              onChange={handlePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
