import { useState, useRef } from "react";
import { Button, Select, Tour, TourProps } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import {
  categoryOptions,
  flowerOptions,
  saleStatusOptions,
} from "../recoil/common/options";
import ProductRegisterModal from "../components/product/modal/ProductRegisterModal";
import ProductTable from "../components/product/ProductTable";

export default function ProductPage() {
  //   const storeId = useRecoilValue<number>(storeIdState);
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<number | undefined>();
  const [flower, setFlower] = useState<number | undefined>();
  const [saleState, setSaleState] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  const steps: TourProps["steps"] = [
    {
      title: "상품 목록",
      description:
        "현재 가게에 등록된 상품들을 확인할 수 있습니다. 테이블 클릭 시 클릭한 상품의 상세 정보를 확인할 수 있으며, '수정' 버튼 클릭 시 등록된 상품의 정보를 수정할 수 있습니다.",
      placement: "center",
      target: () => ref1.current,
    },
    {
      title: "조회 옵션",
      description:
        "카테고리/대표꽃/판매상태 별 상품 정보들을 조회할 수 있습니다. 다중 선택 시 여러 옵션들이 공통으로 적용된 상품들을 조회할 수 있습니다.",
      placement: "bottom",
      target: () => ref2.current,
    },
    {
      title: "상품 등록",
      description:
        "'상품 등록' 버튼을 통해 가게에서 판매할 상품을 등록할 수 있습니다. 상품 정보들을 꼼꼼히 작성하는 것은 구매자들에게 큰 도움이 되며, 좀 더 정확한 재고 정보들을 확인할 수 있습니다.",
      placement: "left",
      target: () => ref3.current,
    },
  ];

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 flex flex-col gap-2 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg p-3 relative">
        <span className="text-xl font-bold">상품 관리</span>
        <div className="flex flex-row gap-2 absolute top-3 right-3">
          <div className="flex flex-row gap-2" ref={ref2}>
            <Select
              placeholder="카테고리"
              style={{ width: 150 }}
              allowClear
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e)}
            />
            <Select
              placeholder="대표꽃"
              style={{ width: 150 }}
              showSearch
              allowClear
              options={flowerOptions}
              value={flower}
              onChange={(e) => setFlower(e)}
            />
            <Select
              placeholder="판매상태"
              style={{ width: 150 }}
              allowClear
              options={saleStatusOptions}
              value={saleState}
              onChange={(e) => setSaleState(e)}
            />
          </div>
          <div ref={ref3}>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              상품 등록
            </Button>
          </div>
        </div>
        <div ref={ref1}>
          <ProductTable
            category={category}
            representativeFlower={flower}
            saleState={saleState}
            isChange={isChange}
            handleChange={handleChange}
          />
        </div>
      </div>

      <button
        className="absolute bottom-1 right-1"
        onClick={() => setOpen(true)}
      >
        <QuestionCircleFilled style={{ fontSize: 20 }} />
      </button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      {isModalOpen ? (
        <ProductRegisterModal
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}
