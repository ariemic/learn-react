import { useState } from "react";

// after you click "Next" btn next numbers are colored
// prevous go back and uncolor numbers
// x btn to close the modal

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isClose, setIsClose] = useState(false);

  function handlePrevious() {
    setStep((step) => Math.max(step - 1, 1));
  }

  function handleNext() {
    setStep((step) => Math.min(step + 1, 3));
  }

  return (
    <>
      {!isClose && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <div className="close" onClick={() => setIsClose((is) => !is)}>
        &times;
      </div>
    </>
  );
}
