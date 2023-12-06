import Banner from "../components/main/Banner";
import BestProduct from "../components/main/BestProduct";
import BestShop from "../components/main/BestShop";
import NewProduct from "../components/main/NewProduct";
import RecommandProduct from "../components/main/RecommandProduct";
import TagList from "../components/main/TagList";
import Ad01 from "../assets/images/ad/001.png";
import Ad02 from "../assets/images/ad/002.png";

export default function MainPage() {
  return (
    <div className="w-full h-full">
      <Banner />
      <TagList />
      <RecommandProduct />
      <NewProduct />
      <img src={Ad02} alt="" className="py-5" />
      <BestShop />
      <BestProduct />
      <img src={Ad01} alt="" className="py-5" />
    </div>
  );
}
