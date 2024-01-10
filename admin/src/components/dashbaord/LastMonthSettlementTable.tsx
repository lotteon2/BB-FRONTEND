import { useState } from "react";
import { Pagination, PaginationProps, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { settlementItem } from "../../recoil/common/interfaces";
import { useQuery } from "react-query";
import HalfDiv from "../fallbacks/HalfDiv";
import { getSettlementList } from "../../apis/settlement";

export default function LastMonthSettlementTable() {
  const [page, setPage] = useState<number>(1);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const { data, isLoading } = useQuery({
    queryKey: ["getSettlementList", page],
    queryFn: () =>
      getSettlementList(
        year,
        month,
        undefined,
        page - 1,
        6,
        undefined,
        undefined
      ),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<settlementItem> = [
    {
      title: "가게명",
      dataIndex: "storeName",
      key: "storeName",
      ellipsis: true,
    },
    {
      title: "월별 총 매출액",
      dataIndex: "totalAmountPerMonth",
      key: "totalAmountPerMonth",
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "정산 금액",
      dataIndex: "settlementAmount",
      key: "settlementAmount",
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "입금 은행",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "입금 계좌",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "정산일시",
      dataIndex: "settlementDate",
      key: "settlementDate",
    },
  ];

  if (!data || isLoading) return <HalfDiv />;
  return (
    <div>
      <Table
        dataSource={data.data.settlementDtoList}
        columns={columns}
        pagination={false}
        style={{ height: 385 }}
      />
      <div className="mt-2 text-center">
        <Pagination
          defaultCurrent={page}
          total={data.data.totalCnt}
          defaultPageSize={6}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
