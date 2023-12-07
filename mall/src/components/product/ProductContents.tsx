import { useState } from "react";
import ProductDescription from "./detail/ProductDescription";
import ProductReview from "./detail/ProductReview";
import ProductQuestion from "./detail/ProductQuestion";

interface param {
  productId: string | undefined;
  productDescription: string;
  productName: string;
  storeId: number;
}
export default function ProductContents(param: param) {
  const [contenntIndex, setContentIndex] = useState<number>(0);

  return (
    <div className="w-full h-full mt-10">
      <div className="w-full sticky top-0 bg-grayscale1 border-b-[1px] relative z-20">
        <div className="flex flex-row justify-center">
          <a
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 corsor-pointer ${
              contenntIndex === 0 ? "border-primary4" : ""
            }`}
            onClick={() => setContentIndex(0)}
            href="#detail"
          >
            상세설명
          </a>
          <a
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 corsor-pointer ${
              contenntIndex === 1 ? "border-primary4" : ""
            }`}
            onClick={() => setContentIndex(1)}
            href="#review"
          >
            상품후기
          </a>
          <a
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 corsor-pointer ${
              contenntIndex === 2 ? "border-primary4" : ""
            }`}
            onClick={() => setContentIndex(2)}
            href="#question"
          >
            상품문의
          </a>
        </div>
      </div>

      <div className="w-[70%] py-20 mx-auto max-[600px]:w-[100vw]" id="detail">
        <ProductDescription productDescription={param.productDescription} />
      </div>
      <div className="border-b-[1px]"></div>
      <div className="w-[80%] py-20 mx-auto max-[600px]:w-[100vw]" id="review">
        <ProductReview productId={param.productId} />
      </div>
      <div className="border-b-[1px]"></div>
      <div
        className="w-[80%] py-20 mx-auto max-[600px]:w-[100vw]"
        id="question"
      >
        <ProductQuestion
          productId={param.productId}
          productName={param.productName}
          storeId={param.storeId}
        />
      </div>
    </div>
  );
}
