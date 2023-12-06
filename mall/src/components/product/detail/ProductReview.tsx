import { useState } from "react";
import { useQuery } from "react-query";
import { getProductReviewList } from "../../../apis/product";
import { reviewListData } from "../../../mocks/product";
import { reviewItemDto } from "../../../recoil/common/interfaces";
import { Rate, Pagination, PaginationProps } from "antd";
import ReviewListFallback from "../../fallbacks/ReviewListFallback";

interface param {
  productId: string | undefined;
}
export default function ProductReview(param: param) {
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("DATE");

  const data = reviewListData;

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getProductReviewList", page, sortOption],
  //     queryFn: () =>
  //       getProductReviewList(param.productId, page - 1, 10, sortOption),
  //   });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  //   if (!data || isLoading) return <ReviewListFallback />;

  return (
    <div>
      <p className="text-[1.2rem] mb-5">
        상품후기 {data.data.totalCnt.toLocaleString()}개
      </p>
      <div className="w-full flex flex-col gap-5 justify-center">
        {data.data.productReview.map((item: reviewItemDto, index: number) => (
          <div
            className="flex flex-row gap-2 flex-wrap justify-center cursor-pointer"
            key={index}
          >
            <img
              src={item.profileImage}
              alt=""
              className="w-[4vw] h-[4vw] min-w-[50px] min-h-[50px] rounded-full"
            />
            <div className="flex flex-col gap-2 w-[50vw] min-w-[300px] max-w-[700px] relative z-0">
              <Rate
                defaultValue={item.rating}
                allowHalf
                disabled
                style={{ color: "#85C031" }}
              />
              <p>{item.nickname}</p>
              <p className="line-clamp-1">{item.content}</p>
            </div>
            <img
              src={item.reviewImages[0]}
              alt="리뷰 이미지"
              className="w-[4vw] h-[4vw] min-w-[100px] min-h-[100px]"
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Pagination
          defaultCurrent={page}
          total={data.data.totalCnt}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
