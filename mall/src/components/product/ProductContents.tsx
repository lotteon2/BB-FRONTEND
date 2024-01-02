import { useEffect, useRef, useState } from "react";
import ProductDescription from "./detail/ProductDescription";
import ProductReview from "./detail/ProductReview";
import ProductQuestion from "./detail/ProductQuestion";
import { Link } from "react-scroll/modules";

interface param {
  productId: string | undefined;
  productDescription: string;
  productName: string;
  storeId: number;
}
export default function ProductContents(param: param) {
  const [contenntIndex, setContentIndex] = useState<number>(0);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);

  const yScrollEvent = () => {
    const detailPosition = detailRef.current?.getBoundingClientRect().y;
    const reviewPosition = reviewRef.current?.getBoundingClientRect().y;
    const questionPosition = questionRef.current?.getBoundingClientRect().y;

    if (
      Number(questionPosition) < 1 &&
      Number(reviewPosition) < 1 &&
      Number(detailPosition) < 1
    ) {
      setContentIndex(2);
    } else if (Number(reviewPosition) < 1 && Number(questionPosition) > 0) {
      setContentIndex(1);
    } else if (Number(reviewPosition) > 0 && Number(questionPosition) > 0) {
      setContentIndex(0);
    }
  };

  useEffect(() => {
    if (!detailRef.current || !reviewRef.current || !questionRef.current)
      return;

    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRef.current, reviewRef.current, questionRef.current, param]);

  return (
    <div className="w-full h-full mt-10">
      <div className="w-full sticky top-0 bg-grayscale1 border-b-[1px] relative z-20">
        <div className="flex flex-row justify-center">
          <Link
            to="detail"
            smooth={true}
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 cursor-pointer ${
              contenntIndex === 0 ? "border-primary4" : ""
            }`}
          >
            상세설명
          </Link>
          <Link
            to="review"
            smooth={true}
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 cursor-pointer ${
              contenntIndex === 1 ? "border-primary4" : ""
            }`}
          >
            상품후기
          </Link>
          <Link
            to="question"
            smooth={true}
            className={`text-[1rem] py-3 px-10 border-[1px] border-grayscale3 border-b-0 cursor-pointer ${
              contenntIndex === 2 ? "border-primary4" : ""
            }`}
          >
            상품문의
          </Link>
        </div>
      </div>

      <div
        className="w-[70%] py-20 mx-auto max-[600px]:w-[100vw]"
        id="detail"
        ref={detailRef}
      >
        <ProductDescription productDescription={param.productDescription} />
      </div>
      <div className="border-b-[1px]"></div>
      <div
        className="w-[80%] py-20 mx-auto max-[600px]:w-[100vw]"
        id="review"
        ref={reviewRef}
      >
        <ProductReview productId={param.productId} />
      </div>
      <div className="border-b-[1px]"></div>
      <div
        className="w-[80%] py-20 mx-auto max-[600px]:w-[100vw]"
        id="question"
        ref={questionRef}
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
