import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./css/TakeTest.css";
import Cookies from "js-cookie";

const TakeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:3001/api/questions", {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setQuestions(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error.response?.data?.message || "Failed to fetch questions");
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ... rest of your component logic (startTimer, handleAnswerChange, etc.) ...

  return (
    <div className="dashboard-content">
      <h2>Take Test</h2>
      <div className="test-container">
        <div className="test-header">
          {!timerStarted && !loading && questions.length > 0 && (
            <div className="timer-setup">
              <label>Set Timer (minutes): </label>
              <input
                type="number"
                min="1"
                max="120"
                onChange={(e) => startTimer(e.target.value)}
                className="timer-input"
              />
            </div>
          )}
          {timerStarted && (
            <div className="timer-display">
              Time Left: {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* ... rest of your component JSX ... */}
      </div>
    </div>
  );
};

export default TakeTest;