import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { MonthlyStoreSalesGraphData } from "../../mocks/dashboard";

export default function MonthlyStoreSalesGraph() {
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["getStoreSalesGraph"],
  //     queryFn: () => getStoreSalesGraph(),
  //   });

  const data = MonthlyStoreSalesGraphData;

  const options: ApexOptions = {
    colors: [
      "#F57F17",
      "#F7A825",
      "#FBC02D",
      "#FDD835",
      "#FFEB3B",
      "#FFEE58",
      "#FFF176",
      "#FFF59D",
      "#FFF9C4",
      "#FFFDE7",
    ],
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
      text: "매출액 TOP 10",
      align: "center",
    },
    stroke: {
      show: true,
      width: 20,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["판매량"],
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      colors: [
        "#F57F17",
        "#F7A825",
        "#FBC02D",
        "#FDD835",
        "#FFEB3B",
        "#FFEE58",
        "#FFF176",
        "#FFF59D",
        "#FFF9C4",
        "#FFFDE7",
      ],
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

  //   if (!data || isLoading) return <QuarterDiv />;

  const series = data;

  return (
    <div className="p-3">
      <Chart options={options} series={series} type="bar" height={410} />
    </div>
  );
}
