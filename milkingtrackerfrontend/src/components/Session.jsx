import { formatTime } from '../utils/formatTime';

const Session = ({ elapsed, isPaused, pauseResume, stopSession, audioRef }) => {
  const handlePauseResume = () => {
    if (audioRef && audioRef.current) {
      if (isPaused) {
        // Resuming - play music
        audioRef.current.play();
      } else {
        // Pausing - stop music
        audioRef.current.pause();
      }
    }
    pauseResume();
  };

  return (
    <div className="session">
      <div className="timer">{formatTime(elapsed)}</div>
      <button onClick={handlePauseResume}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={stopSession}>Stop</button>
    </div>
  );
};

export default Session;