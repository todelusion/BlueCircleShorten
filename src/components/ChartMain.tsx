import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import type { ICalcNoRepeatClick } from "../pages/home/Chart";

interface IChartLineProps {
  calcNoRepeatClick: ICalcNoRepeatClick;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const browserOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "瀏覽器點擊",
    },
  },
};

export const systemOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "作業系統點擊",
    },
  },
};

export const dateOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "日期點擊",
    },
  },
};

export default function ChartMain({
  calcNoRepeatClick,
}: IChartLineProps): JSX.Element {
  console.log(calcNoRepeatClick);

  const browserClickData = {
    labels: Object.keys(
      calcNoRepeatClick.browserClick !== undefined &&
        calcNoRepeatClick.browserClick
    ),
    datasets: [
      {
        label: "瀏覽器點擊",
        data: Object.values(
          calcNoRepeatClick.browserClick !== undefined &&
            calcNoRepeatClick.browserClick
        ),
        datalabels: {
          color: "rgb(236, 247, 255)",
        },
        backgroundColor: [
          "rgb(48, 30, 95)",
          "rgb(84, 52, 167)",
          "rgb(157, 127, 234)",
          "rgb(218, 203, 255)",
        ],

        hoverOffset: 10,
      },
    ],
  };

  const systemClickData = {
    labels: Object.keys(
      calcNoRepeatClick.systemClick !== undefined &&
        calcNoRepeatClick.systemClick
    ),
    datasets: [
      {
        label: "作業系統點擊",
        data: Object.values(
          calcNoRepeatClick.systemClick !== undefined &&
            calcNoRepeatClick.systemClick
        ),
        datalabels: {
          color: "rgb(244, 152, 209)",
        },
        backgroundColor: [
          "rgb(48, 30, 95)",
          "rgb(244, 152, 209)",
          "rgb(157, 127, 234)",
          "rgb(218, 203, 255)",
        ],

        hoverOffset: 10,
      },
    ],
  };

  Object.values(
    calcNoRepeatClick.dateClick !== undefined && calcNoRepeatClick.dateClick
  );

  const dateClickData = {
    labels: Object.keys(
      calcNoRepeatClick.dateClick !== undefined && calcNoRepeatClick.dateClick
    ),
    datasets: [
      {
        label: "日期點擊",
        data: Object.values(
          calcNoRepeatClick.dateClick !== undefined &&
            calcNoRepeatClick.dateClick
        ),
        datalabels: {
          color: "rgb(244, 152, 209)",
        },
        backgroundColor: [
          "rgb(48, 30, 95)",
          "rgb(244, 152, 209)",
          "rgb(157, 127, 234)",
          "rgb(218, 203, 255)",
        ],

        hoverOffset: 10,
      },
    ],
  };

  // const dateRangeClickData

  return (
    <ul className="grid w-full max-w-2xl grid-cols-2">
      <li className="col-span-2 md:col-span-1">
        <Bar options={browserOptions} data={browserClickData} />
      </li>
      <li className="col-span-2 md:col-span-1">
        <Bar options={systemOptions} data={systemClickData} />
      </li>
      <li className="col-span-2">
        <Line options={browserOptions} data={dateClickData} />
      </li>
    </ul>
  );
}
