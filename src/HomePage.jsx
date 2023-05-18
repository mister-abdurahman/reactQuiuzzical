export default function HomePage(props) {
  return (
    <div className="home-page">
      <h1 className="home-title">Quizzical</h1>
      <p className="home-text">
        Play this quiz to see just how much you know !
      </p>
      <button
        className="home-start-btn"
        onClick={() => props.setStartQuiz(true)}
      >
        Start Quiz
      </button>
    </div>
  );
}
