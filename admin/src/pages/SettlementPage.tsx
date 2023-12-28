import { useState, useEffect } from "react";
import { PaginationProps, Select } from "antd";
import { options } from "../recoil/common/interfaces";
import SettlementTable from "../components/settlement/SettlementTable";
import { useMutation, useQuery } from "react-query";
import { getSettlementList } from "../apis/settlement";
import WholeDiv from "../components/fallbacks/WholeDiv";
import { sidoOptions } from "../recoil/common/options";
import { getGugunList } from "../apis/store";
import { FailToast } from "../components/common/toast/FailToast";

export default function SettlementPage() {
  const [yearOptions, setYearOptions] = useState<options[]>([]);
  const [monthOptions, setMonthOptions] = useState<options[]>([]);
  const [storeOptions, setStoreOptions] = useState<options[]>([]);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [sido, setSido] = useState<number>();
  const [gugun, setGugun] = useState<number>();
  const [gugunList, setGugunList] = useState([]);
  const [storeId, setStoreId] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["getSettlementList", year, month, storeId, page, sido, gugun],
    queryFn: () =>
      getSettlementList(year, month, storeId, page - 1, 13, sido, gugun),
  });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  const getGugunMutation = useMutation(
    ["getGugunList"],
    () => getGugunList(sido),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        FailToast(null);
      },
    }
  );

  useEffect(() => {
    if (data) {
      var yearOptions: options[] = [];
      var monthOptions: options[] = [];

      data.year.forEach((element: number) => {
        const year = {
          value: element,
          label: element + "년",
        };
        yearOptions.push(year);
      });

      data.month.forEach((element: number) => {
        const month = {
          value: element,
          label: element + "월",
        };
        monthOptions.push(month);
      });

      setYearOptions(yearOptions);
      setMonthOptions(monthOptions);
      setStoreOptions(data.store);
    }
    // eslint-disable-next-line
  }, []);

  if (!data || isLoading)
    return (
      <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
        <div className="w-full h-full bg-grayscale1 rounded-lg">
          <div className="flex flex-row gap-3 p-3 justify-end">
            <Select placeholder="시/도 선택" style={{ width: 150 }} />
            <Select placeholder="구/군 선택" style={{ width: 150 }} />
            <Select placeholder="년도 선택" style={{ width: 150 }} />
            <Select placeholder="월 선택" style={{ width: 150 }} />
            <Select placeholder="가게 선택" style={{ width: 150 }} />
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
            placeholder="시도 선택"
            options={sidoOptions}
            value={sido}
            style={{ width: 100 }}
            onChange={(e) => setSido(e)}
          />
          <Select
            placeholder="구군 선택"
            options={gugunList}
            value={gugun}
            style={{ width: 100 }}
            onChange={(e) => setYear(e)}
          />
          <Select
            placeholder="년도 선택"
            options={yearOptions}
            value={year}
            style={{ width: 100 }}
            onChange={(e) => setYear(e)}
          />
          <Select
            placeholder="월 선택"
            options={monthOptions}
            value={month}
            style={{ width: 100 }}
            onChange={(e) => setMonth(e)}
          />
          <Select
            placeholder="가게 선택"
            options={storeOptions}
            value={storeId}
            style={{ width: 150 }}
            onChange={(e) => setStoreId(e)}
          />
        </div>
        <SettlementTable
          data={data.data.settlement}
          page={page}
          handlePage={handlePage}
          totalCnt={data.data.totalCnt}
        />
      </div>
    </div>
  );
}
