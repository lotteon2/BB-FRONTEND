import { useState, useEffect, useCallback, useRef } from "react";
import { PictureFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { subscriptionRegisterDto } from "../../../recoil/common/interfaces";
import { useMutation } from "react-query";
import { getImageUrl } from "../../../apis/image";
import { FailToast } from "../../common/toast/FailToast";
import { registerSubscriptionInfo } from "../../../apis/store";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";
import { SuccessToast } from "../../common/toast/SuccessToast";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
}
export default function SubscriptionRegisterModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [registerValues, setRegisterValues] = useState<subscriptionRegisterDto>(
    {
      productName: "",
      productSummary: "",
      productPrice: null,
      productDescriptionImage: "",
      productThumbnail: "",
    }
  );

  const handleResetValues = () => {
    setRegisterValues({
      productName: "",
      productSummary: "",
      productPrice: null,
      productDescriptionImage: "",
      productThumbnail: "",
    });

    param.handleCancel();
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const formData = new FormData();
    if (e.target.files !== null) {
      formData.append("image", e.target.files[0]);
      if (type === "thumbnail") {
        thumbnailMutation.mutate(formData);
      } else {
        descriptionMutation.mutate(formData);
      }
    }
  };

  const handleRegister = () => {
    if (
      registerValues.productThumbnail !== "" &&
      registerValues.productName !== "" &&
      registerValues.productSummary !== "" &&
      registerValues.productPrice !== null &&
      registerValues.productDescriptionImage !== ""
    ) {
      registerMutation.mutate();
    }
  };

  const thumbnailMutation = useMutation(
    ["imageUpload"],
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setRegisterValues((prev) => ({ ...prev, productThumbnail: data }));
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const descriptionMutation = useMutation(
    ["descriptionImageUpload"],
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setRegisterValues((prev) => ({
          ...prev,
          productDescriptionImage: data,
        }));
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const registerMutation = useMutation(
    ["registerSubscriptionInfo"],
    () => registerSubscriptionInfo(storeId, registerValues),
    {
      onSuccess: () => {
        SuccessToast("등록되었습니다.");
        param.handleCancel();
        param.handleChange();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const handleThumbnailImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(registerValues);
  }, [form, registerValues]);

  return (
    <Modal
      title="구독상품 등록"
      open={param.isModalOpen}
      onCancel={param.handleCancel}
      footer={[]}
      maskClosable={false}
    >
      <Form
        form={form}
        name="subscriptionRegisterform"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoCapitalize="off"
        initialValues={registerValues}
        onFinish={handleRegister}
      >
        <div className="flex flex-row gap-3">
          <Form.Item
            name="productThumbnail"
            rules={[{ required: true, message: "필수 입력값입니다." }]}
          >
            <Input
              value={registerValues.productThumbnail}
              style={{ display: "none" }}
            />
            <div
              className="w-[200px] h-[200px] cursor-pointer"
              onClick={handleThumbnailImage}
            >
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                className="w-full h-full"
                style={{ display: "none" }}
                onChange={(e) => handleImage(e, "thumbnail")}
              />
              {registerValues.productThumbnail === "" ? (
                <div className="text-center">
                  <PictureFilled style={{ fontSize: 150 }} />
                  <p className="text-[1rem]">썸네일 이미지 등록</p>
                </div>
              ) : (
                <img
                  src={registerValues.productThumbnail}
                  alt="썸네일 이미지"
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
          </Form.Item>
          <div className="w-[250px]">
            <Form.Item
              name="productName"
              label="상품명"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <Input
                placeholder="가게 이름"
                value={registerValues.productName}
                onChange={(e) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    productName: e.target.value,
                  }))
                }
              />
            </Form.Item>

            <Form.Item
              name="productSummary"
              label="요약설명"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <Input
                placeholder="요약설명"
                value={registerValues.productSummary}
                onChange={(e) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    productSummary: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item
              name="productPrice"
              label="가격"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <InputNumber
                placeholder="가격"
                value={registerValues.productPrice}
                onChange={(e) =>
                  setRegisterValues((prev) => ({ ...prev, productPrice: e }))
                }
                style={{ width: 167 }}
              />
            </Form.Item>
            <Form.Item
              name="productDescriptionImage"
              label="상세설명"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <Input
                value={registerValues.productDescriptionImage}
                style={{ display: "none" }}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full h-full"
                onChange={(e) => handleImage(e, "description")}
              />
            </Form.Item>
          </div>
        </div>
        {registerValues.productDescriptionImage === "" ? (
          ""
        ) : (
          <div>
            <div className="border-t-[1px] border-grayscale3"></div>
            <div className="h-[200px] overflow-auto">
              <img
                src={registerValues.productDescriptionImage}
                alt="상품 상세 이미지"
              />
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2 justify-end mt-5">
          <Button onClick={handleResetValues}>취소</Button>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
