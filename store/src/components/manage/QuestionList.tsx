import { useState } from "react";
import { Empty, Pagination, PaginationProps, Select, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { questionItemDto } from "../../recoil/common/interfaces";
import { storeIdState } from "../../recoil/atom/common";
import { getQuestions } from "../../apis/manage";
import QuestionDetailModal from "./modal/QuestionDetailModal";
import QuestionAnswerRegisterModal from "./modal/QuestionAnswerRegisterModal";
import QuestionTableFallback from "../fallbacks/QuestionTableFallback";

export default function QuestionList() {
  const storeId = useRecoilValue<number>(storeIdState);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isReplied, setIsReplied] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [questionItem, setQuestionItem] = useState<questionItemDto>();

  const { data, isLoading } = useQuery({
    queryKey: ["getQuestions", isChange, page, isReplied],
    queryFn: () => getQuestions(storeId, page - 1, 15, isReplied),
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const columns: ColumnsType<questionItemDto> = [
    {
      title: "상품명",
      dataIndex: "productName",
      key: "productName",
      width: 130,
      ellipsis: true,
    },
    {
      title: "작성자",
      dataIndex: "nickname",
      key: "nickname",
      width: 130,
      ellipsis: true,
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: 400,
      ellipsis: true,
    },
    {
      title: "답변상태",
      dataIndex: "isReplied",
      render: (record) => (
        <Tag color={record ? "" : "purple"} bordered={false}>
          {record ? "답변완료" : "답변대기"}
        </Tag>
      ),
      key: "isReplied",
    },
  ];

  if (!data || isLoading) return <QuestionTableFallback />;

  return (
    <div className="w-full h-full">
      <div className="relative">
        <div className="text-xl font-bold text-left">문의 관리</div>
        <span className="absolute right-0 top-0 text-left">
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
        </span>
      </div>
      <div className="mt-5">
        {data.totalCnt === 0 ? (
          <Empty description="등록된 문의 내역이 없습니다." className="mt-72" />
        ) : (
          <div>
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    setIsModalOpen(true);
                    setQuestionItem(record);
                  },
                };
              }}
              style={{ height: 760 }}
              dataSource={data.data.data}
              columns={columns}
              pagination={false}
            />
            <div className="w-full text-center mt-2">
              <Pagination
                defaultCurrent={page}
                total={data.totalCnt}
                defaultPageSize={15}
                onChange={handlePage}
              />
            </div>
          </div>
        )}
      </div>
      {isModalOpen ? (
        questionItem?.isReplied ? (
          <QuestionDetailModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            data={questionItem}
          />
        ) : (
          <QuestionAnswerRegisterModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            data={questionItem}
            handleChange={handleChange}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}
