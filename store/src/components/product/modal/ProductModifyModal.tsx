import { useState, useRef, useCallback, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery } from "react-query";
import {
  flowersDetail,
  productModifyInfoDto,
} from "../../../recoil/common/interfaces";
import { getImageUrl } from "../../../apis/image";
import { FailToast } from "../../common/toast/FailToast";
import { SuccessToast } from "../../common/toast/SuccessToast";
import {
  categoryOptions,
  flowerOptions,
  saleStatusOptions,
  tagOptions,
} from "../../../recoil/common/options";
import { getProductDetailInfo, modifyProduct } from "../../../apis/product";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";
import Loading from "../../common/Loading";

interface param {
  handleCancel: () => void;
  productId: string | undefined;
  handleChange: () => void;
}
export default function ProductModifyModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productSaleStatus, setProductSaleStatus] = useState<string>("");
  const [productThumbnail, setProductThumbnail] = useState<string>("");
  const [productSummary, setProductSummary] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [category, setCategory] = useState<number>(0);
  const [tag, setTag] = useState<number[]>([]);
  const [representativeFlower, setRepresentativeFlower] = useState<number>(0);
  const [representativeFlowerCnt, setRepresentativeFlowerCnt] = useState<
    number | null
  >(null);
  const [extraFlowers, setExtraFlowers] = useState<flowersDetail[]>([]);
  const [productDescriptionImage, setProductDescriptionImage] =
    useState<string>("");
  const [defaultValues, setDefaultValues] = useState<productModifyInfoDto>();

  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetailInfo", param],
    queryFn: () => getProductDetailInfo(param.productId, storeId),
  });

  const handleOk = () => {
    const productInfo = {
      productName: productName,
      productSummary: productSummary,
      productDescriptionImage: productDescriptionImage,
      productThumbnail: productThumbnail,
      productPrice: productPrice,
      productSaleStatus: productSaleStatus,
      category: category,
      productTag: tag,
      representativeFlower: {
        flowerId: representativeFlower,
        flowerCount: representativeFlowerCnt,
      },
      flowers: extraFlowers,
    };

    modifyMutation.mutate(productInfo);
  };
  const uploadImgBtn = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const uploadDescriptionImgBtn = useCallback(() => {
    descriptionInputRef.current?.click();
  }, []);

  // 이미지 처리
  const handleChangeFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (event.target.files !== null) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      if (type === "thumbnail") imageMutation.mutate(formData);
      else descriptionImageMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    setDefaultValues(data);
    param.handleCancel();
  };

  // 이미지 등록 API 처리
  const imageMutation = useMutation(
    ["imageUpload"],
    (image: any) => getImageUrl(image),
    {
      onSuccess: (data) => {
        setProductThumbnail(data);
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
        setProductDescriptionImage(data);
      },
      onError: () => {
        FailToast("이미지 업로드 실패");
      },
    }
  );

  const modifyMutation = useMutation(
    ["modifyProductInfo"],
    (productInfo: productModifyInfoDto) =>
      modifyProduct(param.productId, productInfo),
    {
      onSuccess: () => {
        SuccessToast("수정되었습니다.");
        param.handleChange();
        handleCancel();
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    if (data) {
      const tmpTag: number[] = [];
      data.data.tag.forEach((e: { key: number; tagName: string }) => {
        tmpTag.push(e.key);
      });

      setDefaultValues(data.data);
      setProductName(data.data.productName);
      setProductThumbnail(data.data.productThumbnail);
      setProductSummary(data.data.productSummary);
      setProductPrice(data.data.productPrice);
      setCategory(data.data.category.categoryId);
      setTag(tmpTag);
      setRepresentativeFlower(data.data.representativeFlower.flowerId);
      setRepresentativeFlowerCnt(data.data.representativeFlower.flowerCount);
      setExtraFlowers(data.data.flowers);
      setProductDescriptionImage(data.data.productDescriptionImage);
      setProductSaleStatus(data.data.productSaleStatus);

      setDefaultValues({
        productName: data.data.productName,
        productSummary: data.data.productSummary,
        productDescriptionImage: data.data.productDescriptionImage,
        productThumbnail: data.data.productThumbnail,
        productPrice: data.data.productPrice,
        productSaleStatus: data.data.productSaleStatus,
        category: data.data.category.categoryId,
        productTag: tmpTag,
        representativeFlower: data.data.representativeFlower,
        flowers: data.data.flowers,
      });
    }
  }, [data]);

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-full h-full">
      <Form
        name="productModifyForm"
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
                onChange={(e) => handleChangeFile(e, "thumbnail")}
                style={{ display: "none" }}
              />

              <img src={data.data.productThumbnail} alt="상품 썸네일" />
            </div>

            <div className="w-[95%] ml-3">
              <Form.Item
                name="productName"
                label="상품명"
                rules={[
                  { required: true, message: "상품 이름을 입력해주세요" },
                ]}
              >
                <Input
                  onChange={(e) => setProductName(e.target.value)}
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
                  onChange={(e) => setProductSummary(e.target.value)}
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
                  onChange={(e) => setProductPrice(Number(e))}
                  className="w-[200px]"
                  placeholder="상품가격"
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-full h-[300px] overflow-scroll">
            <div className="ml-[-120px]">
              <Form.Item
                name="productSaleStatus"
                label="판매상태"
                rules={[{ required: true, message: "" }]}
              >
                <Select
                  onChange={(value: string) => setProductSaleStatus(value)}
                  style={{ width: 348 }}
                  placeholder="판매상태"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={saleStatusOptions}
                />
              </Form.Item>
              <Form.Item
                name="category"
                label="카테고리"
                rules={[{ required: true, message: "카테고리를 설정해주세요" }]}
              >
                <Select
                  disabled
                  showSearch
                  onChange={(value: number) => setCategory(value)}
                  style={{ width: 348 }}
                  placeholder="카테고리"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={categoryOptions}
                />
              </Form.Item>
              <Form.Item name="productTag" label="태그">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "348px" }}
                  placeholder="태그 선택"
                  onChange={(value: number[]) => setTag(value)}
                  options={tagOptions}
                />
              </Form.Item>
              <div>
                <Space className="flex flex-col ml-[86px]">
                  <div id="extraFlowers" className="flex flex-row gap-3">
                    <span className="text-[#ff4d4f] mt-1 mr-[-5px]">*</span>
                    <label htmlFor="extraFlowers" title="대표꽃">
                      대표꽃 :
                    </label>
                    <div className="flex flex-col gap-3 ml-[-4px]">
                      <Select
                        onChange={(e) => setRepresentativeFlower(e)}
                        disabled
                        defaultValue={data.data.representativeFlower.flowerId}
                        showSearch
                        style={{ width: 240 }}
                        placeholder="대표꽃"
                        options={flowerOptions}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <InputNumber
                        onChange={(e) => setRepresentativeFlowerCnt(e)}
                        defaultValue={
                          data.data.representativeFlower.flowerCount
                        }
                        disabled
                        placeholder="수량"
                        className="w-[100px]"
                      />
                    </div>
                  </div>
                </Space>
              </div>
              <div>
                {data.data.flowers.length === 0 ? (
                  ""
                ) : (
                  <Space className="flex flex-col ml-[100px] mt-5">
                    <div id="extraFlowers" className="flex flex-row gap-3">
                      <label htmlFor="extraFlowers" title="구성꽃">
                        구성꽃 :
                      </label>
                      <div className="flex flex-col gap-3 ml-[-4px]">
                        {data.data.flowers.map(
                          (item: flowersDetail, index: number) => (
                            <div key={index}>
                              <Select
                                disabled
                                defaultValue={item.flowerId}
                                showSearch
                                style={{ width: 240 }}
                                placeholder="구성꽃"
                                options={flowerOptions}
                              />
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        {data.data.flowers.map(
                          (item: flowersDetail, index: number) => (
                            <div className="flex flex-row gap-3" key={index}>
                              <InputNumber
                                disabled
                                defaultValue={item.flowerCount}
                                placeholder="수량"
                                className="w-[100px]"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Space>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-row gap-3 my-2">
                <p className="text-lg font-bold mt-[1px]">상세정보</p>
                <div>
                  <input
                    className="w-full h-full"
                    type="file"
                    name="imgFile"
                    accept="image/*"
                    ref={descriptionInputRef}
                    id="imgFile"
                    onChange={(e) => handleChangeFile(e, "description")}
                    style={{ display: "none" }}
                  />
                  <Button onClick={uploadDescriptionImgBtn}>변경</Button>
                </div>
              </div>
              <div className="w-full">
                <img
                  src={data.data.productDescriptionImage}
                  alt="상품 상세정보"
                />
              </div>
            </div>
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
  );
}
