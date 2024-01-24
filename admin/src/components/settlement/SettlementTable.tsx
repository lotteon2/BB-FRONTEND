import { Table, Pagination, Empty } from "antd";
import { ColumnsType } from "antd/es/table";
import { settlementItem } from "../../recoil/common/interfaces";

interface param {
  data: settlementItem[];
  page: number;
  handlePage: (page: number, pageSize: number) => void;
  totalCnt: number;
}

export default function SettlementTable(param: param) {
  const columns: ColumnsType<settlementItem> = [
    {
      title: "가게명",
      dataIndex: "storeName",
      key: "storeName",
      ellipsis: true,
    },
    {
      title: "정산 금액",
      dataIndex: "totalAmountPerMonth",
      key: "totalAmountPerMonth",
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "월별 총 매출액",
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

  return (
    <div>
      {param.totalCnt === 0 ? (
        <Empty description="정산 내역이 없습니다." className="pt-80" />
      ) : (
        <div>
          <Table
            dataSource={param.data}
            columns={columns}
            pagination={false}
            style={{ height: 775 }}
          />
          <div className="mt-2 text-center">
            <Pagination
              showSizeChanger={false}
              defaultCurrent={param.page}
              total={param.totalCnt}
              defaultPageSize={13}
              onChange={param.handlePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
