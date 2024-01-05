import { useState } from "react";
import { useParams } from "react-router";
import ProductContents from "../../components/product/ProductContents";
import PickupProductInfo from "../../components/product/PickupProductInfo";
import NotFound from "../../components/common/NotFound";

export default function PickupProductDetailPage() {
  const param = useParams().productId;
  const [productName, setProductName] = useState<string>("");

  if (!param) return <NotFound />;

  return (
    <div className="w-full h-full">
      <PickupProductInfo productId={param} setProductName={setProductName} />
      <ProductContents productId={param} productName={productName} />
    </div>
  );
}
