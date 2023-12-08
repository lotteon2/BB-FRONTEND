import { useParams } from "react-router";
import PickupOrderDetail from "../../components/order/PickupOrderDetail";
import OrderDetail from "../../components/order/OrderDetail";

export default function OrderPage() {
  const param = useParams().type;

  return (
    <div className="w-full h-full">
      <div className="mx-auto w-32 text-center text-3xl font-bold border-b-4 border-primary7">
        주문/결제
      </div>
      {param === "pickup" ? (
        <PickupOrderDetail />
      ) : param === "subscription" ? (
        <></>
      ) : (
        <OrderDetail />
      )}
    </div>
  );
}
