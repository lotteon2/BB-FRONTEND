import { useState } from "react";
import { useQuery } from "react-query";
import { getMyWishStoreList } from "../../../../apis/member";
import { myWishStoreItemDto } from "../../../../recoil/common/interfaces";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeWishState } from "../../../../recoil/atom/member";
import { HeartFilled } from "@ant-design/icons";
import { Empty, Pagination, PaginationProps, Rate } from "antd";
import MypageBigListFallback from "../../../fallbacks/MypageBigListFallback";
import { wishState } from "../../../../recoil/atom/common";

export default function WishStoreList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [storeWishList, setStoreWishList] =
    useRecoilState<number[]>(storeWishState);
  const isChange = useRecoilValue<boolean>(wishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyWishStoreList", page, isChange],
    queryFn: () => getMyWishStoreList(page - 1, 6),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleWishButton = (e: React.MouseEvent, storeId: number) => {
    e.stopPropagation();

    if (storeWishList.includes(storeId)) {
      setStoreWishList(storeWishList.filter((prev) => prev !== storeId));
    } else {
      setStoreWishList((prev) => [...prev, storeId]);
    }
  };
  if (!data || isLoading) return <MypageBigListFallback />;

  // const data = storeWishListData;

  return (
    <div>
      {data.data.length === 0 ? (
        <Empty description="찜한 가게가 없습니다." className="my-10" />
      ) : (
        <div className="flex flex-row gap-3 text-center flex-wrap mt-5">
          {data.data.map((item: myWishStoreItemDto) => (
            <div
              className="flex flex-col text-left mx-auto cursor-pointer"
              key={item.storeId}
              onClick={() => navigate("/store/detail/" + item.storeId)}
            >
              <div className="relative">
                <img
                  src={item.storeThumbnail}
                  alt="상품 썸네일"
                  className="w-[23vw] h-[23vw] min-w-[180px] min-h-[180px] max-w-[320px] max-h-[320px] rounded-lg drop-shadow-lg hover:drop-shadow-none"
                />
                {storeWishList.includes(item.storeId) ? (
                  <div
                    className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.storeId)}
                  >
                    <HeartFilled />
                  </div>
                ) : (
                  <div
                    className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.storeId)}
                  >
                    <HeartFilled />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <p className="w-[20vw] min-w-[180px] max-w-[320px]">
                  {item.storeName}
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
                  {item.detailInfo}
                </p>
              </div>
            </div>
          ))}
          <div className="w-full text-center mt-5">
            <Pagination
              showSizeChanger={false}
              defaultCurrent={page}
              total={data.totalCnt}
              defaultPageSize={6}
              onChange={handlePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
