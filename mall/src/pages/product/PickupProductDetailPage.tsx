import { useState } from "react";
import { useParams } from "react-router";
import ProductContents from "../../components/product/ProductContents";
import PickupProductInfo from "../../components/product/PickupProductInfo";

export default function PickupProductDetailPage() {
  const param = useParams().productId;
  const [productDescription, setProductDescription] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [storeId, setStoreId] = useState<number>(0);

  return (
    <div className="w-full h-full">
      <PickupProductInfo
        productId={param}
        setProductDescription={setProductDescription}
        setProductName={setProductName}
        setStoreId={setStoreId}
      />
      <ProductContents
        productId={param}
        productDescription={productDescription}
        productName={productName}
        storeId={storeId}
      />
    </div>
  );
}
