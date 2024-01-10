import { QuestionCircleFilled } from "@ant-design/icons";
import { Pagination, PaginationProps, Select, Tour, TourProps } from "antd";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../recoil/atom/common";
import { getSettlementList } from "../apis/store";
import SettlementTable from "../components/settlement/SettlementTable";
import SettlementTableFallback from "../components/fallbacks/SettlementTableFallback";

interface option {
  value: number;
  label: string;
}

export default function SettlementPage() {
  const storeId = useRecoilValue(storeIdState);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | undefined>();
  const [month, setMonth] = useState<number | undefined>();
  const [yearOption, setYearOption] = useState<option[]>([]);
  const [monthOption, setMonthOption] = useState<option[]>([]);

  const ref1 = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["getSettlementList", page, year, month],
    queryFn: () => getSettlementList(year, month, storeId, page - 1, 13),
  });

  const steps: TourProps["steps"] = [
    {
      title: "정산 내역",
      description:
        "매월 매출에 대한 정산 금액을 확인할 수 있습니다. 총 매출액에서 10%는 BB 사용 수수료로 빠지며 이를 제외한 금액을 정산받으실 수 있습니다. 정산 금액은 설정하신 대표 계좌로 입금됩니다.",
      placement: "center",
      target: () => ref1.current,
    },
  ];

  const handlePage: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      var years: option[] = [];
      var months: option[] = [];
      data.data.year.forEach((element: number) => {
        const info = {
          value: element,
          label: element + "년",
        };
        years.push(info);
      });
      data.data.month.forEach((element: number) => {
        const info = {
          value: element,
          label: element + "월",
        };
        months.push(info);
      });
      setYearOption(years);
      setMonthOption(months);
    }
  }, [data, year, month, yearOption, monthOption]);

  if (!data || isLoading) return <SettlementTableFallback />;

  return (
    <div className="w-[1620px] h-[897px] bg-grayscale3 p-2">
      <div className="w-full h-full bg-grayscale1 rounded-lg">
        <div className="flex flex-row gap-3 p-3 justify-end">
          <Select
            onChange={(e) => setYear(e)}
            value={year}
            defaultValue={year}
            options={yearOption}
            placeholder="년 선택"
            style={{ width: 100 }}
            allowClear
          />
          <Select
            onChange={(e) => setMonth(e)}
            value={month}
            defaultValue={month}
            options={monthOption}
            placeholder="월 선택"
            style={{ width: 100 }}
            allowClear
          />
        </div>
        <div className="h-[770px]">
          <SettlementTable data={data.data.settlementDtoList} />
        </div>
        <div className="text-center mt-3">
          <Pagination
            defaultCurrent={page}
            total={data.totalCnt}
            defaultPageSize={13}
            onChange={handlePage}
          />
        </div>
      </div>
      <button
        className="absolute bottom-1 right-1"
        onClick={() => setOpen(true)}
      >
        <QuestionCircleFilled style={{ fontSize: 20 }} />
      </button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}
