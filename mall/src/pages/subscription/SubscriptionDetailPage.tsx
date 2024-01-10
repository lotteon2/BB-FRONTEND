import { useState } from "react";
import { useParams } from "react-router";
import SubscriptionInfo from "../../components/product/SubscriptionInfo";
import ProductContents from "../../components/product/ProductContents";
import NotFound from "../../components/common/NotFound";

export default function SubscriptionDetailPage() {
  const param = useParams().productId;
  const [productName, setProductName] = useState<string>("");

  if (!param) return <NotFound />;

  return (
    <div>
      <SubscriptionInfo productId={param} setProductName={setProductName} />
      <ProductContents productId={param} productName={productName} />
    </div>
  );
}
