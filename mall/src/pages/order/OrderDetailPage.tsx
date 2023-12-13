import { useParams } from "react-router-dom";
import OrderInfo from "../../components/order/detail/OrderInfo";
import PickupOrderInfo from "../../components/order/detail/PickupOrderInfo";
import SubscriptionOrderInfo from "../../components/order/detail/SubscriptionOrderInfo";

export default function OrderDetailPage() {
  const param = useParams();
  const type = param.type;
  const id = param.id;

  if (!id) return null;

  return (
    <div className="w-full h-full">
      <div className="mx-auto w-44 text-center text-3xl font-bold border-b-4 border-primary7">
        주문내역 상세
      </div>
      {type === "delivery" ? (
        <OrderInfo id={id} />
      ) : type === "pickup" ? (
        <PickupOrderInfo id={id} />
      ) : (
        <SubscriptionOrderInfo id={id} />
      )}
    </div>
  );
}
