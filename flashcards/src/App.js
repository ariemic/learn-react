import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [activeCardId, setActiveCardId] = useState(null);

  function handleCardClick(id) {
    setActiveCardId((prevId) => (prevId === id ? null : id));
  }

  return (
    <div className="flashcards">
      {questions.map((card) => (
        <FlashCard
          card={card}
          isActive={card.id === activeCardId}
          clickFun={() => handleCardClick(card.id)}
          key={card.id}
        ></FlashCard>
      ))}
    </div>
  );
}

function FlashCard({ card, isActive, clickFun }) {
  return (
    <div className={isActive ? "selected" : ""} onClick={clickFun}>
      {isActive ? card.answer : card.question}
    </div>
  );
}

// Działanie na poziomie jednej karty czyli kazda karta moze odwrocona niezależnie od innych

// function FlashCard({ card }) {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div
//       className={isActive ? "selected" : ""}
//       onClick={() => setIsActive(!isActive)}
//     >
//       {isActive ? card.answer : card.question}
//     </div>
//   );
// }
