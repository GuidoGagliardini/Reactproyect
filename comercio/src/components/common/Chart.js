import React, { useEffect } from "react";
// npm i chart.js
import Chart from "chart.js/auto";

const Plantilla = () => {
  const cr = React.createRef();
  useEffect(() => {
    const ctx = cr.current.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["CPU", "MEMORIA", "USO INTERNET"],
        datasets: [
          {
            label: "Estadisticas 👇",
            data: [20,30,60],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
           
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },[]);

  return <canvas ref={cr} width="300px" height="100vh"></canvas>;
};

export default Plantilla;