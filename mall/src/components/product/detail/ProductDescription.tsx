import { useQuery } from "react-query";
import SquareFallback from "../../fallbacks/SquareFallback";
import { getProductDetail } from "../../../apis/product";
interface param {
  productId: string;
}
export default function ProductDescription(param: param) {
  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetailForDescription", param.productId],
    queryFn: () => getProductDetail(param.productId),
  });

  if (!data || isLoading)
    return (
      <div className="flex justify-center">
        <SquareFallback />
      </div>
    );

  return <img src={data.data.productDetailImage} alt="상품 상세 설명" />;
}
