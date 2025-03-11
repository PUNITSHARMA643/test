import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    options: ["", "", "", ""],
    correctOption: "",
    marks: 0,
    user: "defaultUser"
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
      newQuestion.options.some((opt) => opt === "") ||
      newQuestion.correctOption === "" ||
      newQuestion.marks === 0
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
        }
      }
      setNewQuestion({
        title: "",
        options: ["", "", "", ""],
        correctOption: "",
        marks: 0,
        user: "defaultUser"
      });
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
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Failed to delete question");
    }
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(filter.toLowerCase())
  );

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginBottom: "30px",
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #bdc3c7",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#9b59b6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    cell: {
      border: "1px solid #bdc3c7",
      padding: "12px",
      textAlign: "left",
    },
    headerCell: {
      border: "1px solid #bdc3c7",
      padding: "12px",
      textAlign: "left",
      backgroundColor: "#34495e",
      color: "white",
      fontWeight: "bold",
    },
    deleteButton: {
      backgroundColor: "#e74c3c",
      marginLeft: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Questions</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          style={styles.input}
          type="text"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
        />
        {newQuestion.options.map((option, index) => (
          <input
            key={index}
            style={styles.input}
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
          style={styles.input}
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
        <input
          style={styles.input}
          type="number"
          placeholder="Marks"
          value={newQuestion.marks}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) })
          }
        />
        <button style={styles.button} onClick={addQuestion}>
          {editingQuestion ? "Update Question" : "Add Question"}
        </button>
      </form>

      <input
        style={{ ...styles.input, marginBottom: "20px" }}
        type="text"
        placeholder="Filter by question title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Title</th>
            <th style={styles.headerCell}>Options</th>
            <th style={styles.headerCell}>Correct Answer</th>
            <th style={styles.headerCell}>Marks</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q._id}>
              <td style={styles.cell}>{q.title}</td>
              <td style={styles.cell}>{q.options.join(", ")}</td>
              <td style={styles.cell}>{q.correctOption}</td>
              <td style={styles.cell}>{q.marks}</td>
              <td style={styles.cell}>
                <button style={styles.button} onClick={() => editQuestion(q)}>
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
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