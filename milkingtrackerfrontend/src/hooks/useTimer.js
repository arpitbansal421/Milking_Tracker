import { useState, useRef, useEffect } from 'react';

 const useTimer = () => {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionEnd, setSessionEnd] =useState(null);
  const intervalRef = useRef(null);
  const pauseTimeRef = useRef(0);

  useEffect(() => {
    if (sessionStart && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - sessionStart);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [sessionStart, isPaused]);

  const start = () => {
    const now = Date.now();
    setSessionStart(now);
    setElapsed(0);
    setIsPaused(false);
  };

  const pauseResume = () => {
    if (!isPaused) {
      pauseTimeRef.current = Date.now();
    } else {
      const pauseDuration = Date.now() - pauseTimeRef.current;
      setSessionStart((prev) => prev + pauseDuration);
    }
    setIsPaused((prev) => !prev);
  };

  const stop = () => {
    if (sessionStart) {
      setSessionEnd(Date.now());
    }

    clearInterval(intervalRef.current);
  };

  return { elapsed, isPaused, start,sessionStart,sessionEnd, pauseResume, stop };
};

export default useTimer
