import { useState } from "react";
import { Pagination, PaginationProps, Select, Rate } from "antd";
import { useNavigate } from "react-router";
import Tag01 from "../../assets/images/tag/001.png";
import Tag02 from "../../assets/images/tag/002.png";
import Tag03 from "../../assets/images/tag/003.png";
import Tag04 from "../../assets/images/tag/004.png";
import Tag05 from "../../assets/images/tag/005.png";
import Tag06 from "../../assets/images/tag/006.png";
import Tag07 from "../../assets/images/tag/007.png";
import { HeartFilled } from "@ant-design/icons";
import { productListDto } from "../../recoil/common/interfaces";
import { categoryOptions } from "../../recoil/common/data";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../recoil/atom/common";
import { productWishState } from "../../recoil/atom/member";
import { useQuery } from "react-query";
import { getProductListByTag } from "../../apis/product";
import ProductListFallback from "../fallbacks/ProductListFallback";

interface param {
  tagId: number;
}

export default function ProductByTagList(param: param) {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("NEW");
  const [categoryOption, setCategoryOption] = useState<number | undefined>();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getProductListByTag", categoryOption, page, sortOption],
    queryFn: () =>
      getProductListByTag(
        param.tagId,
        categoryOption,
        page - 1,
        24,
        sortOption
      ),
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

  console.log(categoryOption);
  if (!data || isLoading)
    return (
      <div>
        <img
          src={
            param.tagId === 1
              ? Tag01
              : param.tagId === 2
              ? Tag02
              : param.tagId === 3
              ? Tag03
              : param.tagId === 4
              ? Tag04
              : param.tagId === 5
              ? Tag05
              : param.tagId === 6
              ? Tag06
              : Tag07
          }
          alt="태그 이미지"
          className="w-20 h-20 mx-auto"
        />
        <div className="mx-auto w-32 text-center text-3xl font-bold border-b-4 border-primary7">
          {param.tagId === 1
            ? "연인 선물"
            : param.tagId === 2
            ? "친구 선물"
            : param.tagId === 3
            ? "공기 정화"
            : param.tagId === 4
            ? "개업 축하"
            : param.tagId === 5
            ? "승진 취임"
            : param.tagId === 6
            ? "결혼식"
            : "장례식"}
        </div>
        <div className="flex justify-end">
          <Select
            placeholder="카테고리 선택"
            options={categoryOptions}
            value={categoryOption}
            allowClear
            style={{ width: 130 }}
            onChange={(e) => setCategoryOption(e)}
          />
        </div>
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
      <img
        src={
          param.tagId === 1
            ? Tag01
            : param.tagId === 2
            ? Tag02
            : param.tagId === 3
            ? Tag03
            : param.tagId === 4
            ? Tag04
            : param.tagId === 5
            ? Tag05
            : param.tagId === 6
            ? Tag06
            : Tag07
        }
        alt="태그 이미지"
        className="w-20 h-20 mx-auto"
      />
      <div className="mx-auto w-32 text-center text-3xl font-bold border-b-4 border-primary7">
        {param.tagId === 1
          ? "연인 선물"
          : param.tagId === 2
          ? "친구 선물"
          : param.tagId === 3
          ? "공기 정화"
          : param.tagId === 4
          ? "개업 축하"
          : param.tagId === 5
          ? "승진 취임"
          : param.tagId === 6
          ? "결혼식"
          : "장례식"}
      </div>
      <div className="flex justify-end">
        <Select
          placeholder="카테고리 선택"
          options={categoryOptions}
          value={categoryOption}
          allowClear
          style={{ width: 130 }}
          onChange={(e) => setCategoryOption(e)}
        />
      </div>
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
      {/* <div className="flex flex-row gap-3 text-center flex-wrap">
        {data.data.products.map((item: productListDto) => (
          <div
            className="flex flex-col text-left mx-auto cursor-pointer"
            key={item.key}
            onClick={() => navigate("/product/detail/" + item.key)}
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
      </div> */}
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
