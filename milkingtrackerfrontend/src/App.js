import React, { useState, useEffect, useRef } from "react";
import Landing from "./components/Landing";
import Session from "./components/Session";
import StopPrompt from "./components/StopPrompt";
import History from "./components/History";
import useTimer from "./hooks/useTimer";
import Login from "./components/Login";
import { getHistory } from "./services/storage";
import { sendDataToServer } from "./API/api";
import "./App.css";

function App() {
  const [page, setPage] = useState("landing");
  const [history, setHistory] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const audioRef = useRef(null);

  const {
    elapsed,
    isPaused,
    start,
    sessionStart,
    sessionEnd,
    pauseResume,
    stop,
  } = useTimer();

useEffect(() => {
  if (isLoggedIn) {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data || []); // safe fallback
      } catch (error) {
        console.error(error);
        setHistory([]); // prevent crash
      }
    };

    fetchHistory(); // correct place
  }
}, [isLoggedIn]);

// Fetch history when navigating to history page
useEffect(() => {
  if (isLoggedIn && page === "history") {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data || []);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory([]);
      }
    };

    fetchHistory();
  }
}, [page, isLoggedIn]);

  const startMilking = () => {
    start();
    setPage("session");
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopSession = () => {
    stop();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPage("stopPrompt");
  };

  const saveSessionHandler = async () => {
    if (!sessionStart) {
      console.error("Cannot save session: sessionStart is missing");
      return;
    }

    const newEntry = {
      quantity: parseFloat(quantity) || 0,
      startTime: Math.floor(sessionStart / 1000),
      endTime: Math.floor((sessionEnd || Date.now()) / 1000),
      duration: Math.floor((typeof elapsed === "number" ? elapsed : 0) / 1000),
    };

    try {
      await sendDataToServer(newEntry);
      const updatedHistory = await getHistory();
      setHistory(updatedHistory || []);
    } catch (error) {
      console.error(error);
    }

    setPage("landing");
    setQuantity("");
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="App">
      <audio ref={audioRef} src="/music.mp3" loop />

      {page === "landing" && (
        <Landing
          startMilking={startMilking}
          goToHistory={() => setPage("history")}
        />
      )}

      {page === "session" && (
        <Session
          elapsed={elapsed}
          isPaused={isPaused}
          pauseResume={pauseResume}
          stopSession={stopSession}
          audioRef={audioRef}
        />
      )}

      {page === "stopPrompt" && (
        <StopPrompt
          elapsed={elapsed}
          quantity={quantity}
          setQuantity={setQuantity}
          saveSession={saveSessionHandler}
        />
      )}

      {page === "history" && (
        <History
          history={history}
          goBack={() => setPage("landing")}
        />
      )}
    </div>
  );
}

export default App;