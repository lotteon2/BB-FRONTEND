import { myGiftCardList } from "../../../mocks/giftcard";
import { myCardListItemDto } from "../../../recoil/common/interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationProps } from "antd";

export default function MyGiftCardList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const data = myGiftCardList;

  //   const {data, isLoading} = useQuery({
  //     queryKey: ["getMyGiftCardList"],
  //     queryFn: () => getMyGiftCardList(page - 1, 21)
  //   })

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  //   if (!data || isLoading) return <Loading />

  return (
    <div className="my-10">
      <div className="flex flex-row gap-5 justify-center flex-wrap">
        {data.myCards.content.map((item: myCardListItemDto) => (
          <div
            key={item.cardId}
            className="cursor-pointer hover:-translate-y-0.5 hover:drop-shadow-lg"
            onClick={() =>
              navigate("/giftcard/detail/" + item.cardId + "/" + item.password)
            }
          >
            <img
              src={item.imageUrl}
              alt="기프트카드"
              className="w-40 min-w-[100px]"
            />
            <p className="text-[0.8rem] font-light text-right">
              {item.createdAt} 작성됨
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center">
        <Pagination
          defaultCurrent={page}
          total={data.totalCnt}
          defaultPageSize={21}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
