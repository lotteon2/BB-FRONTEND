import { useState } from "react";
import { Button, Form, Modal, Tag } from "antd";
import { useMutation, useQuery } from "react-query";
import { questionItemDto } from "../../../recoil/common/interfaces";
import { getQuestionDetail, registerAnswer } from "../../../apis/manage";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";
import Loading from "../../common/Loading";
import TextArea from "antd/es/input/TextArea";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: questionItemDto | undefined;
  handleChange: () => void;
}
export default function QuestionAnswerRegisterModal(param: param) {
  const [reply, setReply] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["getQuestionDetail"],
    queryFn: () => getQuestionDetail(param.data?.key),
  });

  const handleCanccel = () => {
    setReply(undefined);
    param.handleCancel();
  };

  const handleOk = () => {
    if (reply) {
      registerMutation.mutate(reply);
    }
  };

  const registerMutation = useMutation(
    ["registerAnswer"],
    (reply: string) => registerAnswer(param.data?.key, reply),
    {
      onSuccess: () => {
        SuccessToast("등록되었습니다.");
        param.handleChange();
        handleCanccel();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  if (!data || isLoading) return <Loading />;
  return (
    <div>
      <Modal
        open={param.isModalOpen}
        onCancel={handleCanccel}
        maskClosable={false}
        footer={[
          <Button onClick={handleCanccel}>취소</Button>,
          <Button onClick={handleOk} type="primary" htmlType="submit">
            답변 등록
          </Button>,
        ]}
        title="문의 상세"
      >
        <div className="w-full h-[470px] overflow-auto">
          <p className="py-2"></p>
          <Tag bordered={false}>
            {data.data.createdAt.split("T")[0] +
              " " +
              data.data.createdAt.split("T")[1]}{" "}
            작성됨
          </Tag>
          <p className="text-[1.3rem] font-bold">{data.data.title}</p>
          <div className="text-[1rem] h-32 rounded-lg p-2 overflow-auto">
            {data.data.content}
          </div>
          <p className="border-b-[1px] border-grayscale3 mt-5"></p>
          <div className="mt-5">
            <span>답변 작성</span>
            <Form
              name="questionAnswer"
              style={{ maxWidth: 600, width: "100%" }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                name="content"
                rules={[
                  { required: true, message: "답변 내용을 작성해주세요" },
                ]}
              >
                <TextArea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  autoSize={{ minRows: 6, maxRows: 6 }}
                  placeholder="답변 내용을 작성해주세요."
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
