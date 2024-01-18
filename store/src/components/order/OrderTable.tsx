import { useState } from "react";
import { Pagination, PaginationProps, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { orderDelivery } from "../../recoil/common/interfaces";
import OrderDetailModal from "./OrderDetailModal";
import { useQuery } from "react-query";
import { getOrderList } from "../../apis/order";
import { useRecoilValue } from "recoil";
import { deliveryState, storeIdState } from "../../recoil/atom/common";
import ListFallback from "../fallbacks/ListFallback";

interface param {
  status: string | undefined;
}
export default function OrderTable(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderGroupId, setOrderGroupId] = useState<string>("");
  const isChange = useRecoilValue<boolean>(deliveryState);

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderList", param, page, isChange],
    queryFn: () => getOrderList(storeId, page - 1, 5, param.status),
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleOrderDetail = (orderDeliveryId: string) => {
    setOrderGroupId(orderDeliveryId);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<orderDelivery> = [
    {
      title: "주문번호",
      dataIndex: "orderDeliveryId",
      key: "productName",
      width: 150,
      render: (record) => <p>{record.split("-")[0]}</p>,
    },
    {
      title: "",
      dataIndex: "",
      key: "productThumbnail",
      render: (record) => {
        return (
          <img
            className="w-[110px] h-[110px]"
            src={record.products[0].thumbnailImage}
            alt="상품 이미지"
          />
        );
      },
    },
    {
      title: "상품명",
      dataIndex: "products",
      key: "productName",
      ellipsis: true,
      render: (record) => (
        <div>
          {record.length === 1 ? (
            <p>{record[0].name}</p>
          ) : (
            <p>
              {record[0].name} 외 {record.length - 1}건
            </p>
          )}
        </div>
      ),
      width: 300,
    },
    {
      title: "배송지",
      dataIndex: "",
      key: "address",
      render: (record) => (
        <div>
          <p>{record.roadName}</p>
          <p>{record.addressDetail}</p>
        </div>
      ),
      width: 400,
    },
    {
      title: "결제금액",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (record) => <p>{Number(record).toLocaleString()} 원</p>,
    },
    {
      title: "결제일시",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "주문상태",
      dataIndex: "orderDeliveryStatus",
      key: "orderDeliveryStatus",
      render: (record) => (
        <Tag
          bordered={false}
          color={
            record === "PENDING"
              ? "purple"
              : record === "PROCESSING"
              ? "green"
              : ""
          }
        >
          {record === "PENDING"
            ? "주문접수"
            : record === "PROCESSING"
            ? "배송시작"
            : "배송완료"}
        </Tag>
      ),
    },
  ];

  if (!data || isLoading) return <ListFallback />;

  return (
    <div className="w-full text-center">
      <div className="h-[780px] overflow-auto">
        <Table
          dataSource={data.data.orders}
          columns={columns}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => {
                handleOrderDetail(record.orderDeliveryId);
              },
            };
          }}
        />
      </div>
      <Pagination
        showSizeChanger={false}
        defaultCurrent={page}
        total={data.data.totalCnt}
        defaultPageSize={5}
        onChange={handlePage}
      />
      {isModalOpen ? (
        <OrderDetailModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          orderGroupId={orderGroupId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
