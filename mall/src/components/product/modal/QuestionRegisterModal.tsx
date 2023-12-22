import { useState, useEffect } from "react";
import { Modal, Checkbox, Form, Input, Button } from "antd";
import { questionRegisterDto } from "../../../recoil/common/interfaces";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atom/common";
import { useMutation } from "react-query";
import { registerQuestion } from "../../../apis/product";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { FailToast } from "../../common/toast/FailToast";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
  productName: string;
  storeId: number;
  productId: string | undefined;
}

const { TextArea } = Input;

export default function QuestionRegisterModal(param: param) {
  const nickname = useRecoilValue<string>(nicknameState);

  const [defaultValues, setDefaultValues] = useState<questionRegisterDto>({
    storeId: param.storeId,
    productId: param.productId,
    productName: param.productName,
    title: "",
    content: "",
    isSecret: false,
    nickname: nickname,
  });

  const handleSubmit = () => {
    registerMutation.mutate(defaultValues);
  };

  const registerMutation = useMutation(
    ["registerQuestion"],
    (registerDto: questionRegisterDto) => registerQuestion(registerDto),
    {
      onSuccess: () => {
        SuccessToast("등록되었습니다.");
        param.handleChange();
        param.handleCancel();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  return (
    <Modal
      open={param.isModalOpen}
      onCancel={param.handleCancel}
      title="문의 작성"
      footer={[]}
    >
      <div className="flex justify-end">
        <Checkbox
          onChange={(e) =>
            setDefaultValues((prev) => ({
              ...prev,
              isSecret: e.target.checked,
            }))
          }
        >
          비공개
        </Checkbox>
      </div>
      <Form
        name="questionRegisterForm"
        style={{ maxWidth: 600, width: "100%" }}
        autoComplete="off"
        initialValues={defaultValues}
        onFinish={handleSubmit}
      >
        <p className="ml-1">제목</p>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <Input
            value={defaultValues.title}
            placeholder="제목을 입력해주세요"
            onChange={(e) =>
              setDefaultValues((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </Form.Item>
        <p className="ml-1">내용</p>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "필수 입력값입니다." }]}
        >
          <TextArea
            value={defaultValues.content}
            placeholder="내용을 작성해주세요."
            autoSize={{ minRows: 5, maxRows: 5 }}
            onChange={(e) =>
              setDefaultValues((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </Form.Item>
        <div className="flex flex-row justify-end gap-3">
          <Button onClick={() => param.handleCancel()}>취소</Button>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
