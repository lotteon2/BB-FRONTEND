import { useState } from "react";
import "../../css/map.css";
import { Select } from "antd";
import { useQuery } from "react-query";

import SquareFallback from "../fallbacks/SquareFallback";
import { getRegionList, region } from "../../recoil/common/data";
import KoreaItem from "./region/KoreaItem";
import { getGugunList } from "../../apis/store";
import RegionStoreList from "./region/RegionStoreList";

export default function PickupRegion() {
  const [sido, setSido] = useState<string | null>(null);
  const [gugun, setGugun] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["getGugunList", sido],
    queryFn: () => getGugunList(sido),
  });

  if (!data || isLoading)
    return (
      <div className="flex flex-row gap-3">
        <SquareFallback />
        <SquareFallback />
      </div>
    );

  return (
    <div>
      <p className="text-[1.8rem] font-bold">지역별 꽃집 찾기 🚗</p>
      <div className="mt-5 w-full flex flex-row gap-2 flex-wrap">
        <div className="w-[48vw] h-full max-w-[655px] max-h-[655px] min-w-[370px] min-h-[650px] mx-auto">
          <div className="map-wrapper w-full h-full relative">
            <Select
              placeholder="구/군 선택"
              style={{ position: "absolute", top: 0, right: 0, width: 120 }}
              options={data.data}
              value={gugun === "" ? null : gugun}
              onChange={(e) => setGugun(e)}
            />
            <div className="info"></div>
            <svg
              width="375"
              height="650"
              viewBox="30 100 400 700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                {getRegionList(region).map((item: any) => {
                  return (
                    <KoreaItem
                      onClick={() => {
                        setSido(item.sidoCode);
                      }}
                      key={item.sidoCode}
                      className={
                        sido === item.sidoCode ? "region click" : "region"
                      }
                      title={item.name}
                      d={item.d}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[48vw] h-[55vw] max-w-[655px] max-h-[655px] min-w-[370px] min-h-[652px] mx-auto flex align-center">
          <RegionStoreList sido={sido} gugun={gugun} />
        </div>
      </div>
    </div>
  );
}
