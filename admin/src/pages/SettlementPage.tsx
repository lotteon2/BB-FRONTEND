import { useState, useEffect } from "react";
import { PaginationProps, Select } from "antd";
import { options } from "../recoil/common/interfaces";
import { settlementData } from "../mocks/settlement";
import SettlementTable from "../components/settlement/SettlementTable";

export default function SettlementPage() {
  const [yearOptions, setYearOptions] = useState<options[]>([]);
  const [monthOptions, setMonthOptions] = useState<options[]>([]);
  const [storeOptions, setStoreOptions] = useState<options[]>([]);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [storeId, setStoreId] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const data = settlementData;

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getSettlementList", year, month, storeId, page],
  //     queryFn: () => getSettlementList(year, month, storeId, page - 1, 13),
  //   });

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

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

  //   if (!data || isLoading)
  //   return (
  //     <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
  //       <div className="w-full h-full bg-grayscale1 rounded-lg">
  //         <div className="flex flex-row gap-3 p-3 justify-end">
  //           <Select placeholder="년도 선택" style={{ width: 150 }} />
  //           <Select placeholder="월 선택" style={{ width: 150 }} />
  //           <Select placeholder="가게 선택" style={{ width: 150 }} />
  //         </div>
  //         <WholeDiv />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg">
        <div className="flex flex-row gap-3 p-3 justify-end">
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
          data={data.settlement}
          page={page}
          handlePage={handlePage}
          totalCnt={data.totalCnt}
        />
      </div>
    </div>
  );
}
