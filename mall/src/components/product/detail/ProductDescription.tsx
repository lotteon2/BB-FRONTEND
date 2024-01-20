import { useQuery } from "react-query";
import SquareFallback from "../../fallbacks/SquareFallback";
import { getProductDetail } from "../../../apis/product";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../recoil/atom/common";
interface param {
  productId: string;
}
export default function ProductDescription(param: param) {
  const isLogin = useRecoilValue<boolean>(loginState);

  const { data, isLoading } = useQuery({
    queryKey: ["getProductDetailForDescription", param.productId, isLogin],
    queryFn: () => getProductDetail(param.productId, isLogin),
  });

  if (!data || isLoading)
    return (
      <div className="flex justify-center">
        <SquareFallback />
      </div>
    );

  return (
    <img
      src={data.data.productDetailImage}
      alt="상품 상세 설명"
      className="w-full"
    />
  );
}
