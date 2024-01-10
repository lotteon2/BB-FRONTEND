import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { storeIdState } from "../../recoil/atom/common";
import { useQuery } from "react-query";
import { getWeeklySaleGraph } from "../../apis/dashboard";
import QuarterDiv from "../fallbacks/QuarterDiv";

export default function WeeklySaleGraph() {
  const storeId = useRecoilValue<number>(storeIdState);

  const { data, isLoading } = useQuery({
    queryKey: ["getWeeklySaleGraph"],
    queryFn: () => getWeeklySaleGraph(storeId),
  });

  if (!data || isLoading) return <QuarterDiv />;

  const options: ApexOptions = {
    colors: ["#A843D6"],
    chart: {
      type: "area",
      fontFamily: "regular",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      colors: ["#A843D6"],
    },
    title: {
      text: "주간 매출액",
      align: "center",
    },
    fill: {
      opacity: 0.5,
      colors: ["#42009E"],
    },
    xaxis: {
      categories: data.data.categories,
    },
    yaxis: {
      title: {
        text: "단위(원)",
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString() + "원";
        },
      },
    },
  };
  const series = [
    {
      name: "매출액",
      data: data.data.data,
    },
  ];

  return (
    <div className="p-3">
      <Chart options={options} series={series} type="area" height={410} />
    </div>
  );
}
