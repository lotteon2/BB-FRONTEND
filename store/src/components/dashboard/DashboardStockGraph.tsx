import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { productStockGraph } from "../../mocks/dashboard";

export default function DashboardStockGraph() {
  const data = productStockGraph;

  //  const { data, isLoading } = useQuery({
  //   queryKey: ["getWeeklyProduct"],
  //   queryFn: () => getWeeklySaleProductGraph(),
  // });
  //   const isLoading = true;

  //   if (!data || isLoading) return <HalfDiv />;

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
  const series = data;

  return (
    <div className="p-3">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
}
