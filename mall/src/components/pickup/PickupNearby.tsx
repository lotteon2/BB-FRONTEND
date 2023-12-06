import KakaoMap from "./nearyby/KakaoMap";
import NearbyStoreList from "./nearyby/NearbyStoreList";

export default function PickupNearby() {
  return (
    <div>
      <p className="text-[1.8rem] font-bold">주변 꽃집 찾기 🧐</p>
      <div className="mt-5 w-full flex flex-row gap-2 flex-wrap">
        <div className="w-[48vw] h-[55vw] max-w-[655px] max-h-[655px] min-w-[370px] min-h-[432px] mx-auto">
          <KakaoMap />
        </div>
        <div className="w-[48vw] h-[55vw] max-w-[655px] max-h-[655px] min-w-[370px] min-h-[432px] mx-auto flex align-center">
          <NearbyStoreList />
        </div>
      </div>
    </div>
  );
}
