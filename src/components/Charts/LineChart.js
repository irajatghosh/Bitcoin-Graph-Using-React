import { Line } from "react-chartjs-2";

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
const LineChart = (props) => {
    const { labels, data } = props.data;
    
    const bitcoinData = {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin price graph (USD)",
          data: data,
          fill: false,
          backgroundColor: "#f7931a",
          borderColor: "#f7931a",
        },
      ],
    };
    return <Line data={bitcoinData} options={options} />;
    
}

export default LineChart
