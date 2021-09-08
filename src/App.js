
import {useState} from "react"
import DisplayGraph from "./components/DisplayGraph/DisplayGraph";
import InputForm from "./components/InputForm/InputForm"

function App() {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBitcoinData = async (data) => {
    //API call
    const { from, to } = data;
    const startDate = from;
    const endDate = to;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&index=[USD]`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const bpiData = data.bpi;

      const transformedData = {
        labels: Object.keys(bpiData),
        data: Object.values(bpiData),
        // datasets: [
        //   {
        //     label: "Bitcoin Price Graph",
        //     data: Object.values(bpiData),
        //     fill: false,
        //     backgroundColor: "#f7931a",
        //     borderColor: "#f7931a",
        //   },
        // ],
      };

      console.log("the backend data", bpiData);
      console.log("the transformed data", transformedData);
      // console.log("the converted data", newArray);
      setBitcoinData(transformedData);
      console.log("state data", bitcoinData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="App">
      
      <InputForm onConfirm={fetchBitcoinData} />
      <DisplayGraph />
    </div>
  );
}

export default App;
