import { useState } from "react";
import { useParams } from "react-router";
import ProductInfo from "../../components/product/ProductInfo";
import ProductContents from "../../components/product/ProductContents";

export default function ProductDetailPage() {
  const param = useParams().productId;
  const [productDescription, setProductDescription] = useState<string>("");

  return (
    <div className="w-full h-full">
      <ProductInfo
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
