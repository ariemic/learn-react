import { useQuiz } from "../context/QuizContext";

function Progress({ numQuestions, maxPossiblePoints }) {
  const { index, answer, points } = useQuiz();

  return (
    <div>
      <header className="progress">
        <progress
          max={numQuestions}
          value={index + Number(answer !== undefined)}
        ></progress>
        <p>
          Question <strong>{index + 1} </strong> / {numQuestions}
        </p>
        <p>
          <strong>{points}</strong> /{" "}
          {maxPossiblePoints ? maxPossiblePoints : 280}
        </p>
      </header>
    </div>
  );
}

export default Progress;
