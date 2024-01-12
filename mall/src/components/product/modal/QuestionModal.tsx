import { Button, Modal, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";

import { questionItemDto } from "../../../recoil/common/interfaces";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: questionItemDto | undefined;
}
export default function QuestionModal(param: param) {
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
          <Tag bordered={false}>{param.data?.createdAt} 작성됨</Tag>
          <p className="text-[1.3rem] font-bold">{param.data?.title}</p>
          <div className="text-[1rem] h-32 rounded-lg p-2 overflow-auto">
            {param.data?.content}
          </div>
          <p className="border-b-[1px] border-grayscale3 mt-5"></p>
          <div className="mt-5">
            <div className="flex flex-row gap-2 mb-2">
              <span>답변 내용</span>
              <Tag bordered={false}>
                {param.data?.isReplied ? "작성됨" : ""}
              </Tag>
            </div>
            <TextArea
              disabled
              value={param.data?.reply}
              autoSize={{ minRows: 6, maxRows: 6 }}
              placeholder="답변 대기중입니다."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
