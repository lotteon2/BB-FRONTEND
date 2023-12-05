import { useNavigate } from "react-router";
import Tag01 from "../../assets/images/tag/001.png";
import Tag02 from "../../assets/images/tag/002.png";
import Tag03 from "../../assets/images/tag/003.png";
import Tag04 from "../../assets/images/tag/004.png";
import Tag05 from "../../assets/images/tag/005.png";
import Tag06 from "../../assets/images/tag/006.png";
import Tag07 from "../../assets/images/tag/007.png";

export default function TagList() {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div className="w-full flex flex-row gap-2 flex-wrap">
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/1")}
        >
          <img src={Tag01} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">연인 선물</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/2")}
        >
          <img src={Tag02} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">친구 선물</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/3")}
        >
          <img src={Tag03} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">공기 정화</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/4")}
        >
          <img src={Tag04} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">개업 축하</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/5")}
        >
          <img src={Tag05} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">승진 취임</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/6")}
        >
          <img src={Tag06} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">결혼식</p>
        </div>
        <div
          className="w-[12%] min-w-[80px] mx-auto flex flex-col bg-[#C2DE8A88] rounded-lg drop-shadow-md cursor-pointer hover:drop-shadow-none"
          onClick={() => navigate("/product/shoppingmall/tag/7")}
        >
          <img src={Tag07} alt="" className="w-[75%] mx-auto mt-3" />
          <p className="text-center text-base/8">장례식</p>
        </div>
      </div>
    </div>
  );
}
