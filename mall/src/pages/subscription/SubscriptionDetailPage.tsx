import { useState } from "react";
import { useParams } from "react-router";
import SubscriptionInfo from "../../components/product/SubscriptionInfo";
import ProductContents from "../../components/product/ProductContents";

export default function SubscriptionDetailPage() {
  const param = useParams().productId;
  const [productDescription, setProductDescription] = useState<string>("");

  return (
    <div>
      <SubscriptionInfo
        productId={param}
        setProductDescription={setProductDescription}
      />
      <ProductContents
        productId={param}
        productDescription={productDescription}
      />
    </div>
  );
}
