import { useParams } from "react-router";
import ProductByTagList from "../../components/product/ProductByTagList";

export default function ProductByTagPage() {
  const param = useParams();

  return (
    <div>
      <ProductByTagList tagId={Number(param.tagId)} />
    </div>
  );
}
