import { useState } from "react";

interface param {
  productDescription: string;
}
export default function ProductContents(param: param) {
  const [contenntIndex, setContentIndex] = useState<number>(0);

  return (
    <div className="w-full h-full mt-10">
      <div className="w-full sticky top-0 bg-grayscale1 border-b-[1px]">
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

      <div className="w-[70%] py-10 mx-auto max-[500px]:w-[100vw]" id="detail">
        <img src={param.productDescription} alt="상품 상세 설명" />
      </div>
      <div className="w-full h-[500px] py-20" id="review">
        상품 후기
      </div>
      <div className="w-full h-[500px] py-20" id="question">
        상품 문의
      </div>
    </div>
  );
}
