import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== undefined;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option
             ${
               hasAnswered
                 ? index === question.correctOption
                   ? "correct"
                   : "wrong"
                 : ""
             } 
             ${index === answer ? "answer" : ""}
             `}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
