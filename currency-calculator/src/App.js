import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

      async function fetchConvertion() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Response status : ${res.status}`);
          }
          const json = await res.json();
          // console.log(json);
          setData(json.rates);
        } catch (error) {
          // console.error(error.message);
          setError(error.message);
          setAmount(0);
        } finally {
          setIsLoading(false);
        }
      }
      fetchConvertion();
    },
    [amount, fromCurrency, toCurrency, isLoading]
  );

  return (
    <div>
      <input
        type="number"
        value={amount || ""}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {error ? (
        <p>
          <em>You can't convert money between same currency!</em>{" "}
        </p>
      ) : amount ? (
        <p>{data[toCurrency]}</p>
      ) : (
        ""
      )}
    </div>
  );
}
