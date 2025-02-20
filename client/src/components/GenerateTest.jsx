import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const GenerateTest = () => {
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [mcqCount, setMcqCount] = useState(0);
  const [shortCount, setShortCount] = useState(0);
  const [longCount, setLongCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [sumQuestions, setSumQuestions] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const sum = mcqCount + shortCount + longCount;
    setSumQuestions(sum);
    setIsValid(sum <= numQuestions && sum > 0 && numQuestions > 0);
  }, [mcqCount, shortCount, longCount, numQuestions]);

  const handleSubmit = () => {
    e.preventDefault();
    if (isValid) {
      console.log("Generating test...");
      // Add your test generation logic here
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#34495e",
  };

  const inputStyle = {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #bdc3c7",
    borderRadius: "6px",
    transition: "border-color 0.3s",
  };

  const activeInputStyle = {
    ...inputStyle,
    borderColor: "#3498db",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.25)",
  };

  const buttonStyle = {
    padding: "14px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#95a5a6",
    cursor: "not-allowed",
  };

  const sumStyle = {
    fontSize: "16px",
    color: "#7f8c8d",
    marginTop: "15px",
    textAlign: "center",
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  };

  const [focusedInput, setFocusedInput] = useState("");

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Generate Test</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="subject" style={labelStyle}>
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Enter the subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={focusedInput === "subject" ? activeInputStyle : inputStyle}
            onFocus={() => setFocusedInput("subject")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="numQuestions" style={labelStyle}>
            Total Number of Questions
          </label>
          <input
            id="numQuestions"
            type="number"
            placeholder="Enter total questions"
            value={numQuestions || ""}
            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 0)}
            style={
              focusedInput === "numQuestions" ? activeInputStyle : inputStyle
            }
            onFocus={() => setFocusedInput("numQuestions")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="mcqCount" style={labelStyle}>
            Number of MCQs
          </label>
          <input
            id="mcqCount"
            type="number"
            placeholder="Enter MCQ count"
            value={mcqCount || ""}
            onChange={(e) => setMcqCount(parseInt(e.target.value) || 0)}
            style={focusedInput === "mcqCount" ? activeInputStyle : inputStyle}
            onFocus={() => setFocusedInput("mcqCount")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="shortCount" style={labelStyle}>
            Number of Short Questions
          </label>
          <input
            id="shortCount"
            type="number"
            placeholder="Enter short question count"
            value={shortCount || ""}
            onChange={(e) => setShortCount(parseInt(e.target.value) || 0)}
            style={
              focusedInput === "shortCount" ? activeInputStyle : inputStyle
            }
            onFocus={() => setFocusedInput("shortCount")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="longCount" style={labelStyle}>
            Number of Long Questions
          </label>
          <input
            id="longCount"
            type="number"
            placeholder="Enter long question count"
            value={longCount || ""}
            onChange={(e) => setLongCount(parseInt(e.target.value) || 0)}
            style={focusedInput === "longCount" ? activeInputStyle : inputStyle}
            onFocus={() => setFocusedInput("longCount")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="duration" style={labelStyle}>
            Duration
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Enter duration in minutes"
            value={duration || ""}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            style={focusedInput === "duration" ? activeInputStyle : inputStyle}
            onFocus={() => setFocusedInput("duration")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="instructions" style={labelStyle}>
            Instructions
          </label>
          <input
            id="instructions"
            type="text"
            placeholder="Enter instructions comma saparated"
            value={instructions || ""}
            onChange={(e) => setInstructions(e.target.value)}
            style={
              focusedInput === "instructions" ? activeInputStyle : inputStyle
            }
            onFocus={() => setFocusedInput("instructions")}
            onBlur={() => setFocusedInput("")}
          />
        </div>
        <p style={sumStyle}>
          Sum of Questions: <strong>{sumQuestions}</strong> /{" "}
          <strong>{numQuestions}</strong>
        </p>
        {!isValid && sumQuestions > 0 && (
          <p style={errorStyle}>
            The sum of question types should not exceed the total number of
            questions.
          </p>
        )}
        <button
          type="submit"
          disabled={!isValid}
          style={isValid ? buttonStyle : disabledButtonStyle}
        >
          Generate Test
        </button>
      </form>
    </div>
  );
};

export default GenerateTest;
