function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcom to The React Quiz!</h2>
      <h3>{numQuestions} question to test your knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start
      </button>
    </div>
  );
}

export default StartScreen;
