const Landing = ({ startMilking, goToHistory }) => {
  return (
    <div className="landing">
      <h1>Milking Tracker</h1>
      <button onClick={startMilking}>Start Milking</button>
      <button onClick={goToHistory}>Milking History</button>
    </div>
  );
};

export default Landing;