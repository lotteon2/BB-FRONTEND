import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { loginState, nameState, storeIdState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { reRegisterBusinessNumberImage, signin } from "../apis/auth";
import {
  reRegisterBusinessNumberImageDto,
  signinDto,
} from "../recoil/common/interfaces";
import { SuccessToast } from "../components/common/toast/SuccessToast";
import { FailToast } from "../components/common/toast/FailToast";
import { getImageUrl } from "../apis/image";

export default function LoginPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const setName = useSetRecoilState<string>(nameState);
  const setStoreId = useSetRecoilState<number | null>(storeIdState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [businessNumberImage, setBusinessNumberImage] = useState<string>("");
  const defaultValues = {
    email: "",
    password: "",
  };

  // 로그인 요청
  const handleSignin = () => {
    const signinDto = {
      email: email,
      password: password,
    };

    signinMutation.mutate(signinDto);
  };

  // 이미지 등록
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      imageMutation.mutate(formData);
    }
  };

  // 사업자등록번호 재등록
  const handleReRegister = () => {
    const reRegisterDto = {
      email: email,
      businessNumberImage: businessNumberImage,
    };

    if (businessNumberImage !== "") reRegisterMutation.mutate(reRegisterDto);
  };

  const signinMutation = useMutation(
    ["signin"],
    (signinDto: signinDto) => signin(signinDto),
    {
      onSuccess: (res) => {
        setName(res.data.data.name);
        setStoreId(res.data.data.storeId);
        localStorage.setItem("accessToken", res.headers["authorization"]);
        SuccessToast("로그인되었습니다.");
        setIsLogin(true);
        navigate("/");
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          if (error.response.data.message === "관리자의 승인을 기다려주세요.")
            FailToast(error.response.data.message);
          else FailToast("아이디/비밀번호를 확인해주세요.");
        } else if (error.response.status === 301) {
          setIsModalOpen(true);
        }
      },
    }
  );

  const imageMutation = useMutation(
    ["uploadImage"],
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setBusinessNumberImage(data);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const reRegisterMutation = useMutation(
    ["reRegisterBusinessNumberImage"],
    (reRegisterDto: reRegisterBusinessNumberImageDto) =>
      reRegisterBusinessNumberImage(reRegisterDto),
    {
      onSuccess: (data) => {
        SuccessToast(data.message);
        setIsModalOpen(false);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  return (
    <div className="relative top-72 left-[550px] w-[800px] h-[350px] bg-grayscale1 shadow-lg z-10 rounded-lg">
      <p className="relative top-[-40px] logo text-8xl text-primary1 text-center">
        Blooming Blooms
      </p>
      <Form
        name="loginForm"
        initialValues={defaultValues}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        style={{ marginLeft: 150, marginTop: 20 }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "이메일을 입력해주세요",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="이메일 입력"
            value={email}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호을 입력해주세요",
            },
          ]}
        >
          <Input.Password
            placeholder="비밀번호 입력"
            value={password}
            prefix={<LockOutlined className="site-form-item-icon" />}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-[490px]"
          onClick={handleSignin}
        >
          로그인
        </Button>
      </Form>
      <div className="flex flex-row gap-3 justify-end mt-10 mr-5">
        <span className="font-light text-grayscale4">계정이 없으신가요?</span>
        <span
          className="text-primary1 font-bold cursor-pointer hover:opacity-80"
          onClick={() => navigate("/register")}
        >
          회원가입
        </span>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form
          name="registerBusinessNumberImage"
          initialValues={{ remember: true }}
          autoComplete="off"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          style={{ marginLeft: 20, marginTop: 20 }}
        >
          <Form.Item
            name="businessNumberImage"
            label="사업자 등록증"
            rules={[
              {
                required: true,
                message: "사업자 등록증을 제출해주세요",
              },
            ]}
          >
            <div>
              <Input className="hidden" value={businessNumberImage} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-[435px]"
            onClick={handleReRegister}
          >
            재등록
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
