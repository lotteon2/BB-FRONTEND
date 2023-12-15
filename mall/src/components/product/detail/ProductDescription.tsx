import { useEffect } from "react";
import SquareFallback from "../../fallbacks/SquareFallback";
interface param {
  productDescription: string;
}
export default function ProductDescription(param: param) {
  if (param.productDescription === "")
    return (
      <div className="flex justify-center">
        <SquareFallback />
      </div>
    );

  return <img src={param.productDescription} alt="상품 상세 설명" />;
}
