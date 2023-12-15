import { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import { loginState, nameState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { signin } from "../apis/auth";
import { signinDto } from "../recoil/common/interfaces";
import { SuccessToast } from "../components/common/toast/SuccessToast";
import { FailToast } from "../components/common/toast/FailToast";

export default function LoginPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState<boolean>(loginState);
  const setName = useSetRecoilState<string>(nameState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  const signinMutation = useMutation(
    ["signin"],
    (signinDto: signinDto) => signin(signinDto),
    {
      onSuccess: (res) => {
        setName(res.data.name);
        localStorage.setItem("accessToken", res.headers["authorization"]);
        SuccessToast("로그인되었습니다.");
        setIsLogin(true);
        navigate("/");
      },
      onError: (error: any) => {
        if (error.response.data.code === "401") {
          FailToast(error.response.data.message);
        }
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
    </div>
  );
}
