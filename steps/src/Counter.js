import { useState } from "react";

export default function Counter() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  // const [date, setDate] = useState(0);

  function handleCount(increment) {
    setCount((count) => count + increment);
  }

  return (
    <div className="container">
      <div className="btnBox">
        <button onClick={() => setStep((s) => s - 1)}>&minus;</button>
        <p>Step: {step}</p>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div className="btnBox">
        <button onClick={() => handleCount(-step)}>&minus;</button>
        <p>Count: {count}</p>
        <button onClick={() => handleCount(step)}>+</button>
      </div>
      <p>
        {count} days from today is{" "}
        {new Date(
          new Date().getTime() + count * 24 * 60 * 60 * 1000
        ).toLocaleDateString()}
      </p>
    </div>
  );
}
