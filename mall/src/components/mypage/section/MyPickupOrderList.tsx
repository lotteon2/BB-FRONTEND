import { Pagination, PaginationProps, Tag } from "antd";
import { useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { pickupOrderItemDto } from "../../../recoil/common/interfaces";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPickupOrderList } from "../../../apis/member";
import Loading from "../../common/Loading";

export default function MyPickupOrderList() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyPickupOrderList", page],
    queryFn: () => getMyPickupOrderList(page - 1, 10),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<pickupOrderItemDto> = [
    {
      title: "주문번호",
      dataIndex: "key",
      key: "key",
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "productThumbnail",
      key: "productThumbnail",
      ellipsis: true,
      render: (record) => {
        return (
          <img
            className="w-[110px] h-[110px] rounded-lg"
            src={record}
            alt="상품 이미지"
          />
        );
      },
    },
    {
      title: "예약정보",
      dataIndex: "",
      key: "productName",
      ellipsis: true,
      render: (record) => (
        <div>
          <p className="text-ellipsis overflow-hidden ...">
            {record.productName} / {record.quantity.toLocaleString()}개
          </p>
          <p className="text-ellipsis overflow-hidden ...">
            {record.storeAddress}
          </p>
        </div>
      ),
    },
    {
      title: "결제금액",
      dataIndex: "actualPrice",
      key: "actualPrice",
      ellipsis: true,
      render: (record) => (
        <p className="text-ellipsis overflow-hidden ...">
          {Number(record).toLocaleString()} 원
        </p>
      ),
    },
    {
      title: "픽업일시",
      dataIndex: "",
      key: "pickupDate",
      ellipsis: true,
      render: (record) => (
        <div>
          <p className="text-ellipsis overflow-hidden ...">
            {record.pickupDate}
          </p>
          <p className="text-ellipsis overflow-hidden ...">
            {record.pickupTime}
          </p>
        </div>
      ),
    },
    {
      title: "예약상태",
      dataIndex: "reservationStatus",
      key: "reservationStatus",
      ellipsis: true,
      render: (record) => (
        <Tag bordered={false} color={record === "PENDING" ? "purple" : ""}>
          {record === "PENDING" ? "예약접수" : "픽업완료"}
        </Tag>
      ),
    },
  ];

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full mt-3">
      <Table
        dataSource={data.data.data}
        columns={columns}
        pagination={false}
        style={{ minWidth: 1100 }}
        onRow={(render) => {
          return {
            onClick: () => {
              navigate("/order/detail/pickup/" + render.key);
            },
          };
        }}
      />
      <div className="w-full text-center mt-5">
        <Pagination
          defaultCurrent={page}
          total={data.data.totalCnt}
          defaultPageSize={10}
          onChange={handlePage}
        />
      </div>
    </div>
  );
}
