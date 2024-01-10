import { useState } from "react";
import { useQuery } from "react-query";
import { getMyWishList } from "../../../../apis/member";
import { myWishProductItemDto } from "../../../../recoil/common/interfaces";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productWishState } from "../../../../recoil/atom/member";
import { HeartFilled } from "@ant-design/icons";
import { Empty, Pagination, PaginationProps, Rate } from "antd";
import MypageBigListFallback from "../../../fallbacks/MypageBigListFallback";

export default function WishProductList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [productWishList, setProductWishList] =
    useRecoilState<string[]>(productWishState);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyWishList", page],
    queryFn: () => getMyWishList(page - 1, 6),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleWishButton = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();

    if (productWishList.includes(productId)) {
      setProductWishList(productWishList.filter((prev) => prev !== productId));
    } else {
      setProductWishList((prev) => [...prev, productId]);
    }
  };
  if (!data || isLoading) return <MypageBigListFallback />;

  return (
    <div>
      {data.data.length === 0 ? (
        <Empty description="찜한 상품이 없습니다." className="my-10" />
      ) : (
        <div className="flex flex-row gap-3 text-center flex-wrap mt-5">
          {data.data.map((item: myWishProductItemDto) => (
            <div
              className="flex flex-col text-left mx-auto cursor-pointer"
              key={item.productId}
              onClick={() => navigate("/product/detail/" + item.productId)}
            >
              <div className="relative">
                <img
                  src={item.productThumbnail}
                  alt="상품 썸네일"
                  className="w-[23vw] h-[23vw] min-w-[180px] min-h-[180px] max-w-[320px] max-h-[320px] rounded-lg drop-shadow-lg hover:drop-shadow-none"
                />
                {productWishList.includes(item.productId) ? (
                  <div
                    className="absolute bottom-0 right-2 text-[#02020233] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.productId)}
                  >
                    <HeartFilled />
                  </div>
                ) : (
                  <div
                    className="absolute bottom-0 right-2 text-[#FF6464] text-[30px] hover:-translate-y-[2px] cursor-pointer"
                    onClick={(e) => handleWishButton(e, item.productId)}
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
              </div>
            </div>
          ))}
          <div className="w-full text-center mt-5">
            <Pagination
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
