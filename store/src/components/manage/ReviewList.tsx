import { useState } from "react";
import { Empty, Pagination, PaginationProps, Rate, Select } from "antd";
import { reviewDto } from "../../recoil/common/interfaces";
import { reviewOptions } from "../../recoil/common/options";
import ReviewDetailModal from "./modal/ReviewDetailModal";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { getReviews } from "../../apis/manage";
import ReviewFallback from "../fallbacks/ReviewFallback";

export default function ReviewList() {
  const storeId = useRecoilValue<number>(storeIdState);
  const [sortOption, setSortOption] = useState<string>("DATE");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewItem, setReviewItem] = useState<reviewDto>();

  const handleReviewDetail = (data: reviewDto) => {
    setReviewItem(data);
    setIsModalOpen(true);
  };

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getReviews", page, sortOption],
    queryFn: () => getReviews(storeId, page - 1, 6, sortOption),
  });

  if (!data || isLoading) return <ReviewFallback />;

  return (
    <div className="w-full h-full text-center">
      <div className="relative">
        <div className="text-xl font-bold text-left">리뷰 관리</div>
        <span className="absolute right-0 top-0 text-left">
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e)}
            defaultValue="DATE"
            options={reviewOptions}
            style={{ width: 120 }}
          />
        </span>
      </div>
      <div>
        {data.data.totalCnt === 0 ? (
          <div className="mt-72">
            <Empty description="등록된 리뷰가 없습니다." />
          </div>
        ) : (
          <div>
            <div className="mt-3 h-[765px]">
              {data.data.reviews.map((item: reviewDto) => (
                <div
                  key={item.reviewId}
                  className="flex flex-row gap-3 relative py-3 border-y-[1px] border-grayscale2 text-left cursor-pointer hover:bg-purple-100"
                  onClick={() => handleReviewDetail(item)}
                >
                  <img
                    className="w-[100px] h-[100px] rounded-full ml-3"
                    src={item.profileImage}
                    alt="프로필 이미지"
                  />
                  <div className="flex flex-col w-[520px]">
                    <Rate allowHalf disabled defaultValue={item.rating} />
                    <div className="flex flex-row gap-3 text-[0.8rem]">
                      <p>{item.nickname}</p>
                      <p className="font-light text-grayscale4">
                        {item.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <p className="font-bold">{item.productName}</p>
                    <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-[1.2rem]">
                      {item.content}
                    </p>
                  </div>
                  {item.reviewImages.length === 0 ? (
                    ""
                  ) : (
                    <img
                      className="w-[100px] h-[100px]"
                      src={item.reviewImages[0]}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
            <Pagination
              showSizeChanger={false}
              defaultCurrent={page}
              total={data.data.totalCnt}
              defaultPageSize={6}
              onChange={handlePage}
            />
          </div>
        )}
      </div>
      {isModalOpen ? (
        <ReviewDetailModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          data={reviewItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}
