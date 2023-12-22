import { useParams } from "react-router";
import ProductList from "../../components/product/ProductList";

export default function ProductByCategoryPage() {
  const param = Number(useParams().categoryId);

  return (
    <div>
      <div className="mx-auto w-28 text-center text-3xl font-bold border-b-4 border-primary7">
        {param === 1
          ? "꽃다발"
          : param === 2
          ? "꽃바구니"
          : param === 3
          ? "꽃상자"
          : "화환"}
      </div>
      <ProductList categoryId={param} storeId={null} />
    </div>
  );
}
