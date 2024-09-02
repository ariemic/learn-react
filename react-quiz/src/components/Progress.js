function Progress(index, numQuestions) {
  return (
    <div>
      <header className="progress">
        <p>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </p>
      </header>
    </div>
  );
}

export default Progress;
