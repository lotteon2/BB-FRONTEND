import { useState } from "react";
import { useParams } from "react-router";
import ProductInfo from "../../components/product/ProductInfo";
import ProductContents from "../../components/product/ProductContents";

export default function ProductDetailPage() {
  const param = useParams().productId;
  const [productDescription, setProductDescription] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [storeId, setStoreId] = useState<number>(0);

  return (
    <div className="w-full h-full">
      <ProductInfo
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
