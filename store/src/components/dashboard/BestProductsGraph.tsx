import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { weeklySaleProductData } from "../../mocks/dashboard";

export default function BestProductsGraph() {
  const data = weeklySaleProductData;

  // const { data, isLoading } = useQuery({
  //   queryKey: ["getWeeklyProduct"],
  //   queryFn: () => getWeeklySaleProductGraph(),
  // });
  // const isLoading = true;

  // if (!data || isLoading) return <QuarterDiv />;

  const options: ApexOptions = {
    colors: [
      "#42009E",
      "#6900AB",
      "#7C00B1",
      "#9100B8",
      "#A000BE",
      "#B036C8",
      "#D08EDE",
      "#D08EDE",
      "#E3BBEB",
      "#F4E5F8",
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
      text: "베스트셀러 TOP 10",
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
        "#42009E",
        "#6900AB",
        "#7C00B1",
        "#9100B8",
        "#A000BE",
        "#B036C8",
        "#D08EDE",
        "#D08EDE",
        "#E3BBEB",
        "#F4E5F8",
      ],
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
      <Chart options={options} series={series} type="bar" height={410} />
    </div>
  );
}
