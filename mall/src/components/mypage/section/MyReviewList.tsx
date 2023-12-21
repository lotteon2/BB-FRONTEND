import { useState } from "react";
import { Pagination, PaginationProps, Rate } from "antd";
import { myReviewListData } from "../../../mocks/mypage";
import { myReviewItemDto } from "../../../recoil/common/interfaces";
import MyReviewModal from "../modal/MyReviewModal";
import { useQuery } from "react-query";
import { getMyReviewList } from "../../../apis/member";
import ReviewListFallback from "../../fallbacks/ReviewListFallback";

export default function MyReviewList() {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<myReviewItemDto>({
    reviewId: 0,
    createdAt: "",
    reviewRating: 0,
    reviewContent: "",
    reviewImages: [],
    nickname: "",
    profileImage: "",
    productName: "",
  });

  //   const data = myReviewListData;
  const { data, isLoading } = useQuery({
    queryKey: ["getMyReviewList", page],
    queryFn: () => getMyReviewList(page - 1, 10),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!data || isLoading)
    return (
      <div className="p-2">
        <ReviewListFallback />
      </div>
    );

  return (
    <div>
      <div className="w-full p-2 flex flex-col gap-5 justify-center">
        {data.data.reviews.map((item: myReviewItemDto) => (
          <div>
            <div
              className="flex flex-row gap-2 flex-wrap justify-between cursor-pointer py-2 hover:translate-y-[-4px]"
              key={item.reviewId}
              onClick={() => {
                setReview(item);
                setIsModalOpen(true);
              }}
            >
              <div className="flex flex-row gap-5">
                <img
                  src={item.profileImage}
                  alt=""
                  className="w-[4vw] h-[4vw] min-w-[50px] min-h-[50px] rounded-full"
                />
                <div className="flex flex-col w-[50vw] min-w-[300px] max-w-[700px] relative z-0">
                  <Rate
                    defaultValue={item.reviewRating}
                    allowHalf
                    disabled
                    style={{ color: "#85C031" }}
                  />
                  <p className="font-bold pt-1">{item.productName}</p>
                  <p className="font-light">{item.nickname}</p>
                  <p className="line-clamp-1 pt-1">{item.reviewContent}</p>
                </div>
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
            <p className="border-b-[1px]"></p>
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
      {isModalOpen ? (
        <MyReviewModal
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
