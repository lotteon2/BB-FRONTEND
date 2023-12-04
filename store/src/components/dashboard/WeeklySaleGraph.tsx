import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { weeklySaleData } from "../../mocks/dashboard";
import QuarterDiv from "../fallbacks/QuarterDiv";

export default function WeeklySaleGraph() {
  // const storeId = useRecoilValue<number>(storeIdState);
  const data = weeklySaleData;

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getWeeklySaleGraph"],
  //   queryFn: () => getWeeklySaleGraph(storeId),
  // });

  // const isLoading = true;

  // if (!data || isLoading) return <QuarterDiv />;

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
      categories: data.categories,
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
      data: data.data,
    },
  ];

  return (
    <div className="p-3">
      <Chart options={options} series={series} type="area" height={410} />
    </div>
  );
}
