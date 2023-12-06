import Banner from "../components/main/Banner";
import Ad01 from "../assets/images/ad/001.png";
import Ad02 from "../assets/images/ad/002.png";
import BestShop from "../components/main/BestShop";
import PickupNearby from "../components/pickup/PickupNearby";

export default function PickupPage() {
  return (
    <div>
      <Banner />
      <PickupNearby />
      <BestShop />
      <img src={Ad02} alt="" className="py-5" />
      {/* <PickupRegionPage /> */}
      <img src={Ad01} alt="" className="pb-5 pt-20" />
    </div>
  );
}
