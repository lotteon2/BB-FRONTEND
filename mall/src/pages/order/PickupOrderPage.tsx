import PickupOrderDetail from "../../components/order/PickupOrderDetail";

export default function PickupOrderPage() {
  return (
    <div className="w-full h-full">
      <div className="mx-auto w-32 text-center text-3xl font-bold border-b-4 border-primary7">
        주문/결제
      </div>
      <PickupOrderDetail />
    </div>
  );
}
