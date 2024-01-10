import { useState } from "react";
import { useParams } from "react-router";
import ProductInfo from "../../components/product/ProductInfo";
import ProductContents from "../../components/product/ProductContents";
import NotFound from "../../components/common/NotFound";

export default function ProductDetailPage() {
  const param = useParams().productId;
  const [productName, setProductName] = useState<string>("");

  if (!param) return <NotFound />;

  return (
    <div className="w-full h-full">
      <ProductInfo productId={param} setProductName={setProductName} />
      <ProductContents productId={param} productName={productName} />
    </div>
  );
}
