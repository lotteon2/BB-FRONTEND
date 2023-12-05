import { Button, Modal, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "react-query";
import { questionItemDto } from "../../../recoil/common/interfaces";
import { getQuestionDetail } from "../../../apis/manage";
import Loading from "../../common/Loading";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: questionItemDto | undefined;
}
export default function QuestionDetailModal(param: param) {
  const { data, isLoading } = useQuery({
    queryKey: ["getQuestionDetailReplied"],
    queryFn: () => getQuestionDetail(param.data?.key),
  });

  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <Modal
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        footer={<Button onClick={param.handleCancel}>닫기</Button>}
        title="문의 상세"
      >
        <div className="w-full overflow-auto">
          <p className="py-2"></p>
          <Tag bordered={false}>
            {data.createdAt.split("T")[0] + " " + data.createdAt.split("T")[1]}{" "}
            작성됨
          </Tag>
          <p className="text-[1.3rem] font-bold">{data.title}</p>
          <div className="text-[1rem] h-32 rounded-lg p-2 overflow-auto">
            {data.content}
          </div>
          <p className="border-b-[1px] border-grayscale3 mt-5"></p>
          <div className="mt-5">
            <div className="flex flex-row gap-2 mb-2">
              <span>답변 내용</span>
              <Tag bordered={false}>{data.answer.repliedAt} 작성됨</Tag>
            </div>
            <TextArea
              disabled
              value={data.answer.content}
              autoSize={{ minRows: 6, maxRows: 6 }}
              placeholder="답변 내용을 작성해주세요."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
