import {
  Button,
  Select,
  Tag,
  Table,
  Empty,
  Pagination,
  PaginationProps,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useQuery } from "react-query";
import { getProductQuestionList } from "../../../apis/product";
import ReviewListFallback from "../../fallbacks/ReviewListFallback";
import { questionItemDto } from "../../../recoil/common/interfaces";
import { LockFilled } from "@ant-design/icons";
import QuestionModal from "../modal/QuestionModal";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../recoil/atom/common";
import QuestionRegisterModal from "../modal/QuestionRegisterModal";
import { useNavigate } from "react-router";

interface param {
  productId: string | undefined;
  productName: string;
  storeId: number;
}
export default function ProductQuestion(param: param) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState);
  const [page, setPage] = useState<number>(1);
  const [replied, setReplied] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [questionItem, setQuestionItem] = useState<questionItemDto>();
  const [findMine, setFindMine] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "getProductQuestionList",
      page,
      replied,
      findMine,
      isChange,
      isLogin,
    ],
    queryFn: () =>
      getProductQuestionList(
        param.productId,
        page - 1,
        10,
        replied,
        findMine,
        isLogin
      ),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRegister(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  const handleRegisterQuestion = () => {
    if (isLogin) {
      setIsRegister(true);
    } else if (window.confirm("회원만 사용가능합니다. 로그인하시겠습니까?")) {
      navigate("/login");
    }
  };

  const columns: ColumnsType<questionItemDto> = [
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
    {
      title: "작성자",
      dataIndex: "nickname",
      key: "nickname",
      ellipsis: true,
    },
    {
      title: "제목",
      dataIndex: "",
      key: "title",
      ellipsis: true,
      render: (record) => (
        <p>
          {record.isSecret ? (
            <span>
              <LockFilled /> {record.title}
            </span>
          ) : (
            record.title
          )}
        </p>
      ),
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
    },
  ];

  if (!data || isLoading)
    return (
      <div>
        <p className="text-[1.2rem]">상품문의</p>
        <p className="text-grayscale5">
          구매하시려는 상품에 대해 궁금한 점이 있으신 경우 문의해주세요.
        </p>
        <div className="flex flex-row my-3 relative">
          <div className="flex flex-row gap-3">
            <Button type="primary" onClick={handleRegisterQuestion}>
              문의 작성하기
            </Button>
            {isLogin ? (
              <Button onClick={() => setFindMine((cur) => !cur)}>
                {findMine ? "모든 문의내역 보기" : "내 문의내역 보기"}
              </Button>
            ) : (
              <div className="py-5"></div>
            )}
          </div>
          <div className="absolute right-0">
            <Select
              placeholder="답변 상태"
              value={replied}
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
              style={{ width: 120 }}
            />
          </div>
        </div>
        <div>
          <ReviewListFallback />
        </div>
      </div>
    );

  return (
    <div>
      <p className="text-[1.2rem]">상품문의</p>
      <p className="text-grayscale5">
        구매하시려는 상품에 대해 궁금한 점이 있으신 경우 문의해주세요.
      </p>
      <div className="flex flex-row my-3 relative">
        <div className="flex flex-row gap-3">
          <Button type="primary" onClick={handleRegisterQuestion}>
            문의 작성하기
          </Button>
          {isLogin ? (
            <Button onClick={() => setFindMine((cur) => !cur)}>
              {findMine ? "모든 문의내역 보기" : "내 문의내역 보기"}
            </Button>
          ) : (
            <div className="py-5"></div>
          )}
        </div>
        <div className="absolute right-0">
          <Select
            placeholder="답변 상태"
            value={replied}
            onChange={(e) => setReplied(e)}
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
            style={{ width: 120 }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 justify-center">
        {data.totalCnt === 0 ? (
          <Empty description="등록된 문의 내역이 없습니다." className="mt-10" />
        ) : (
          <div>
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    if (!record.isSecret || record.isMine) {
                      setIsModalOpen(true);
                      setQuestionItem(record);
                    }
                  },
                };
              }}
              dataSource={data.data.data}
              columns={columns}
              pagination={false}
            />
            <div className="text-center mt-5">
              <Pagination
                showSizeChanger={false}
                defaultCurrent={page}
                total={data.data.totalCnt}
                onChange={handlePage}
              />
            </div>
          </div>
        )}
      </div>
      {isModalOpen ? (
        <QuestionModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          data={questionItem}
        />
      ) : (
        ""
      )}
      {isRegister ? (
        <QuestionRegisterModal
          isModalOpen={isRegister}
          handleCancel={handleCancel}
          handleChange={handleChange}
          productId={param.productId}
          productName={param.productName}
          storeId={param.storeId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
