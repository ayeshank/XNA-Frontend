import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "../stylesheets/Chart.css";
import Loading from "./Loading.js";
import axios from "axios";
import BASE_URL from "../config.js";

export default function MyChart() {
  const [Data, setData] = useState([]);
  const data = {
    labels: Data.map((o) => o.date),
    datasets: [
      {
        label: "XNA/AUD",
        fill: false,
        lineTension: 0.0,
        backgroundColor: "rgb(41, 33, 116,0.5)",
        borderColor: "rgb(41, 33, 116,0.5)",
        pointHitRadius: 20,
        data: Data.map((o) => parseFloat(o.xnaaud)),
      },
    ],
  };
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch(`${BASE_URL}/audlogget`, {
        credentials: "include",
      });
      const json = await response.json();
      setData(json.al);
      console.log(json.al);
    }
    fetchBooks();
  }, []);
  if (!Data) {
    return <Loading />;
  }

  // const data = {
  //     // labels: ['2021-10-30 08:23:13', '2021-10-31 15:27:29', '2021-10-31 15:46:35', '2021-10-31 16:30:24', '2021-11-07 12:15:59','2021-10-30 08:23:13', '2021-10-31 15:27:29', '2021-10-31 15:46:35', '2021-10-31 16:30:24', '2021-11-07 12:15:59'],
  //     labels: [Data.date],
  //     // labels: ['2021-10-30 08:23:13', '2021-10-31 15:27:29'],
  //     datasets: [
  //       {
  //         label: 'XNA/AUD',
  //         fill: false,
  //         lineTension: 0.0,
  //         backgroundColor: 'rgb(41, 33, 116,0.5)',
  //         borderColor: 'rgb(41, 33, 116,0.5)',
  //         borderCapStyle: 'butt',
  //         borderDash: [],
  //         borderDashOffset: 0.0,
  //         borderJoinStyle: 'miter',
  //         // pointBorderColor: 'rgba(75,192,192,1)',
  //         pointBorderColor: 'red',
  //         pointBackgroundColor: '#fff',
  //         pointBorderWidth: 5,
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //         pointHoverBorderColor: 'rgba(220,220,220,1)',
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 20,
  //         // data: [0.0100000000, 0.0119063760, 0.0129502050, 0.0129652530, 0.0174290940,0.0100000000, 0.0119063760, 0.0129502050, 0.0129652530, 0.0174290940]
  //         data:[parseFloat(Data.xnaaud)],
  // },
  // {
  //   label: 'XNA/EUR',
  //   fill: false,
  //   lineTension: 0.2,
  //   backgroundColor: 'rgb(35, 143, 107,0.6)',
  //   borderColor: 'rgb(35, 143, 107,0.6)',
  //   borderCapStyle: 'butt',
  //   borderDash: [],
  //   borderDashOffset: 0.0,
  //   borderJoinStyle: 'miter',
  //   pointBorderColor: 'rgba(75,192,192,1)',
  //   pointBackgroundColor: '#fff',
  //   pointBorderWidth: 1,
  //   pointHoverRadius: 5,
  //   pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //   pointHoverBorderColor: 'rgba(220,220,220,1)',
  //   pointHoverBorderWidth: 2,
  //   pointRadius: 1,
  //   pointHitRadius: 20,
  //   data: [70, 60, 20, 71, 46, 105, 45]
  // }
  // ]
  // };
  return (
    <div className="chart">
      <Line
        data={data}
        options={{
          responsive: true,
          title: { text: "XNA/AUD RATES", display: true },
        }}
      />
    </div>
  );
}
