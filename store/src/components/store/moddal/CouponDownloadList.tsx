import Table, { ColumnsType } from "antd/es/table";
import { couponDownloadDto } from "../../../recoil/common/interfaces";
import { Pagination, PaginationProps, Tag, Typography } from "antd";
import { useQuery } from "react-query";
import { getCouponDownloadList } from "../../../apis/store";
import { useState } from "react";
import Loading from "../../common/Loading";

interface param {
  couponId: number;
}

export default function CouponDownloadList(param: param) {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getCouponDownloadList", param],
    queryFn: () => getCouponDownloadList(param.couponId, page - 1, 10),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<couponDownloadDto> = [
    {
      title: <Typography.Text>닉네임</Typography.Text>,
      key: "nickname",
      dataIndex: "nickname",
      ellipsis: true,
    },
    {
      title: <Typography.Text>연락처</Typography.Text>,
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      ellipsis: true,
    },
    {
      title: <Typography.Text>발급일자</Typography.Text>,
      key: "createdAt",
      dataIndex: "createdAt",
      ellipsis: true,
    },
    {
      title: <Typography.Text>사용여부</Typography.Text>,
      key: "isUsed",
      dataIndex: "isUsed",
      ellipsis: true,
      render: (record) => (
        <div>
          {record ? (
            <Tag bordered={false} color="purple">
              사용 완료
            </Tag>
          ) : (
            <Tag bordered={false}>사용전</Tag>
          )}
        </div>
      ),
    },
  ];

  if (!data || isLoading) return <Loading />;

  return (
    <div className="">
      <Table dataSource={data.data.data} columns={columns} pagination={false} />
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
