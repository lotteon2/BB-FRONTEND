import { useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Button } from "antd";
import StockModifyModal from "./StockModifyModal";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { getFlowerStockGraph } from "../../apis/dashboard";
import SchedulerCalendarFallback from "../fallbacks/SchedulerCalendarFallback";

export default function StockGraph() {
  const storeId = useRecoilValue<number>(storeIdState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = () => {
    setIsChange((cur) => !cur);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getFlowerStockGraph", isChange],
    queryFn: () => getFlowerStockGraph(storeId),
  });

  const options: ApexOptions = {
    colors: ["#A843D6"],
    chart: {
      type: "bar",
      fontFamily: "regular",
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "재고량",
      align: "center",
    },
    stroke: {
      show: true,
      width: 20,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["재고"],
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      colors: ["#A843D6"],
    },
    yaxis: {
      title: {
        text: "단위(개)",
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString() + "개";
        },
      },
    },
  };

  if (!data || isLoading)
    return (
      <div className="relative">
        <span className="text-xl font-bold">재고 관리</span>
        <Button className="absolute right-0" type="primary">
          재고 수정
        </Button>
        <div className="mt-5">
          <SchedulerCalendarFallback />
        </div>
      </div>
    );

  return (
    <div className="relative">
      <span className="text-xl font-bold">재고 관리</span>
      <Button
        className="absolute right-0"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        재고 수정
      </Button>
      <div className="mt-5">
        <Chart
          options={options}
          series={data.data.stockInfoDtos}
          type="bar"
          height={800}
        />
      </div>
      {isModalOpen ? (
        <StockModifyModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleChange={handleChange}
          data={data.data.stockInfoDtos}
        />
      ) : (
        ""
      )}
    </div>
  );
}
