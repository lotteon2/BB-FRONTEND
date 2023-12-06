import { useState } from "react";
import { useParams } from "react-router";
import StoreInfo from "../components/store/StoreInfo";
import ProductList from "../components/product/ProductList";

export default function StoreDetailPage() {
  const param = Number(useParams().storeId);
  const [categoryId, setCategoryId] = useState<number>(1);

  return (
    <div className="w-full h-full">
      <StoreInfo storeId={param} />
      <div className="border-[1px] border-grayscale3 my-4"></div>
      <div>
        <div className="mx-auto w-28 text-center text-3xl font-bold border-b-4 border-primary7">
          꽃선물
        </div>
        <div className="flex flex-row gap-3 justify-center my-4">
          <button
            className={`w-20 h-6 rounded-lg font-light ${
              categoryId === 1 ? "bg-primary7 text-grayscale1" : "bg-grayscale3"
            }`}
            onClick={() => setCategoryId(1)}
          >
            꽃다발
          </button>
          <button
            className={`w-20 h-6 rounded-lg font-light ${
              categoryId === 2 ? "bg-primary7 text-grayscale1" : "bg-grayscale3"
            }`}
            onClick={() => setCategoryId(2)}
          >
            꽃바구니
          </button>
          <button
            className={`w-20 h-6 rounded-lg font-light ${
              categoryId === 3 ? "bg-primary7 text-grayscale1" : "bg-grayscale3"
            }`}
            onClick={() => setCategoryId(3)}
          >
            꽃상자
          </button>
          <button
            className={`w-20 h-6 rounded-lg font-light ${
              categoryId === 4 ? "bg-primary7 text-grayscale1" : "bg-grayscale3"
            }`}
            onClick={() => setCategoryId(4)}
          >
            화분
          </button>
          <button
            className={`w-20 h-6  rounded-lg font-light ${
              categoryId === 5 ? "bg-primary7 text-grayscale1" : "bg-grayscale3"
            }`}
            onClick={() => setCategoryId(5)}
          >
            화환
          </button>
        </div>
      </div>
      <ProductList categoryId={categoryId} storeId={param} />
    </div>
  );
}
