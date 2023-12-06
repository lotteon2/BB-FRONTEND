import { useParams } from "react-router";
import SubscriptionInfo from "../../components/product/SubscriptionInfo";

export default function SubscriptionDetailPage() {
  const param = useParams().productId;

  return (
    <div>
      <SubscriptionInfo productId={param} />
    </div>
  );
}
