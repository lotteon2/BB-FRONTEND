import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { storeInfoDto } from "../../../recoil/common/interfaces";
import { PictureFilled } from "@ant-design/icons";
import { useMutation } from "react-query";
import { getImageUrl } from "../../../apis/image";
import { FailToast } from "../../common/toast/FailToast";
import DaumPostcodeEmbed from "react-daum-postcode";
import { bankOptions } from "../../../recoil/common/options";
import { registerStore } from "../../../apis/store";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { useSetRecoilState } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";

interface param {
  isModalOpen: boolean;
  handleCancel: () => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const { TextArea } = Input;

export default function StoreRegisterModal(param: param) {
  const setStoreId = useSetRecoilState<number>(storeIdState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [registerValues, setRegisterValues] = useState<storeInfoDto>({
    storeName: "",
    detailInfo: "",
    storeThumbnailImage:
      "https://f-mans.com/data/goods/1/2023/10/681_temp_16972473985275list1.jpg",
    phoneNumber: "",
    accountNumber: "",
    bank: "국민은행",
    minOrderPrice: null,
    deliveryPrice: null,
    freeDeliveryMinPrice: null,
    sido: "",
    gugun: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    lat: 0,
    lon: 0,
  });

  const handleResetValues = () => {
    setRegisterValues({
      storeName: "",
      detailInfo: "",
      storeThumbnailImage: "",
      phoneNumber: "",
      accountNumber: "",
      bank: "",
      minOrderPrice: null,
      deliveryPrice: null,
      freeDeliveryMinPrice: null,
      sido: "",
      gugun: "",
      address: "",
      detailAddress: "",
      zipCode: "",
      lat: 0,
      lon: 0,
    });

    param.handleCancel();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files !== null) {
      formData.append("image", e.target.files[0]);
      thumbnailMutation.mutate(formData);
    }
  };

  const handleComplete = (data: any) => {
    var roadAddr = data.roadAddress; // 도로명 주소 변수
    var extraRoadAddr = ""; // 참고 항목 변수

    var geocoder = new window.kakao.maps.services.Geocoder();

    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    // 건물명이 있고, 공동주택일 경우 추가한다.
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }
    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    if (extraRoadAddr !== "") {
      extraRoadAddr = " (" + extraRoadAddr + ")";
    }

    // 위도경도 구하기
    geocoder.addressSearch(data.address, function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        var lat = new window.kakao.maps.LatLng(result[0].y);
        var lon = new window.kakao.maps.LatLng(result[0].x);

        setRegisterValues((prev) => ({
          ...prev,
          zipCode: data.zonecode,
          address: roadAddr,
          sido: data.sido,
          gugun: data.sigungu.split(" ")[0],
          lat: lat.Ma,
          lon: lon.Ma,
        }));
      }
    });

    setIsAddressModalOpen(false);
  };

  const handleRegister = () => {
    if (
      registerValues.storeName !== "" &&
      registerValues.zipCode !== "" &&
      registerValues.address !== "" &&
      registerValues.detailInfo !== "" &&
      registerValues.phoneNumber !== "" &&
      registerValues.accountNumber !== "" &&
      registerValues.minOrderPrice !== null &&
      registerValues.deliveryPrice !== null &&
      registerValues.freeDeliveryMinPrice !== null
    ) {
      registerMutation.mutate();
    }
  };

  const thumbnailMutation = useMutation(
    ["imageUpload"],
    (image: FormData) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setRegisterValues((prev) => ({ ...prev, storeThumbnailImage: data }));
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const registerMutation = useMutation(
    ["registerStore"],
    () => registerStore(registerValues),
    {
      onSuccess: (data) => {
        setStoreId(data);
        SuccessToast("가게 정보가 등록되었습니다.");
        param.handleCancel();
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
    <div>
      <Modal
        title="가게 정보 등록"
        open={param.isModalOpen}
        onCancel={param.handleCancel}
        footer={[]}
        maskClosable={false}
      >
        <Form
          form={form}
          name="storeRegisterform"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoCapitalize="off"
          initialValues={registerValues}
          onFinish={handleRegister}
        >
          <div className="flex flex-row gap-3">
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
                onChange={handleImage}
              />
              {registerValues.storeThumbnailImage === "" ? (
                <div className="text-center">
                  <PictureFilled style={{ fontSize: 150 }} />
                  <p className="text-[1rem]">썸네일 이미지 등록</p>
                </div>
              ) : (
                <img
                  src={registerValues.storeThumbnailImage}
                  alt="썸네일 이미지"
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
            <div className="w-[250px]">
              <Form.Item
                name="storeName"
                label="가게명"
                rules={[{ required: true, message: "필수 입력값입니다." }]}
                style={{ marginLeft: -33 }}
              >
                <Input
                  placeholder="가게 이름"
                  value={registerValues.storeName}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      storeName: e.target.value,
                    }))
                  }
                />
              </Form.Item>
              <div className="flex flex row gap-2">
                <Form.Item
                  name="zipCode"
                  label="주소"
                  rules={[{ required: true, message: "필수 입력값입니다." }]}
                >
                  <Input
                    placeholder="우편번호"
                    value={registerValues.zipCode}
                    disabled
                  />
                </Form.Item>
                <Button onClick={() => setIsAddressModalOpen(true)}>
                  검색
                </Button>
              </div>
              <Form.Item
                name="address"
                rules={[{ required: true, message: "필수 입력값입니다." }]}
                style={{ marginLeft: 60, width: 285 }}
              >
                <Input
                  placeholder="주소"
                  value={registerValues.address}
                  disabled
                />
              </Form.Item>
              <Form.Item name="detailAddress">
                <Input
                  placeholder="상세주소"
                  value={registerValues.detailAddress}
                  style={{ marginLeft: 60, width: 190 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="h-[300px] overflow-auto ml-[-30px]">
            <Form.Item
              name="detailInfo"
              label="상세 설명"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <TextArea
                placeholder="상세 설명"
                autoSize={{ minRows: 3, maxRows: 5 }}
                onChange={(e) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    detailInfo: e.target.value,
                  }))
                }
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="가게 연락처"
              rules={[
                {
                  required: true,
                  message: "필수 입력값입니다.",
                },
              ]}
            >
              <Input
                onChange={(e) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="연락처"
              />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="대표 계좌"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <div className="flex flex-row gap-2">
                <Select
                  options={bankOptions}
                  value={registerValues.bank}
                  style={{ width: 170 }}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({ ...prev, bank: e }))
                  }
                />
                <Input
                  placeholder="계좌번호"
                  value={registerValues.accountNumber}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      accountNumber: e.target.value,
                    }))
                  }
                />
              </div>
            </Form.Item>
            <Form.Item
              name="minOrderPrice"
              label="최소 주문금액"
              rules={[
                {
                  required: true,
                  message: "필수 입력값입니다.",
                },
              ]}
            >
              <InputNumber
                placeholder="최소 주문금액"
                value={registerValues.minOrderPrice}
                onChange={(e) =>
                  setRegisterValues((prev) => ({ ...prev, minOrderPrice: e }))
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="deliveryPrice"
              label="기본 배송금액"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <InputNumber
                placeholder="기본 배송금액"
                value={registerValues.deliveryPrice}
                onChange={(e) =>
                  setRegisterValues((prev) => ({ ...prev, deliveryPrice: e }))
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="freedeliveryMinPrice"
              label="무료배송 최소금액"
              rules={[{ required: true, message: "필수 입력값입니다." }]}
            >
              <InputNumber
                placeholder="무료배송 최소금액"
                value={registerValues.freeDeliveryMinPrice}
                onChange={(e) =>
                  setRegisterValues((prev) => ({
                    ...prev,
                    freeDeliveryMinPrice: e,
                  }))
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <div className="flex flex-row gap-2 justify-end mt-5">
            <Button onClick={handleResetValues}>취소</Button>
            <Button type="primary" htmlType="submit">
              등록
            </Button>
          </div>
        </Form>
      </Modal>
      {isAddressModalOpen && (
        <Modal
          title="주소 검색"
          open={isAddressModalOpen}
          onOk={() => setIsAddressModalOpen(false)}
          onCancel={() => setIsAddressModalOpen(false)}
          footer={[]}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  );
}
