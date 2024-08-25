import { useState } from "react";

export default function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function handleCount(increment) {
    setCount((count) => count + increment);
  }

  function handleClick() {
    setCount(0);
    setStep(1);
  }

  return (
    <div className="container">
      <input
        type="range"
        min="1"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <label for="step">Step: {step}</label>
      <div className="btnBox">
        <button onClick={() => handleCount(-step)}>&minus;</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => handleCount(step)}>+</button>
      </div>
      <p>
        {count} days from today is{" "}
        {new Date(
          new Date().getTime() + count * 24 * 60 * 60 * 1000
        ).toLocaleDateString()}
      </p>
      {count !== 0 || step !== 1 ? (
        <button onClick={handleClick}>Reset</button>
      ) : null}
    </div>
  );
}

// function OldCounter() {
//   const [step, setStep] = useState(0);
//   const [count, setCount] = useState(0);

//   function handleCount(increment) {
//     setCount((count) => count + increment);
//   }

//   return (
//     <div className="container">
//       <div className="btnBox">
//         <button onClick={() => setStep((s) => s - 1)}>&minus;</button>
//         <p>Step: {step}</p>
//         <button onClick={() => setStep((s) => s + 1)}>+</button>
//       </div>
//       <div className="btnBox">
//         <button onClick={() => handleCount(-step)}>&minus;</button>
//         <p>Count: {count}</p>
//         <button onClick={() => handleCount(step)}>+</button>
//       </div>
//       <p>
//         {count} days from today is{" "}
//         {new Date(
//           new Date().getTime() + count * 24 * 60 * 60 * 1000
//         ).toLocaleDateString()}
//       </p>
//     </div>
//   );
// }
