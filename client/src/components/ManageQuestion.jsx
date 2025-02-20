import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Basic Addition",
      type: "mcq",
      options: ["3", "4", "5", "6"],
      correctOption: "4",
      marks: 1,
      createdAt: new Date("2023-06-01T10:00:00Z"),
    },
    {
      id: 2,
      title: "Photosynthesis Explanation",
      type: "short",
      shortAnswer:
        "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar.",
      marks: 5,
      createdAt: new Date("2023-06-02T14:00:00Z"),
    },
    {
      id: 3,
      title: "Essay on Climate Change",
      type: "long",
      longAnswer:
        "Climate change is a long-term change in the average weather patterns that have come to define Earth's local, regional and global climates...",
      marks: 10,
      createdAt: new Date("2023-06-03T09:00:00Z"),
    },
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    type: "mcq",
    options: ["", "", "", ""],
    shortAnswer: "",
    longAnswer: "",
    correctOption: "",
    marks: 0,
  });

  const [filter, setFilter] = useState("");

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #bdc3c7",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const cellStyle = {
    border: "1px solid #bdc3c7",
    padding: "12px",
    textAlign: "left",
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "#34495e",
    color: "white",
    fontWeight: "bold",
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { ...newQuestion, id: questions.length + 1, createdAt: new Date() },
    ]);
    setNewQuestion({
      title: "",
      type: "mcq",
      options: ["", "", "", ""],
      shortAnswer: "",
      longAnswer: "",
      correctOption: "",
      marks: 0,
    });
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Manage Questions</h2>
      <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
        />
        <select
          style={inputStyle}
          value={newQuestion.type}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, type: e.target.value })
          }
        >
          <option value="mcq">Multiple Choice</option>
          <option value="short">Short Answer</option>
          <option value="long">Long Answer</option>
        </select>
        {newQuestion.type === "mcq" && (
          <>
            {newQuestion.options.map((option, index) => (
              <input
                key={index}
                style={inputStyle}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuestion.options];
                  newOptions[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: newOptions });
                }}
              />
            ))}
            <input
              style={inputStyle}
              type="text"
              placeholder="Correct Option"
              value={newQuestion.correctOption}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  correctOption: e.target.value,
                })
              }
            />
          </>
        )}
        {newQuestion.type === "short" && (
          <textarea
            style={{ ...inputStyle, minHeight: "100px" }}
            placeholder="Short Answer"
            value={newQuestion.shortAnswer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, shortAnswer: e.target.value })
            }
          />
        )}
        {newQuestion.type === "long" && (
          <textarea
            style={{ ...inputStyle, minHeight: "150px" }}
            placeholder="Long Answer"
            value={newQuestion.longAnswer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, longAnswer: e.target.value })
            }
          />
        )}
        <input
          style={inputStyle}
          type="number"
          placeholder="Marks"
          value={newQuestion.marks}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) })
          }
        />
        <button style={buttonStyle} onClick={addQuestion}>
          Add Question
        </button>
      </form>
      <input
        style={{ ...inputStyle, marginTop: "20px", marginBottom: "20px" }}
        type="text"
        placeholder="Filter by question title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Title</th>
            <th style={headerCellStyle}>Type</th>
            <th style={headerCellStyle}>Answer/Options</th>
            <th style={headerCellStyle}>Marks</th>
            <th style={headerCellStyle}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q.id}>
              <td style={cellStyle}>{q.title}</td>
              <td style={cellStyle}>{q.type}</td>
              <td style={cellStyle}>
                {q.type === "mcq"
                  ? `${q.options.join(", ")} (Correct: ${q.correctOption})`
                  : q.type === "short"
                  ? q.shortAnswer
                  : q.longAnswer}
              </td>
              <td style={cellStyle}>{q.marks}</td>
              <td style={cellStyle}>{q.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuestions;