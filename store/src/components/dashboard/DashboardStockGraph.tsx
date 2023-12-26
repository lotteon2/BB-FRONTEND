import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { productStockGraph } from "../../mocks/dashboard";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { getFlowerStockGraph } from "../../apis/dashboard";
import HalfDiv from "../fallbacks/HalfDiv";

export default function DashboardStockGraph() {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getFlowerStockGraph"],
    queryFn: () => getFlowerStockGraph(storeId),
  });

  if (!data || isLoading) return <HalfDiv />;

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
  const series = data.data.stockInfoDtos;

  return (
    <div className="p-3">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
}
