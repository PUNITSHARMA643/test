import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./css/TakeTest.css";
import Cookies from "js-cookie";

const TakeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [takeTestId, setTakeTestId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

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
      startTest(response.data[0]?.testId);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error.response?.data?.message || "Failed to fetch questions");
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const startTest = async (testId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:3001/api/take-test/start",
        { 
          testId: testId || "default-test"
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setTakeTestId(response.data.takeTestId);
    } catch (error) {
      console.error("Error starting test:", error);
      toast.error("Failed to start test");
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!takeTestId) {
      toast.error("Test not started properly");
      return;
    }
    try {
      const token = Cookies.get("token");
      const submitResponse = await axios.post(
        "http://localhost:3001/api/take-test/submit",
        { 
          takeTestId,
          answers 
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      setSubmitted(true);
      toast.success(`Test submitted successfully! Your score: ${submitResponse.data.score}`);
      
      const results = await axios.get(
        `http://localhost:3001/api/take-test/results/${takeTestId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setTestResults(results.data);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Failed to submit test");
    }
  };

  return (
    <div className="dashboard-content">
      <div className="test-container">
        <div className="test-header">
          <h2>Take Test</h2>
        </div>

        {loading ? (
          <div className="loading-message">
            <p>Loading questions...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : questions.length > 0 && !submitted ? (
          <form onSubmit={handleSubmit} className="test-form">
            <div className="question-card">
              <p className="question-counter">
                {currentQuestion + 1} / {questions.length}
              </p>
              <h4 className="question-title" data-bilingual="true">
                <span>{questions[currentQuestion].title}</span>
                {questions[currentQuestion].titleHindi && (
                  <span>{questions[currentQuestion].titleHindi}</span>
                )}
              </h4>
              <div className="options-grid">
                {questions[currentQuestion].options.map((option, index) => (
                  <label key={index} className="option-label">
                    <input
                      type="radio"
                      name={questions[currentQuestion]._id}
                      value={option}
                      checked={answers[questions[currentQuestion]._id] === option}
                      onChange={() => handleAnswerChange(questions[currentQuestion]._id, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              
              <div className="question-navigation">
                <button 
                  type="button"
                  className="prev-button"
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="next-button"
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={submitted}
            >
              Submit Test
            </button>
          </form>
        ) : null}
        
        {submitted && testResults && (
          <div className="test-results">
            <h3>Test Results</h3>
            <div className="results-summary">
              <p className="total-score">Total Score: {testResults.score}</p>
              <p className="total-questions">Questions Attempted: {testResults.totalQuestions}</p>
            </div>
            
            <div className="answers-review">
              {questions.map((question) => {
                const result = testResults.answerResults[question._id];
                return (
                  <div key={question._id} className={`question-review ${result?.isCorrect ? 'correct' : 'incorrect'}`}>
                    <h4>{question.title}</h4>
                    <p className="user-answer">Your Answer: {result?.userAnswer || 'Not answered'}</p>
                    <p className="correct-answer">Correct Answer: {result?.correctAnswer}</p>
                    <p className="marks">Marks: {result?.marks || 0}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {!loading && questions.length === 0 && (
          <div className="no-questions">
            <p>No questions available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTest;