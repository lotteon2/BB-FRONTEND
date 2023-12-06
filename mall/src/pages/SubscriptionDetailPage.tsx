import { useParams } from "react-router";
import SubscriptionInfo from "../components/product/SubscriptionInfo";

export default function SubscriptionDetailPage() {
  const param = useParams().storeId;

  return (
    <div>
      <SubscriptionInfo storeId={Number(param)} />
    </div>
  );
}
