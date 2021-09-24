import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = (props) => {
  const { weights, initialWeight } = props;
  const renderLabels = () => {
    let labels = ["Day 1"];
    for (let i = 0; i < weights.length; i++) {
      labels.push("Day " + (i + 2));
    }
    return labels;
  };

  const data = {
    labels: renderLabels(),
    datasets: [
      {
        label: "My weight graph",
        data: [initialWeight, ...weights],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Line
        data={data}
        style={{ margin: "50px 0px 20px 120px", width: "50%" }}
      />
    </>
  );
};

export default BarChart;
