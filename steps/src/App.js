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

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              onClickFun={handlePrevious}
              bgColor="#7950f2"
              textColor="#fff"
            >
              <span>👈</span>Previous
            </Button>
            <Button onClickFun={handleNext} bgColor="#7950f2" textColor="#fff">
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
      <div className="close" onClick={() => setIsClose((is) => !is)}>
        &times;
      </div>
    </>
  );
}

function Button({ onClickFun, bgColor, textColor, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClickFun}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3>
      {children}
    </div>
  );
}
