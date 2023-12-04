import { useState, useEffect, useCallback } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { kakaoLogin } from "../../apis/auth";
import { FailToast } from "../common/toast/FailToast";
import { useSetRecoilState } from "recoil";
import {
  loginState,
  nicknameState,
  profileImageState,
} from "../../recoil/atom/common";
import { Modal, Button, Form, Input } from "antd";
import MainPage from "../../pages/MainPage";

export default function KakaoLoginRedirect() {
  const url = new URL(window.location.href);
  const error: string | null = url.searchParams.get("error");
  const errorDescription: string | null =
    url.searchParams.get("error_description");
  const code: string | null = url.searchParams.get("code");

  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const setNickname = useSetRecoilState<string>(nicknameState);
  const setProfileImageState = useSetRecoilState<string>(profileImageState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // 핸드폰번호 입력
  const handlePhoneNumber = () => {
    if (
      phoneNumber !== "" &&
      !isNaN(Number(phoneNumber)) &&
      phoneNumber.length === 11
    ) {
      // 핸드폰번호 전송
    }
  };

  const checkPhoneNumber = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("핸드폰번호를 입력해주세요."));
    }
    if (isNaN(Number(value))) {
      return Promise.reject(new Error("숫자만 입력해주세요."));
    }
    if (value.length < 11) {
      return Promise.reject(new Error("정확한 핸드폰번호를 입력해주세요."));
    }
  }, []);

  const loginMutation = useMutation(["kakaoLogin"], () => kakaoLogin(code), {
    onSuccess: (data) => {
      setIsLogin(true);
      setNickname(data.nickname);
      setProfileImageState(data.profileImage);

      if (data.phoneNumberIsRegistered) {
        // 핸드폰번호 강제 입력
        setIsModalOpen(true);
      }

      localStorage.setItem("accessToken", data["accessToken"]);
    },
    onError: () => {
      FailToast(null);
      navigate("/login");
    },
  });

  // const phoneNumberMutation = useMutation();

  useEffect(() => {
    if (!!error && !!errorDescription) {
      alert(errorDescription);
    } else {
      loginMutation.mutate();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>클릭</button>
      <MainPage />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handlePhoneNumber}
        title="개인정보 수집"
        maskClosable={false}
        footer={[
          <Button
            size="large"
            type="primary"
            style={{ width: "100%" }}
            htmlType="submit"
          >
            저장
          </Button>,
        ]}
      >
        <div className="mt-4 mb-2 text-grayscale5 font-light">
          원활한 사용을 위해 핸드폰 번호 입력이 필요합니다.
        </div>
        <Form
          name="phoneNumberInputForm"
          labelCol={{ span: 8 }}
          onFinish={handlePhoneNumber}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                validator: checkPhoneNumber,
              },
            ]}
          >
            <Input
              placeholder="핸드폰 번호 입력(- 없이 숫자만 입력해주세요)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={11}
              minLength={11}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
