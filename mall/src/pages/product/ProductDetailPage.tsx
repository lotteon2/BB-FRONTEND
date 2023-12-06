import { useParams } from "react-router";
import ProductInfo from "../../components/product/ProductInfo";

export default function ProductDetailPage() {
  const param = useParams().productId;

  return (
    <div className="w-full h-full">
      <ProductInfo productId={param} />
    </div>
  );
}
