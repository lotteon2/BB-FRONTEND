import { Pagination, PaginationProps, Select, Tag } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { getMyOrderList } from "../../../apis/member";
import Table, { ColumnsType } from "antd/es/table";
import { orderDeliveryGroupInfo } from "../../../recoil/common/interfaces";
import { myOrderListData } from "../../../mocks/mypage";
import { useNavigate } from "react-router-dom";

export default function MyOrderList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("PENDING");

  const data = myOrderListData;

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getMyOrderList", page, sort],
  //     queryFn: () => getMyOrderList(page - 1, 10, sort),
  //   });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<orderDeliveryGroupInfo> = [
    {
      title: "주문번호",
      dataIndex: "key",
      key: "key",
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "",
      key: "productThumbnail",
      render: (record) => {
        return (
          <img
            className="w-[110px] h-[110px] rounded-lg"
            src={record.thumbnailImage}
            alt="상품 이미지"
          />
        );
      },
    },
    {
      title: "상품명",
      dataIndex: "",
      key: "productName",
      ellipsis: true,
      render: (record) => (
        <div>
          {record.quantity === 1 ? (
            <p className="text-ellipsis overflow-hidden ...">
              {record.productName}
            </p>
          ) : (
            <p className="text-ellipsis overflow-hidden ...">
              {record.productName} 외 {record.quantity - 1}건
            </p>
          )}
        </div>
      ),
    },
    {
      title: "결제금액",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      ellipsis: true,
      render: (record) => (
        <p className="text-ellipsis overflow-hidden ...">
          {Number(record).toLocaleString()} 원
        </p>
      ),
    },
    {
      title: "결제일시",
      dataIndex: "paymentDate",
      key: "paymentDate",
      ellipsis: true,
    },
    {
      title: "주문상태",
      dataIndex: "",
      key: "orderStatus",
      ellipsis: true,
      render: (record) => (
        <div className="flex flex-row gap-1">
          <Tag
            bordered={false}
            color={
              record.orderStatus === "PENDING"
                ? "purple"
                : record === "PROCESSING"
                ? "green"
                : ""
            }
          >
            {record.orderStatus === "PENDING"
              ? "주문접수"
              : record === "PROCESSING"
              ? "배송시작"
              : "배송완료"}
          </Tag>
          {record.storeCount === 1 ? "" : <p>외 {record.storeCount - 1}건</p>}
        </div>
      ),
    },
  ];

  //   if (!data || isLoading) return null;

  return (
    <div className="w-full mt-3">
      <div className="flex justify-end mb-3">
        <Select
          value={sort}
          onChange={(e) => setSort(e)}
          options={[
            {
              value: "PENDING",
              label: "주문 접수",
            },
            {
              value: "PROCESSING",
              label: "배송 시작",
            },
            {
              value: "COMPLETED",
              label: "배송 완료",
            },
          ]}
          placeholder="답변 상태"
          style={{ width: 120 }}
        />
      </div>
      <Table
        dataSource={data.orders}
        columns={columns}
        pagination={false}
        style={{ minWidth: 1100 }}
        onRow={(render) => {
          return {
            onClick: () => {
              navigate("/order/detail/" + render.key);
            },
          };
        }}
      />
      <div className="w-full text-center mt-5">
        <Pagination
          defaultCurrent={page}
          total={data.totalCnt}
          defaultPageSize={10}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
