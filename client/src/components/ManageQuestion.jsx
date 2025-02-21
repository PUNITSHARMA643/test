import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    type: "mcq",
    options: ["", "", "", ""],
    shortAnswer: "",
    longAnswer: "",
    correctOption: "",
    marks: 0,
    user: "defaultUser" // Add a default user or fetch the user dynamically
  });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/questions");
        if (res.status === 200) {
          setQuestions(res.data);
        }
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || "Failed to fetch questions");
      }
    };
    fetchQuestions();
  }, []);

  const addQuestion = async () => {
    if (
      newQuestion.title === "" ||
      newQuestion.type === "" ||
      newQuestion.marks === 0 ||
      (newQuestion.type === "mcq" && newQuestion.options.some((opt) => opt === "")) ||
      (newQuestion.type === "mcq" && newQuestion.correctOption === "") ||
      (newQuestion.type === "short" && newQuestion.shortAnswer === "") ||
      (newQuestion.type === "long" && newQuestion.longAnswer === "")
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      if (editingQuestion) {
        const res = await axios({
          url: `http://localhost:3001/api/questions/${editingQuestion._id}`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          data: newQuestion,
        });
        if (res.status === 200) {
          toast.success("Question updated successfully");
          setQuestions(
            questions.map((q) =>
              q._id === editingQuestion._id
                ? { ...newQuestion, _id: q._id, createdAt: q.createdAt }
                : q
            )
          );
          setEditingQuestion(null);
        } else {
          toast.error("Failed to update question");
        }
      } else {
        const res = await axios({
          url: "http://localhost:3001/api/questions",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: newQuestion,
        });
        if (res.status === 201 || res.status === 200) {
          toast.success("Question added successfully");
          setQuestions([
            ...questions,
            {
              ...newQuestion,
              _id: res.data._id,
              createdAt: new Date(),
            },
          ]);
          setNewQuestion({
            title: "",
            type: "mcq",
            options: ["", "", "", ""],
            shortAnswer: "",
            longAnswer: "",
            correctOption: "",
            marks: 0,
            user: "defaultUser" // Reset the user field
          });
        }
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Failed to add/update question");
    }
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion(question);
  };

  const deleteQuestion = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/questions/${id}`);
      if (res.status === 200) {
        toast.success("Question deleted successfully");
        setQuestions(questions.filter((q) => q._id !== id));
      } else {
        toast.error("Failed to delete question");
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Failed to delete question");
    }
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(filter.toLowerCase())
  );

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
          {editingQuestion ? "Update Question" : "Add Question"}
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
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q._id}>
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
              <td style={cellStyle}>{new Date(q.createdAt).toLocaleString()}</td>
              <td style={cellStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => editQuestion(q)}
                >
                  Edit
                </button>
                <button
                  style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
                  onClick={() => deleteQuestion(q._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuestions;