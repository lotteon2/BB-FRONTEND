import { useState, useEffect, useCallback, useRef } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import {
  subscriptionInfoDto,
  subscriptionRegisterDto,
} from "../../../recoil/common/interfaces";
import { useMutation } from "react-query";
import { getImageUrl } from "../../../apis/image";
import { FailToast } from "../../common/toast/FailToast";
import { modifySubscriptionInfo } from "../../../apis/store";
import { SuccessToast } from "../../common/toast/SuccessToast";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleChange: () => void;
  data: subscriptionInfoDto;
}

export default function SubscriptionModifyModal(param: param) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const [modifyValues, setModifyValues] = useState<subscriptionRegisterDto>({
    productName: param.data.productName,
    productSummary: param.data.productSummary,
    productPrice: param.data.productPrice,
    productDescriptionImage: param.data.productDescriptionImage,
    productThumbnail: param.data.productThumbnail,
  });

  const handleResetValues = () => {
    setModifyValues({
      productName: param.data.productName,
      productSummary: param.data.productSummary,
      productPrice: param.data.productPrice,
      productDescriptionImage: param.data.productDescriptionImage,
      productThumbnail: param.data.productThumbnail,
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

  const handleModify = () => {
    if (
      modifyValues.productThumbnail !== "" &&
      modifyValues.productName !== "" &&
      modifyValues.productSummary !== "" &&
      modifyValues.productPrice !== null &&
      modifyValues.productDescriptionImage !== ""
    ) {
      modifyMutation.mutate();
    }
  };

  const thumbnailMutation = useMutation(
    ["imageUpload"],
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setModifyValues((prev) => ({ ...prev, productThumbnail: data }));
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
        setModifyValues((prev) => ({
          ...prev,
          productDescriptionImage: data,
        }));
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const modifyMutation = useMutation(
    ["modifySubscriptionInfo"],
    () => modifySubscriptionInfo(param.data.productId, modifyValues),
    {
      onSuccess: () => {
        SuccessToast("수정되었습니다.");
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

  const handleDescriptionImage = useCallback(() => {
    descriptionInputRef.current?.click();
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(modifyValues);
  }, [form, modifyValues]);

  return (
    <Modal
      title="구독상품 수정"
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
        initialValues={modifyValues}
        onFinish={handleModify}
      >
        <div className="flex flex-row gap-3">
          <Form.Item
            name="productThumbnail"
            rules={[{ required: true, message: "필수 입력값입니다." }]}
          >
            <Input
              value={modifyValues.productThumbnail}
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
              <img
                src={modifyValues.productThumbnail}
                alt="썸네일 이미지"
                className="w-full h-full rounded-lg"
              />
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
                value={modifyValues.productName}
                onChange={(e) =>
                  setModifyValues((prev) => ({
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
                value={modifyValues.productSummary}
                onChange={(e) =>
                  setModifyValues((prev) => ({
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
                value={modifyValues.productPrice}
                onChange={(e) =>
                  setModifyValues((prev) => ({ ...prev, productPrice: e }))
                }
                style={{ width: 167 }}
              />
            </Form.Item>
            <Form.Item
              name="productDescriptionImage"
              label="상세설명"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <div>
                <Input
                  value={modifyValues.productDescriptionImage}
                  style={{ display: "none" }}
                />
                <input
                  ref={descriptionInputRef}
                  type="file"
                  accept="image/*"
                  className="w-full h-full"
                  style={{ display: "none" }}
                  onChange={(e) => handleImage(e, "description")}
                />
                <Button onClick={handleDescriptionImage}>수정</Button>
              </div>
            </Form.Item>
          </div>
        </div>
        {modifyValues.productDescriptionImage === "" ? (
          ""
        ) : (
          <div>
            <div className="border-t-[1px] border-grayscale3"></div>
            <div className="h-[200px] overflow-auto">
              <img
                src={modifyValues.productDescriptionImage}
                alt="상품 상세 이미지"
              />
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2 justify-end mt-5">
          <Button onClick={handleResetValues}>취소</Button>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
