import { useRecoilValue } from "recoil";
import { nicknameState, profileImageState } from "../../../recoil/atom/common";
import { useCallback, useEffect, useRef, useState } from "react";
import { reviewRegisterDto } from "../../../recoil/common/interfaces";
import { Button, Form, Rate } from "antd";
import { PictureFilled } from "@ant-design/icons";
import { useMutation } from "react-query";
import { FailToast } from "../../common/toast/FailToast";
import { getImageUrl, uploadS3Server } from "../../../apis/image";
import TextArea from "antd/es/input/TextArea";
import { registerReview } from "../../../apis/product";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { useNavigate } from "react-router-dom";

interface param {
  productId: string;
  productOrderId: string;
  reviewType: string;
  handleChange: () => void;
  setIsModalOpen: (cur: boolean) => void;
}
export default function ReviewRegisterModal(param: param) {
  const navigate = useNavigate();
  const nickname = useRecoilValue<string>(nicknameState);
  const profileImage = useRecoilValue<string>(profileImageState);
  const [defaultValues, setDefaultValues] = useState<reviewRegisterDto>({
    id: param.productOrderId,
    reviewType: param.reviewType,
    reviewImage: [],
    reviewContent: "",
    rating: 0,
    nickname: nickname,
    profileImage: profileImage,
  });
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
      reviewImageMutation.mutate(e.target.files[0].name);
    }
  };

  const handleResetValues = () => {
    setDefaultValues({
      id: param.productOrderId,
      reviewType: param.reviewType,
      reviewImage: [],
      reviewContent: "",
      rating: 0,
      nickname: nickname,
      profileImage: profileImage,
    });
    param.setIsModalOpen(false);
  };

  const reviewImageMutation = useMutation(
    ["imageUpload"],
    (image: string) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setUrl(data.data.presignedUrl);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const handleRegister = () => {
    if (defaultValues.reviewContent !== "") {
      registerMutation.mutate();
    }
  };

  const registerMutation = useMutation(
    ["registerReview"],
    () => registerReview(param.productId, defaultValues),
    {
      onSuccess: () => {
        param.handleChange();
        SuccessToast("등록되었습니다.");
        navigate("/mypage");
      },
      onError: () => {
        FailToast(null);
      },
    }
  );
  const handleReviewImages = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const uploadMutation = useMutation(
    ["uploadS3"],
    (url: string) => uploadS3Server(url, file, file?.type),
    {
      onSuccess: () => {
        setDefaultValues((prev) => ({
          ...prev,
          reviewImage: [url.split("?")[0]],
        }));
      },
      onError: () => {
        FailToast("");
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    if (url !== "") {
      uploadMutation.mutate(url);
    }
    // eslint-disable-next-line
  }, [url]);

  return (
    <div>
      <Form
        form={form}
        name="reviewRegisterForm"
        autoCapitalize="off"
        initialValues={defaultValues}
        onFinish={handleRegister}
      >
        <div className="flex flex-row gap-5">
          <div
            className="w-[200px] h-[200px] cursor-pointer"
            onClick={handleReviewImages}
          >
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="w-full h-full"
              style={{ display: "none" }}
              onChange={handleImage}
              multiple
            />
            {defaultValues.reviewImage.length === 0 ? (
              <div>
                <PictureFilled
                  style={{
                    fontSize: "150px",
                    marginLeft: "22px",
                    marginTop: "10px",
                  }}
                />
                <p className="text-center">리뷰 이미지 등록</p>
              </div>
            ) : (
              <img
                src={defaultValues.reviewImage[0]}
                alt="썸네일 이미지"
                className="w-full h-full rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 w-[250px] mt-4">
            <Rate
              allowHalf
              defaultValue={defaultValues.rating}
              onChange={(value: number) =>
                setDefaultValues((prev) => ({ ...prev, rating: value }))
              }
              style={{ fontSize: 30 }}
            />
            <Form.Item
              name="reviewContent"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <TextArea
                placeholder="솔직한 후기를 남겨주세요."
                autoSize={{ minRows: 5, maxRows: 5 }}
                value={defaultValues.reviewContent}
                onChange={(e) =>
                  setDefaultValues((prev) => ({
                    ...prev,
                    reviewContent: e.target.value,
                  }))
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end mt-2">
          <Button onClick={handleResetValues}>취소</Button>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </div>
      </Form>
    </div>
  );
}
