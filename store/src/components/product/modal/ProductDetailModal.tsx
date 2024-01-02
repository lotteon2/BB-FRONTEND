import { Input, Rate, Select, Space, Tag } from "antd";
import { Form } from "antd";
import { categoryOptions, tagOptions } from "../../../recoil/common/options";
import { flowersDetail } from "../../../recoil/common/interfaces";
import { useQuery } from "react-query";
import { getProductDetailInfo } from "../../../apis/product";
import Loading from "../../common/Loading";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../../recoil/atom/common";

interface param {
  productId: string | undefined;
  isChange: boolean;
}

export default function ProductDetailModal(param: param) {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetailInfo", param],
    queryFn: () => getProductDetailInfo(param.productId, storeId),
  });

  if (!data || isLoading) return <Loading />;

  return (
    <div>
      <div className="w-full h-[600px] overflow-scroll text-lg">
        <div className="flex flex-row gap-5">
          <div className="w-2/5 h-[200px]">
            <img src={data.data.productThumbnail} alt="" />
          </div>
          <div className="w-3/5 flex flex-col gap-3">
            <p>{data.data.productName}</p>
            <div className="w-full h-[100px] border-2 border-grayscale3 rounded-lg p-1 overflow-auto text-[0.9rem]">
              {data.data.productSummary}
            </div>
            <p className="font-bold text-[1.5rem] text-primary1">
              {data.data.productPrice.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 mt-3">
          <p>총 판매량: {data.data.productSaleAmount.toLocaleString()}개</p>
          <div>
            평균 평점:{" "}
            <Rate allowHalf defaultValue={data.data.averageRating} disabled />
            <span className="ml-2 text-sm text-grayscale4">
              ({data.data.averageRating})
            </span>
          </div>
        </div>
        <Tag
          bordered={false}
          color={
            data.data.productSaleStatus === "DISCONTINUED" ? "red" : "purple"
          }
        >
          {data.data.productSaleStatus === "DISCONTINUED"
            ? "판매 중지"
            : "판매중"}
        </Tag>
        <div className="mt-5">
          <Form.Item
            label="카테고리"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              disabled
              style={{ width: 350 }}
              defaultValue={data.data.category.categoryId}
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item
            label="태그"
            rules={[
              {
                required: false,
              },
            ]}
            className="ml-6"
          >
            <Select
              disabled
              mode="multiple"
              style={{ width: 350 }}
              defaultValue={data.data.tag}
              options={tagOptions}
            />
          </Form.Item>
          <Form.Item
            label="대표꽃"
            rules={[
              {
                required: false,
              },
            ]}
            className="ml-3"
          >
            <Space className="flex flex-row gap-5">
              <Input
                defaultValue={data.data.representativeFlower.flowerName}
                disabled
              />
              <Input
                defaultValue={data.data.representativeFlower.flowerCount}
                style={{ width: 135 }}
                disabled
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="구성꽃"
            rules={[
              {
                required: false,
              },
            ]}
            className="ml-3"
          >
            <div className="flex flex-col gap-5">
              {data.data.flowers.map((item: flowersDetail) => (
                <Space className="flex flex-row gap-5" key={item.flowerId}>
                  <Input defaultValue={item.flowerName} disabled />
                  <Input
                    defaultValue={item.flowerCount}
                    style={{ width: 135 }}
                    disabled
                  />
                </Space>
              ))}
            </div>
          </Form.Item>
          <p className="text-lg font-bold mt-[1px]">상품 상세 설명</p>
          <div className="w-full h-full">
            <img src={data.data.productDescriptionImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
