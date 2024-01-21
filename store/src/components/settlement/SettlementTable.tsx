import { ColumnsType } from "antd/es/table";
import { settlementDto } from "../../recoil/common/interfaces";
import { Table } from "antd";

interface param {
  data: settlementDto[];
}
export default function SettlementTable(param: param) {
  const columns: ColumnsType<settlementDto> = [
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

  return <Table dataSource={param.data} columns={columns} pagination={false} />;
}
