import CartDetail from "../components/cart/CartDetail";

export default function CartPage() {
  return (
    <div>
      <div className="mx-auto w-28 text-center text-3xl font-bold border-b-4 border-primary7">
        장바구니
      </div>
      <CartDetail />
    </div>
  );
}
