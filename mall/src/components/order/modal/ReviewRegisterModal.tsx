import { useRecoilValue } from "recoil";
import { nicknameState, profileImageState } from "../../../recoil/atom/common";
import { useCallback, useEffect, useRef, useState } from "react";
import { reviewRegisterDto } from "../../../recoil/common/interfaces";
import { Button, Form, Rate } from "antd";
import { PictureFilled } from "@ant-design/icons";
import { useMutation } from "react-query";
import { FailToast } from "../../common/toast/FailToast";
import { getImageUrl } from "../../../apis/image";
import TextArea from "antd/es/input/TextArea";
import { registerReview } from "../../../apis/product";
import { SuccessToast } from "../../common/toast/SuccessToast";

interface param {
  productId: string;
  productOrderId: string;
  reviewType: string;
  handleChange: () => void;
  setIsModalOpen: (cur: boolean) => void;
}
export default function ReviewRegisterModal(param: param) {
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const length = e.target.files.length;

      for (let i = 0; i < length; i++) {
        const formData = new FormData();
        formData.append("image", e.target.files[i]);
        reviewImageMutation.mutate(formData);
      }
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
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        let reviewImage = defaultValues.reviewImage;
        reviewImage.push(data);

        setDefaultValues((prev) => ({ ...prev, reviewImage: reviewImage }));
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
      },
      onError: () => {
        FailToast(null);
      },
    }
  );
  const handleReviewImages = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

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
              <div className="text-center">
                <PictureFilled style={{ fontSize: 150 }} />
                <p className="text-[1rem]">
                  {defaultValues.reviewImage.length} / 3
                </p>
              </div>
            ) : (
              <img
                src={defaultValues.reviewImage[0]}
                alt="썸네일 이미지"
                className="w-full h-full rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full mt-4">
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
                placeholder="주문한 상품에 대한 솔직한 후기를 남겨주세요."
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
