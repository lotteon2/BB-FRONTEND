import { useState } from "react";
import { useQuery } from "react-query";
import { getMyQuestionsList } from "../../../apis/member";
import { Empty, Pagination, PaginationProps, Select, Table, Tag } from "antd";
import { myQuestionItemDto } from "../../../recoil/common/interfaces";
import { ColumnsType } from "antd/es/table";
import MypageTableFallback from "../../fallbacks/MypageTableFallback";

export default function MyQuestions() {
  const [page, setPage] = useState<number>(1);
  const [isReplied, setIsReplied] = useState<boolean>();

  const { data, isLoading } = useQuery({
    queryKey: ["getMyQuestionsList", page, isReplied],
    queryFn: () => getMyQuestionsList(page - 1, 10, isReplied),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<myQuestionItemDto> = [
    {
      title: "답변상태",
      dataIndex: "isReplied",
      ellipsis: true,
      render: (record) => (
        <Tag color={record ? "" : "purple"} bordered={false}>
          {record ? "답변완료" : "답변대기"}
        </Tag>
      ),
      key: "isReplied",
    },
    {
      title: "상품명",
      dataIndex: "productName",
      key: "productName",
      ellipsis: true,
    },
    {
      title: "작성자",
      dataIndex: "nickname",
      key: "nickname",
      ellipsis: true,
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "내용",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
  ];

  if (!data || isLoading) return <MypageTableFallback />;

  return (
    <div className="w-full h-full">
      <div className="flex justify-end mt-2">
        <Select
          value={isReplied}
          onChange={(e) => setIsReplied(e)}
          options={[
            {
              value: true,
              label: "답변완료",
            },
            {
              value: false,
              label: "답변대기",
            },
          ]}
          allowClear
          placeholder="답변 상태"
          style={{ width: 120 }}
        />
      </div>
      <div>
        {data.data.totalCnt === 0 ? (
          <Empty description="등록된 문의 내역이 없습니다." />
        ) : (
          <div className="mt-3">
            <Table
              dataSource={data.data.data}
              columns={columns}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="m-0 flex flex-col gap-2">
                    <p className="font-bold">{record.title}</p>
                    <p>{record.content}</p>
                    <p className="border-b-[1px]"></p>
                    <p>{record.reply}</p>
                    <p className="text-right">{record.repliedAt}</p>
                  </div>
                ),
                rowExpandable: (record) => record.isReplied,
              }}
            />
            <div className="w-full text-center mt-5">
              <Pagination
                showSizeChanger={false}
                defaultCurrent={page}
                total={data.data.totalCnt}
                defaultPageSize={10}
                onChange={handlePage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
