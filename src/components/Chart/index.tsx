import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "heatmap";

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface ChartProps {
  type: ChartType;
  series: ChartSeries[] | number[];
  categories?: string[];
  height?: number | string;
  width?: number | string;
  colors?: string[];
  stacked?: boolean;
  showLegend?: boolean;
  options?: ApexOptions;
  className?: string;
}

const DEFAULT_COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
];

export function Chart({
  type,
  series,
  categories,
  height = 320,
  width = "100%",
  colors = DEFAULT_COLORS,
  stacked = false,
  showLegend = true,
  options,
  className,
}: ChartProps) {
  const mergedOptions: ApexOptions = {
    chart: {
      type,
      stacked,
      toolbar: { show: false },
      fontFamily: "inherit",
      ...options?.chart,
    },
    colors,
    dataLabels: { enabled: false, ...options?.dataLabels },
    legend: { show: showLegend, position: "bottom", ...options?.legend },
    grid: { borderColor: "#e5e7eb", strokeDashArray: 4, ...options?.grid },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      ...options?.xaxis,
    },
    stroke: { curve: "smooth", width: 2, ...options?.stroke },
    ...options,
  };

  return (
    <div className={className}>
      <ReactApexChart
        type={type}
        series={series as ApexOptions["series"]}
        options={mergedOptions}
        height={height}
        width={width}
      />
    </div>
  );
}

Chart.displayName = "Chart";
