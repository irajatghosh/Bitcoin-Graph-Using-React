import "./App.css";
import { useState, useCallback, Fragment } from "react";
import DisplayGraph from "./components/DisplayGraph/DisplayGraph";
import InputForm from "./components/InputForm/InputForm";

function App() {
  const [bitcoinData, setBitcoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBitcoinData = useCallback(async (data) => {
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
        throw new Error(
          "Something went wrong! Please check the dates and try again."
        );
      }
      const data = await response.json();
      const bpiData = data.bpi;

      const transformedData = {
        labels: Object.keys(bpiData),
        data: Object.values(bpiData),
      };
      setBitcoinData(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <section>
        <InputForm onConfirm={fetchBitcoinData} />
      </section>
      <section>
        {!isLoading && !error && <DisplayGraph coinData={bitcoinData} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && bitcoinData.length === 0 && <p>No data found.</p>}
        {!isLoading && error && (
          <p>{error} - may be data not present. Try another date.</p>
        )}
      </section>
    </Fragment>
  );
}

export default App;
