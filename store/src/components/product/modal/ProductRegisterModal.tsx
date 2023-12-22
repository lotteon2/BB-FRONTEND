import { useState, useRef, useCallback, useEffect } from "react";
import { MinusCircleOutlined, PictureFilled } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";
import { getImageUrl } from "../../../apis/image";
import { FailToast } from "../../common/toast/FailToast";
import { SuccessToast } from "../../common/toast/SuccessToast";
import { registerProduct } from "../../../apis/product";
import {
  categoryOptions,
  flowerOptions,
  tagOptions,
} from "../../../recoil/common/options";
import { productRegisterDto } from "../../../recoil/common/interfaces";

interface param {
  handleCancel: () => void;
  isModalOpen: boolean;
  handleChange: () => void;
}
export default function ProductRegisterModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [extraFlowers, setExtraFlowers] = useState<number[]>([]);
  const [extraFlowersCnt, setExtraFlowersCnt] = useState<number[]>([]);
  const [representativeFlower, setRepresentativeFlower] = useState<
    number | undefined
  >();
  const [representativeFlowerCnt, setRepresentativeFlowerCnt] = useState<
    number | null
  >(null);
  const [defaultValues, setDefaultValues] = useState<productRegisterDto>({
    productName: "",
    productSummary: "",
    productDescriptionImage:
      "https://f-mans.com//data/products/wreath/WB00111/1.jpg",
    productThumbnail: "https://f-mans.com//data/products/wreath/WB00111/2.jpg",
    productPrice: null,
    categoryId: undefined,
    productTag: [],
    representativeFlower: {
      flowerId: undefined,
      flowerCount: null,
    },
    flowers: [],
  });

  const handleOk = () => {
    const flowers = [];
    for (let index = 0; index < extraFlowers.length; index++) {
      flowers.push({
        flowerId: extraFlowers[index],
        flowerCount: extraFlowersCnt[index],
      });
    }

    const productInfo = {
      productName: defaultValues.productName,
      productSummary: defaultValues.productSummary,
      productDescriptionImage: defaultValues.productDescriptionImage,
      productThumbnail: defaultValues.productThumbnail,
      productPrice: defaultValues.productPrice,
      categoryId: defaultValues.categoryId,
      productTag: defaultValues.productTag,
      representativeFlower: {
        flowerId: representativeFlower,
        flowerCount: representativeFlowerCnt,
      },
      flowers: flowers,
    };

    registerMutation.mutate(productInfo);
  };

  // 이미지 처리
  const handleChangeFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    state: boolean
  ) => {
    if (event.target.files !== null) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      state
        ? imageMutation.mutate(formData)
        : descriptionImageMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    const values = {
      productName: "",
      productSummary: "",
      productDescriptionImage:
        "https://f-mans.com//data/products/flower/basket/FB00180/2.jpg",
      productThumbnail:
        "https://f-mans.com//data/products/flower/basket/FB00180/1.jpg",
      productPrice: null,
      categoryId: undefined,
      productTag: [],
      representativeFlower: {
        flowerId: undefined,
        flowerCount: null,
      },
      flowers: [],
    };
    setDefaultValues(values);
    param.handleCancel();
  };

  const handleExtraFlowers = (name: number, value: number) => {
    var flowers = extraFlowers;
    if (name > flowers.length) {
      flowers.push(value);
    } else {
      flowers[name] = value;
    }
    setExtraFlowers(flowers);
  };

  const handleExtraFlowersCnt = (name: number, e: any) => {
    var flowersCnt = extraFlowersCnt;
    if (name > flowersCnt.length) {
      flowersCnt.push(e);
    } else {
      flowersCnt[name] = e;
    }
    setExtraFlowersCnt(flowersCnt);
  };

  const handleRemoveExtraFlowers = (name: number) => {
    var flowers = extraFlowers;
    var flowersCnt = extraFlowersCnt;
    flowers.splice(name, 1);
    flowersCnt.splice(name, 1);
  };

  // 이미지 등록 API 처리
  const imageMutation = useMutation(
    ["imageUpload"],
    (image: any) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setDefaultValues((prev) => ({ ...prev, productThumbnail: data }));
      },
      onError: () => {
        FailToast("이미지 업로드 실패");
      },
    }
  );

  // 이미지 등록 API 처리
  const descriptionImageMutation = useMutation(
    ["descriptionImageUpload"],
    (image: any) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setDefaultValues((prev) => ({
          ...prev,
          productDescriptionImage: data,
        }));
      },
      onError: () => {
        FailToast("이미지 업로드 실패");
      },
    }
  );

  const registerMutation = useMutation(
    ["registerProductInfo"],
    (productInfo: productRegisterDto) => registerProduct(storeId, productInfo),
    {
      onSuccess: () => {
        SuccessToast("등록되었습니다.");
        param.handleChange();
        handleCancel();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const uploadImgBtn = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  return (
    <Modal
      title="상품 정보 등록"
      open={param.isModalOpen}
      onCancel={handleCancel}
      footer={[]}
      maskClosable={false}
    >
      <div className="w-full h-full">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, width: "100%" }}
          autoComplete="off"
          form={form}
          initialValues={defaultValues}
        >
          <div>
            <div className="flex flex-row">
              <div
                className="h-[200px] w-[220px] cursor-pointer"
                onClick={uploadImgBtn}
              >
                <input
                  className="w-full h-full"
                  type="file"
                  name="imgFile"
                  accept="image/*"
                  ref={inputRef}
                  id="imgFile"
                  onChange={(e) => {
                    handleChangeFile(e, true);
                  }}
                  style={{ display: "none" }}
                />
                {defaultValues.productThumbnail === "" ? (
                  <div>
                    <PictureFilled
                      style={{
                        fontSize: "100px",
                        marginLeft: "22px",
                        marginTop: "30px",
                      }}
                    />
                    <p className="text-center">썸네일 이미지 등록</p>
                  </div>
                ) : (
                  <img src={defaultValues.productThumbnail} alt="상품 썸네일" />
                )}
              </div>

              <div className="w-full">
                <Form.Item
                  name="productName"
                  label="상품명"
                  rules={[
                    { required: true, message: "상품 이름을 입력해주세요" },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        productName: e.target.value,
                      }))
                    }
                    className="w-[200px]"
                    placeholder="상품명"
                  />
                </Form.Item>
                <Form.Item
                  name="productSummary"
                  label="상품 요약정보"
                  rules={[
                    { required: true, message: "요약 정보를 입력해주세요" },
                  ]}
                >
                  <TextArea
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        productSummary: e.target.value,
                      }))
                    }
                    className="w-[200px]"
                    autoSize={{ minRows: 2, maxRows: 2 }}
                    placeholder="상품 요약정보"
                  />
                </Form.Item>
                <Form.Item
                  name="productPrice"
                  label="상품 가격"
                  rules={[
                    { required: true, message: "상품 가격을 설정해주세요" },
                  ]}
                >
                  <InputNumber
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        productPrice: Number(e),
                      }))
                    }
                    className="w-[200px]"
                    placeholder="상품가격"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-full h-[300px] overflow-scroll">
              <div className="ml-[-120px]">
                <Form.Item
                  name="category"
                  label="카테고리"
                  rules={[
                    { required: true, message: "카테고리를 설정해주세요" },
                  ]}
                >
                  <Select
                    showSearch
                    onChange={(e) =>
                      setDefaultValues((prev) => ({ ...prev, categoryId: e }))
                    }
                    style={{ width: 348 }}
                    placeholder="카테고리"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={categoryOptions}
                  />
                </Form.Item>
                <Form.Item name="tag" label="태그">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "348px" }}
                    placeholder="태그 선택"
                    onChange={(value: number[]) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        productTag: value,
                      }))
                    }
                    options={tagOptions}
                  />
                </Form.Item>
                <Form.Item
                  name="representativeFlower"
                  label="대표꽃"
                  rules={[
                    {
                      required: true,
                      message: "대표꽃과 수량 정보를 설정해주세요",
                    },
                  ]}
                >
                  <Space className="flex flex-row">
                    <Select
                      showSearch
                      onChange={(value: number) =>
                        setRepresentativeFlower(value)
                      }
                      style={{ width: 240 }}
                      placeholder="대표꽃"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      options={flowerOptions}
                    />
                    <InputNumber
                      value={representativeFlowerCnt}
                      onChange={(e) => setRepresentativeFlowerCnt(e)}
                      className="w-[100px]"
                      placeholder="수량"
                    />
                  </Space>
                </Form.Item>
                <Form.Item name="extraFlowers" label="구성꽃">
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: -5 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "first"]}
                              rules={[
                                {
                                  required: true,
                                  message: "꽃 종류를 선택해주세요",
                                },
                              ]}
                            >
                              <Select
                                showSearch
                                onChange={(value: number) => {
                                  handleExtraFlowers(name, value);
                                }}
                                style={{ width: 240 }}
                                placeholder="구성꽃"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  (option?.label ?? "").includes(input)
                                }
                                options={flowerOptions}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "last"]}
                              rules={[
                                {
                                  required: true,
                                  message: "수량을 입력해주세요",
                                },
                              ]}
                            >
                              <InputNumber
                                placeholder="수량"
                                className="w-[100px]"
                                onChange={(e) => {
                                  handleExtraFlowersCnt(name, e);
                                }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => {
                                handleRemoveExtraFlowers(name);
                                remove(name);
                              }}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button onClick={() => add()}>추가</Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
                <Form.Item
                  name="productDescriptionImage"
                  label="상세정보"
                  rules={[
                    { required: true, message: "상세 정보를 업로드해주세요" },
                  ]}
                >
                  <div>
                    <input
                      type="text"
                      value={defaultValues.productDescriptionImage}
                      className="hidden"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleChangeFile(e, false);
                      }}
                    />
                  </div>
                </Form.Item>
              </div>
              {defaultValues.productDescriptionImage === "" ? (
                ""
              ) : (
                <div>
                  <p>상세정보 미리보기</p>
                  <div className="w-full">
                    <img
                      src={defaultValues.productDescriptionImage}
                      alt="상품 상세정보"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <Space className="flex flex-row mt-5 justify-end ">
            <Button key="back" onClick={handleCancel}>
              취소
            </Button>

            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={handleOk}
            >
              저장
            </Button>
          </Space>
        </Form>
      </div>
    </Modal>
  );
}
