import { useState, useRef, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { modifyMemberDto } from "../../../recoil/common/interfaces";
import { useMutation, useQuery } from "react-query";
import { getMyInfo, modifyMemberInfo } from "../../../apis/member";
import { FailToast } from "../../common/toast/FailToast";
import { SuccessToast } from "../../common/toast/SuccessToast";
import ModifyMemberInfoFallback from "../../fallbacks/ModifyMemberInfoFallback";

export default function ModifyMemberInfo() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<modifyMemberDto>({
    nickname: "",
    email: "",
    phoneNumber: "",
  });

  const email_pattern =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+.[a-zA-Z]+$/i;
  const blank_pattern = "/^s+|s+$/g";
  const korean_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const rightEmail = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("이메일을 입력해주세요."));
    }
    if (!email_pattern.test(value)) {
      return Promise.reject(new Error("이메일 형식으로 입력해주세요."));
    }
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const rightName = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("이름을 입력해주세요."));
    }
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const rightPhone = useCallback((_: any, value: string) => {
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    if (value.match(korean_pattern)) {
      return Promise.reject(new Error("한글을 입력할 수 없습니다."));
    }
    if (value.length < 11) {
      return Promise.reject(new Error("올바른 연락처를 입력해주세요."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyInfo", isChange],
    queryFn: () => getMyInfo(),
  });

  //   const data = infoData;

  const handleThumbnailImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRegister = () => {
    if (
      defaultValues.nickname !== "" &&
      defaultValues.email !== "" &&
      defaultValues.phoneNumber !== "" &&
      !defaultValues.nickname.match(blank_pattern) &&
      defaultValues.email.match(email_pattern) &&
      !defaultValues.phoneNumber.match(korean_pattern) &&
      defaultValues.phoneNumber.length === 11
    )
      modifyMutation.mutate();
  };

  const modifyMutation = useMutation(
    ["modifyMemberInfo"],
    () => modifyMemberInfo(defaultValues),
    {
      onSuccess: () => {
        SuccessToast("수정되었습니다.");
        setIsChange((cur) => !cur);
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

  useEffect(() => {
    if (data) {
      setDefaultValues({
        nickname: data.data.data.nickname,
        email: data.data.data.email,
        phoneNumber: data.data.data.phoneNumber,
      });
    }
  }, [data]);

  if (!data || isLoading) return <ModifyMemberInfoFallback />;

  return (
    <div className="flex flex-row gap-5 mt-5 flex-wrap max-[375px]:justify-center">
      <div className="w-40 h-40 curwor-pointer" onClick={handleThumbnailImage}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="w-full h-full"
          style={{ display: "none" }}
          // onChange={handleImage}
        />
        <img
          src={data.data.data.profileImage}
          alt="프로필 이미지"
          className="w-40 h-40 rounded-full"
        />
      </div>
      <div>
        <Form
          form={form}
          name="modifyMemberInfoForm"
          autoCapitalize="off"
          initialValues={{ defaultValues }}
          onFinish={handleRegister}
        >
          <Form.Item
            name="nickname"
            label="닉네임"
            rules={[{ required: true, validator: rightName }]}
          >
            <Input
              placeholder="닉네임"
              value={defaultValues.nickname}
              onChange={(e) =>
                setDefaultValues((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              maxLength={6}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[{ required: true, validator: rightEmail }]}
          >
            <Input
              placeholder="이메일"
              value={defaultValues.email}
              onChange={(e) =>
                setDefaultValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="연락처"
            rules={[{ required: true, validator: rightPhone }]}
          >
            <Input
              placeholder="연락처"
              value={defaultValues.phoneNumber}
              onChange={(e) =>
                setDefaultValues((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              minLength={11}
              maxLength={11}
              showCount
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: 350 }}
          >
            수정
          </Button>
        </Form>
      </div>
    </div>
  );
}
