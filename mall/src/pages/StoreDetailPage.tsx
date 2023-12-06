import { useParams } from "react-router";
import StoreInfo from "../components/store/StoreInfo";

export default function StoreDetailPage() {
  const param = Number(useParams().storeId);

  return (
    <div className="w-full h-full">
      <StoreInfo storeId={param} />
    </div>
  );
}
