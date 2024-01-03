import { useState, useEffect, useCallback } from "react";
import { Button, Form, Input } from "antd";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/atom/common";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import {
  checkEmail,
  sendEmailCode,
  signup,
  verifyEmailCode,
} from "../apis/auth";
import { SuccessToast } from "../components/common/toast/SuccessToast";
import { FailToast } from "../components/common/toast/FailToast";
import { signupDto } from "../recoil/common/interfaces";
import { getImageUrl } from "../apis/image";

export default function RegisterPage() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue<boolean>(loginState);
  const [email, setEmail] = useState<string>("");
  const [emailcode, setEmailCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [businessNumberImage, setBusinessNumberImage] = useState<string>(
    "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg"
  );
  const defaultValues = {
    email: "",
    emailCode: "",
    password: "",
    name: "",
    businessNumberImage:
      "https://f-mans.com/data/goods/1/2022/11/140_temp_16675233646624view.jpg",
  };
  const email_pattern =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+.[a-zA-Z]+$/i;
  const blank_pattern = "/^s+|s+$/g";
  const password_pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
  const korean_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  // 이메일 중복 확인
  const handleCheckEmail = () => {
    emailCheckMutation.mutate();
  };

  // 인증코드 발송
  const handleSendEmailCode = () => {
    sendEmailCodeMutation.mutate();
  };

  // 인증코드 확인
  const handleCheckEmailCode = () => {
    checkEmailCodeMutation.mutate();
  };

  // 이미지 등록
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      imageMutation.mutate(e.target.files[0].name);
    }
  };

  // 회원가입
  const handleSignup = () => {
    if (!isValid) {
      alert("이메일 충복 체크를 해주세요.");
    } else if (!isConfirm) {
      alert("인증 코드 확인이 필요합니다.");
    } else if (
      email !== "" &&
      email_pattern.test(email) &&
      !email.match(blank_pattern) &&
      isValid &&
      emailcode !== "" &&
      isConfirm &&
      password !== "" &&
      password.match(password_pattern) &&
      !password.match(blank_pattern) &&
      !password.match(korean_pattern) &&
      name !== "" &&
      !name.match(blank_pattern) &&
      businessNumberImage !== ""
    ) {
      const signupDto = {
        email: email,
        isEmailVerified: isConfirm,
        password: password,
        name: name,
        businessNumberImage: businessNumberImage,
      };

      signupMutation.mutate(signupDto);
    }
  };

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

  const rightPassword = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("비밀번호를 입력해주세요."));
    }
    if (!value.match(password_pattern)) {
      return Promise.reject(
        new Error("8~16자의 영문자, 숫자를 사용해 주세요.")
      );
    }
    if (value.match(blank_pattern)) {
      return Promise.reject(new Error("공백을 입력할 수 없습니다."));
    }
    if (value.match(korean_pattern)) {
      return Promise.reject(new Error("한글을 입력할 수 없습니다."));
    }
    return Promise.resolve();
    // eslint-disable-next-line
  }, []);

  const emailCheckMutation = useMutation(
    ["checkEmail"],
    () => checkEmail(email),
    {
      onSuccess: () => {
        SuccessToast("사용가능한 이메일입니다.");
        setIsValid(true);
      },
      onError: () => {
        FailToast("사용할 수 없는 이메일입니다.");
        setEmail("");
      },
    }
  );

  const sendEmailCodeMutation = useMutation(
    ["sendEmailCode"],
    () => sendEmailCode(email),
    {
      onSuccess: () => {
        SuccessToast("인증코드가 발송되었습니다.");
        setIsShow(true);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const checkEmailCodeMutation = useMutation(
    ["verifyEmailCode"],
    () => verifyEmailCode(email, emailcode),
    {
      onSuccess: () => {
        SuccessToast("인증되었습니다.");
        setIsConfirm(true);
      },
      onError: (error: any) => {
        if (error.response.status === 400) {
          FailToast("인증코드가 일치하지 않습니다.");
        } else {
          FailToast(null);
        }
      },
    }
  );

  const imageMutation = useMutation(
    ["uploadImage"],
    (image: string) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setBusinessNumberImage(data);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const signupMutation = useMutation(
    ["signup"],
    (signupDto: signupDto) => signup(signupDto),
    {
      onSuccess: () => {
        SuccessToast("인증까지 2~3일 소요됩니다.");
        navigate("/login");
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
    <div className="relative top-32 left-[550px] w-[800px] h-[600px] bg-grayscale1 shadow-lg z-10 rounded-lg">
      <p className="relative top-[-40px] logo text-8xl text-primary1 text-center">
        Blooming Blooms
      </p>
      <Form
        name="registerForm"
        initialValues={defaultValues}
        autoComplete="off"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 10 }}
        style={{ marginLeft: 20, marginTop: 20 }}
      >
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              required: true,
              validator: rightEmail,
            },
          ]}
        >
          <Input
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="emailCode"
          label="인증코드"
          rules={[
            {
              required: true,
              message: "인증코드를 입력해주세요",
            },
          ]}
        >
          <Input
            placeholder="인증코드 입력"
            value={emailcode}
            onChange={(e) => setEmailCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              validator: rightPassword,
            },
          ]}
        >
          <Input.Password
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 다시 한번 입력해주세요",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="비밀번호 확인" />
        </Form.Item>
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              validator: rightName,
            },
          ]}
        >
          <Input
            placeholder="이름 입력"
            value={name}
            maxLength={6}
            showCount
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
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
          className="w-[455px] ml-10"
          onClick={handleSignup}
        >
          회원가입
        </Button>
      </Form>
      <div className="absolute right-20 top-[115px] flex flex-col gap-6">
        <div className="flex flex-row gap-2 justify-start w-52">
          <Button
            type="primary"
            onClick={handleCheckEmail}
            disabled={isValid ? true : false}
          >
            중복확인
          </Button>
          {isValid ? (
            <Button
              onClick={handleSendEmailCode}
              disabled={isConfirm ? true : false}
            >
              인증코드 발송
            </Button>
          ) : (
            ""
          )}
        </div>
        {isShow ? (
          <Button
            type="primary"
            onClick={handleCheckEmailCode}
            disabled={isConfirm ? true : false}
          >
            인증하기
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row gap-3 justify-end mt-10 mr-5">
        <span className="font-light text-grayscale4">
          이미 계정이 있으신가요?
        </span>
        <span
          className="text-primary1 font-bold cursor-pointer hover:opacity-80"
          onClick={() => navigate("/login")}
        >
          로그인
        </span>
      </div>
    </div>
  );
}
