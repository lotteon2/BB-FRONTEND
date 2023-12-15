import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { signin } from "../apis/auth";
import { signinDto } from "../recoil/common/interfaces";
import { SuccessToast } from "../components/common/toast/SuccessToast";
import { FailToast } from "../components/common/toast/FailToast";

export default function LoginPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const defaultValues = {
    id: "",
    password: "",
  };

  // 로그인 요청
  const handleSignin = () => {
    const signinDto = {
      id: email,
      password: password,
    };

    signinMutation.mutate(signinDto);
  };

  const signinMutation = useMutation(
    ["signin"],
    (signinDto: signinDto) => signin(signinDto),
    {
      onSuccess: (res) => {
        console.log(res);
        SuccessToast("로그인되었습니다.");
        navigate("/");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    if (isLogin) navigate("/");
    // eslint-disable-next-line
  }, []);

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
          name="id"
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요",
            },
          ]}
        >
          <Input
            placeholder="아이디 입력"
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
    </div>
  );
}
