import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red"],
  datasets: [
    {
      label: "# of Votes",
      data: [12],
      backgroundColor: ["rgba(204,230,218)"],
      borderColor: ["rgba(204,230,218)"],
      borderWidth: 1,
    },
  ],
};
const PieCharts = () => {
  return (
    <div>
      <Pie data={data} />{" "}
    </div>
  );
};

export default PieCharts;
