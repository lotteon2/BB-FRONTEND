import { useState } from "react";
import WishStoreList from "./wish/WishStoreList";
import WishProductList from "./wish/WishProductList";

export default function MyWishList() {
  const [isStore, setIsStore] = useState<boolean>(false);
  return (
    <div className="mt-3">
      <div className="flex flex-row gap-5 justify-end">
        <span
          className={`${
            !isStore ? "font-bold text-primary4" : ""
          } cursor-pointer`}
          onClick={() => setIsStore(false)}
        >
          상품만
        </span>
        <span>|</span>
        <span
          className={`${
            isStore ? "font-bold text-primary4" : ""
          } cursor-pointer`}
          onClick={() => setIsStore(true)}
        >
          가게만
        </span>
      </div>
      {isStore ? <WishStoreList /> : <WishProductList />}
    </div>
  );
}
