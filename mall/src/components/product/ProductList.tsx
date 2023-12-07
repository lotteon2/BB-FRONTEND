import { useState } from "react";
import { Pagination, PaginationProps, Rate } from "antd";
import { useNavigate } from "react-router";
import { HeartFilled } from "@ant-design/icons";
import { productListDto } from "../../recoil/common/interfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, mallState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useQuery } from "react-query";
import { getProductListByCategory } from "../../apis/product";
import ProductListFallback from "../fallbacks/ProductListFallback";

interface param {
  categoryId: number;
  storeId: number | null;
}

export default function ProductList(param: param) {
  const navigate = useNavigate();
  const isMall = useRecoilValue<boolean>(mallState);
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("NEW");
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getProduct"],
    queryFn: () =>
      getProductListByCategory(
        param.categoryId,
        page - 1,
        24,
        sortOption,
        param.storeId
      ),
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

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  if (!data || isLoading)
    return (
      <div>
        <div className="my-3 py-2 border-y-[1px] flex flex-row justify-start gap-3 flex-wrap">
          <p
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "NEW" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("NEW")}
          >
            신규등록순
          </p>
          <span>|</span>
          <span
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "SALE" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("SALE")}
          >
            판매량순
          </span>
          <span>|</span>
          <span
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "LOW" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("LOW")}
          >
            낮은가격순
          </span>
          <span>|</span>
          <span
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "HIGH" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("HIGH")}
          >
            높은가격순
          </span>
          <span>|</span>
          <span
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "REVIEW" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("REVIEW")}
          >
            리뷰많은순
          </span>
          <span>|</span>
          <span
            className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
              sortOption === "RATING" ? "text-primary4" : ""
            }`}
            onClick={() => setSortOption("RATING")}
          >
            평점높은순
          </span>
        </div>
        <ProductListFallback />
      </div>
    );

  return (
    <div>
      <div className="my-3 py-2 border-y-[1px] flex flex-row justify-start gap-3 flex-wrap">
        <p
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "NEW" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("NEW")}
        >
          신규등록순
        </p>
        <span>|</span>
        <span
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "SALE" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("SALE")}
        >
          판매량순
        </span>
        <span>|</span>
        <span
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "LOW" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("LOW")}
        >
          낮은가격순
        </span>
        <span>|</span>
        <span
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "HIGH" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("HIGH")}
        >
          높은가격순
        </span>
        <span>|</span>
        <span
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "REVIEW" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("REVIEW")}
        >
          리뷰많은순
        </span>
        <span>|</span>
        <span
          className={`cursor-pointer w-[75px] min-w-[75px] text-center ${
            sortOption === "RATING" ? "text-primary4" : ""
          }`}
          onClick={() => setSortOption("RATING")}
        >
          평점높은순
        </span>
      </div>
      <div className="flex flex-row gap-3 text-center flex-wrap">
        {data.products.map((item: productListDto) => (
          <div
            className="flex flex-col text-left mx-auto cursor-pointer"
            key={item.key}
            onClick={() =>
              isMall
                ? navigate("/product/detail/" + item.key)
                : navigate("/pickup/product/detail/" + item.key)
            }
          >
            <div className="relative">
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
          total={data.totalCnt}
          defaultCurrent={page}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
