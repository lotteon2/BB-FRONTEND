import { useState } from "react";
import { useQuery } from "react-query";
import { getProductReviewList } from "../../../apis/product";
import { reviewItemDto } from "../../../recoil/common/interfaces";
import { Rate, Pagination, PaginationProps, Empty } from "antd";
import ReviewListFallback from "../../fallbacks/ReviewListFallback";
import ReviewModal from "../modal/ReviewModal";

interface param {
  productId: string | undefined;
}
export default function ProductReview(param: param) {
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("DATE");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<reviewItemDto>({
    profileImage: "",
    rating: 0,
    nickname: "",
    content: "",
    reviewImages: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getProductReviewList", page, sortOption],
    queryFn: () =>
      getProductReviewList(param.productId, page - 1, 10, sortOption),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!data || isLoading) return <ReviewListFallback />;

  return (
    <div>
      <p className="text-[1.2rem] mb-5">
        상품후기 {data.data.totalCnt.toLocaleString()}개
      </p>
      <p className="flex flex-row gap-3 justify-end">
        <span
          className={
            sortOption === "DATE"
              ? "text-primary4 font-bold cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => setSortOption("DATE")}
        >
          최신순
        </span>
        <span>|</span>
        <span
          className={
            sortOption === "HIGH"
              ? "text-primary4 font-bold cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => setSortOption("HIGH")}
        >
          별점 높은순
        </span>
        <span>|</span>
        <span
          className={
            sortOption === "LOW"
              ? "text-primary4 font-bold cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => setSortOption("LOW")}
        >
          별점 낮은순
        </span>
      </p>
      {data.data.totalCnt === 0 ? (
        <Empty description="등록된 상품 후기가 없습니다." className="my-10" />
      ) : (
        <div className="w-full flex flex-col gap-5 justify-center">
          {data.data.reviews.map((item: reviewItemDto, index: number) => (
            <div
              className="flex flex-row gap-2 flex-wrap justify-center cursor-pointer py-2 hover:translate-y-[-4px]"
              key={index}
              onClick={() => {
                setReview(item);
                setIsModalOpen(true);
              }}
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
              {item.reviewImages.length === 0 ? (
                <div className="w-[4vw] h-[4vw] min-w-[100px] min-h-[100px]"></div>
              ) : (
                <img
                  src={item.reviewImages[0]}
                  alt="리뷰 이미지"
                  className="w-[4vw] h-[4vw] min-w-[100px] min-h-[100px]"
                />
              )}
            </div>
          ))}
          <div className="text-center mt-5">
            <Pagination
              showSizeChanger={false}
              defaultCurrent={page}
              total={data.data.totalCnt}
              onChange={handlePage}
            />
          </div>
        </div>
      )}
      {isModalOpen ? (
        <ReviewModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          data={review}
        />
      ) : (
        ""
      )}
    </div>
  );
}
