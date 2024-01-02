import { useState } from "react";
import { Empty, Pagination, PaginationProps, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { storeItemDto } from "../../recoil/common/interfaces";
import { useQuery } from "react-query";
import { getStoreList } from "../../apis/store";
import WholeDiv from "../fallbacks/WholeDiv";
import { storeListData } from "../../mocks/store";

interface param {
  sido: number;
  gugun: number | undefined;
  sort: string;
}
export default function StoreList(param: param) {
  const [page, setPage] = useState<number>(1);

  // const data = storeListData;
  const { data, isLoading } = useQuery({
    queryKey: ["getStoreList", page, param],
    queryFn: () =>
      getStoreList(page - 1, 13, param.sido, param.gugun, param.sort),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<storeItemDto> = [
    {
      title: "가게코드",
      dataIndex: "storeCode",
      key: "storeCode",
      ellipsis: true,
    },
    {
      title: "가게명",
      dataIndex: "storeName",
      key: "storeName",
      ellipsis: true,
    },
    {
      title: "대표 계좌",
      dataIndex: "",
      key: "accountNumber",
      ellipsis: true,
      width: 250,
      render: (record) => (
        <div className="flex flex-row gap-2">
          <p>{record.bank}</p>
          <p>{record.accountNumber}</p>
        </div>
      ),
    },
    {
      title: "평점",
      dataIndex: "averageRating",
      key: "averageRating",
      ellipsis: true,
      width: 80,
    },
    {
      title: "연락처",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
      render: (record) => (
        <p>
          {record.slice(0, 3) +
            "-" +
            record.slice(3, 7) +
            "-" +
            record.slice(7, 11)}
        </p>
      ),
    },
    {
      title: "총 매출액",
      dataIndex: "totalAmount",
      key: "totalAmount",
      ellipsis: true,
      render: (record) => <p>{record.toLocaleString()}원</p>,
    },
    {
      title: "등록일",
      dataIndex: "regDate",
      key: "regDate",
      ellipsis: true,
    },
  ];

  if (!data || isLoading) return <WholeDiv />;

  return (
    <div className="w-full h-[825px]">
      {data.totalCnt === 0 ? (
        <Empty description="가게정보가 존재하지 않습니다." className="pt-80" />
      ) : (
        <div>
          <Table
            dataSource={data.data.data}
            columns={columns}
            pagination={false}
            style={{ height: 775 }}
          />
          <div className="mt-2 text-center ab">
            <Pagination
              defaultCurrent={page}
              total={data.totalCnt}
              defaultPageSize={13}
              onChange={handlePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
