import { useState, useEffect } from "react";
import { Select } from "antd";
import StoreList from "../components/store/StoreList";
import { sidoOptions, sortOptions } from "../recoil/common/options";
import { useQuery } from "react-query";
import { getGugunList } from "../apis/store";
import WholeDiv from "../components/fallbacks/WholeDiv";

export default function StorePage() {
  const [sido, setSido] = useState<number>();
  const [gugun, setGugun] = useState<number>();
  const [sort, setSort] = useState<string>("DATE");

  const { data, isLoading } = useQuery({
    queryKey: ["getGugunList", sido],
    queryFn: () => getGugunList(sido),
  });

  useEffect(() => {
    if (data) {
      setGugun(data);
    }
  }, [data]);

  if (!data || isLoading)
    return (
      <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
        <div className="w-full h-full bg-grayscale1 rounded-lg">
          <div className="flex flex-row gap-3 p-3 justify-end">
            <Select
              placeholder="시/도 선택"
              options={sidoOptions}
              value={sido}
              onChange={(e) => setSido(e)}
              style={{ width: 150 }}
              showSearch
              allowClear
            />
            <Select
              placeholder="구/군 선택"
              options={data}
              value={gugun}
              style={{ width: 150 }}
              showSearch
              allowClear
            />
            <Select
              options={sortOptions}
              value={sort}
              onChange={(e) => setSort(e)}
              style={{ width: 100 }}
            />
          </div>
          <WholeDiv />
        </div>
      </div>
    );

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg">
        <div className="flex flex-row gap-3 p-3 justify-end">
          <Select
            placeholder="시/도 선택"
            options={sidoOptions}
            value={sido}
            onChange={(e) => setSido(e)}
            style={{ width: 150 }}
            showSearch
            allowClear
          />
          <Select
            placeholder="구/군 선택"
            options={data}
            value={gugun}
            style={{ width: 150 }}
            showSearch
            allowClear
          />
          <Select
            options={sortOptions}
            value={sort}
            onChange={(e) => setSort(e)}
            style={{ width: 100 }}
          />
        </div>
        <StoreList sido={sido} gugun={gugun} sort={sort} />
      </div>
    </div>
  );
}
