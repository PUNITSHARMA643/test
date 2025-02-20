import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

// Navigation Component
const Navigation = ({ setActiveTab }) => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    backgroundColor: "#2c3e50",
    color: "white",
  };

  const navItemStyle = {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  //   login only when token is there
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return (
    <nav style={navStyle}>
      {[
        "Generate Test",
        "Test History",
        "Manage Syllabus",
        "Manage Questions",
      ].map((item) => (
        <div
          key={item}
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#34495e")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          onClick={() => setActiveTab(item)}
        >
          {item}
        </div>
      ))}

      <div
        style={navItemStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#34495e")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        onClick={handleLogout}
      >
        Logout
      </div>
    </nav>
  );
};

// Generate Test Component
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

// Test History Component
const TestHistory = () => {
  const [tests, setTests] = useState([
    {
      id: 1,
      title: "Math Test 1",
      subject: "Mathematics",
      class: "10th",
      createdAt: "2023-06-01T10:00:00Z",
      questionCount: 20,
      duration: 60,
      marks: 100,
      instructions: ["No calculators allowed", "Answer all questions"],
    },
    {
      id: 2,
      title: "Science Test 1",
      subject: "Physics",
      class: "11th",
      createdAt: "2023-06-05T14:00:00Z",
      questionCount: 30,
      duration: 90,
      marks: 150,
      instructions: ["Calculators permitted", "Choose any 25 questions"],
    },
  ]);

  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedTest, setSelectedTest] = useState(null);

  const containerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
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
    cursor: "pointer",
  };

  const buttonStyle = {
    padding: "8px 12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontSize: "14px",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#7f8c8d",
    float: "right",
  };

  useEffect(() => {
    const sortedTests = [...tests].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setTests(sortedTests);
  }, [sortField, sortDirection]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const deleteTest = (id) => {
    setTests(tests.filter((test) => test.id !== id));
  };

  const viewTestDetails = (test) => {
    setSelectedTest(test);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Test History</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle} onClick={() => handleSort("title")}>
              Title
            </th>
            <th style={headerCellStyle} onClick={() => handleSort("subject")}>
              Subject
            </th>
            <th style={headerCellStyle} onClick={() => handleSort("class")}>
              Class
            </th>
            <th style={headerCellStyle} onClick={() => handleSort("createdAt")}>
              Date Created
            </th>
            <th style={headerCellStyle} onClick={() => handleSort("duration")}>
              Duration (min)
            </th>
            <th style={headerCellStyle} onClick={() => handleSort("marks")}>
              Total Marks
            </th>
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id}>
              <td style={cellStyle}>{test.title}</td>
              <td style={cellStyle}>{test.subject}</td>
              <td style={cellStyle}>{test.class}</td>
              <td style={cellStyle}>{formatDate(test.createdAt)}</td>
              <td style={cellStyle}>{test.duration}</td>
              <td style={cellStyle}>{test.marks}</td>
              <td style={cellStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => viewTestDetails(test)}
                >
                  View Details
                </button>
                <button
                  style={deleteButtonStyle}
                  onClick={() => deleteTest(test.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTest && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>{selectedTest.title} Details</h3>
            <p>
              <strong>Subject:</strong> {selectedTest.subject}
            </p>
            <p>
              <strong>Class:</strong> {selectedTest.class}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {formatDate(selectedTest.createdAt)}
            </p>
            <p>
              <strong>Duration:</strong> {selectedTest.duration} minutes
            </p>
            <p>
              <strong>Total Marks:</strong> {selectedTest.marks}
            </p>
            <p>
              <strong>Number of Questions:</strong> {selectedTest.questionCount}
            </p>
            <p>
              <strong>Instructions:</strong>
            </p>
            <ul>
              {selectedTest.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <button
              style={closeButtonStyle}
              onClick={() => setSelectedTest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Manage Syllabus Component

const ManageSyllabus = () => {
  const [syllabuses, setSyllabuses] = useState([
    {
      id: 1,
      title: "Advanced Mathematics",
      numOfChapters: 12,
      chapters: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
      subject: "Mathematics",
      class: "10th",
      createdAt: new Date("2023-06-01T10:00:00Z"),
    },
    {
      id: 2,
      title: "Modern Physics",
      numOfChapters: 10,
      chapters: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"],
      subject: "Physics",
      class: "11th",
      createdAt: new Date("2023-06-05T14:00:00Z"),
    },
  ]);

  const [newSyllabus, setNewSyllabus] = useState({
    title: "",
    numOfChapters: 0,
    chapters: [],
    subject: "",
    className: "",
  });

  // fetch syllabus from server\
  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/syllabus");
        if (res.status === 200) {
          setSyllabuses(res.data);
        }
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    };
    fetchSyllabus();
  }, []);

  const [editingSyllabus, setEditingSyllabus] = useState(null);

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
    backgroundColor: "#2ecc71",
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

  const actionButtonStyle = {
    padding: "8px 12px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontSize: "14px",
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#e74c3c",
  };

  const addSyllabus = async () => {
    if (editingSyllabus) {
      setSyllabuses(
        syllabuses.map((s) =>
          s.id === editingSyllabus.id
            ? { ...newSyllabus, id: s.id, createdAt: s.createdAt }
            : s
        )
      );
      setEditingSyllabus(null);
    } else {
      // validation logic
      if (
        newSyllabus.title === "" ||
        newSyllabus.subject === "" ||
        newSyllabus.class === "" ||
        newSyllabus.numOfChapters === 0 ||
        newSyllabus.chapters.length === 0
      ) {
        toast.error("Please fill all the fields");
      }

      try {
        if (newSyllabus.numOfChapters !== newSyllabus.chapters.length) {
          throw new Error("Number of chapters should match the chapters list");
        }

        const res = await axios({
          url: "http://localhost:3001/api/syllabus",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: newSyllabus,
        });
        if (res.status === 201 || res.status === 200) {
          toast.success("Syllabus added successfully");
          setSyllabuses([
            ...syllabuses,
            {
              ...newSyllabus,
              id: syllabuses.length + 1,
              createdAt: new Date(),
            },
          ]);
          setNewSyllabus({
            title: "",
            numOfChapters: 0,
            chapters: [],
            subject: "",
            className: "",
          });
        }
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    }
  };

  const editSyllabus = (syllabus) => {
    setEditingSyllabus(syllabus);
    setNewSyllabus(syllabus);
  };

  const deleteSyllabus = (id) => {
    setSyllabuses(syllabuses.filter((s) => s.id !== id));
  };

  const handleChaptersChange = (e) => {
    const chaptersArray = e.target.value
      .split(",")
      .map((chapter) => chapter.trim());
    setNewSyllabus({
      ...newSyllabus,
      chapters: chaptersArray,
      numOfChapters: chaptersArray.length,
    });
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Manage Syllabus</h2>
      <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Title"
          value={newSyllabus.title}
          onChange={(e) =>
            setNewSyllabus({ ...newSyllabus, title: e.target.value })
          }
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Subject"
          value={newSyllabus.subject}
          onChange={(e) =>
            setNewSyllabus({ ...newSyllabus, subject: e.target.value })
          }
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Class"
          value={newSyllabus.className}
          onChange={(e) =>
            setNewSyllabus({ ...newSyllabus, className: e.target.value })
          }
        />
        <textarea
          style={{ ...inputStyle, minHeight: "100px" }}
          placeholder="Chapters (comma-separated)"
          value={newSyllabus.chapters.join(", ")}
          onChange={handleChaptersChange}
        />
        <button style={buttonStyle} onClick={addSyllabus}>
          {editingSyllabus ? "Update Syllabus" : "Add Syllabus"}
        </button>
      </form>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Title</th>
            <th style={headerCellStyle}>Subject</th>
            <th style={headerCellStyle}>Class</th>
            <th style={headerCellStyle}>Number of Chapters</th>
            <th style={headerCellStyle}>Chapters</th>
            <th style={headerCellStyle}>Created At</th>
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {syllabuses.length > 0 && syllabuses.map((syllabus) => (
            <tr key={syllabus.id}>
              <td style={cellStyle}>{syllabus.title}</td>
              <td style={cellStyle}>{syllabus.subject}</td>
              <td style={cellStyle}>{syllabus.class}</td>
              <td style={cellStyle}>{syllabus.numOfChapters}</td>
              <td style={cellStyle}>{syllabus.chapters.join(", ")}</td>
              {/* <td style={cellStyle}>{syllabus.createdAt}</td> */}
              <td style={cellStyle}>
                <button
                  style={actionButtonStyle}
                  onClick={() => editSyllabus(syllabus)}
                >
                  Edit
                </button>
                <button
                  style={deleteButtonStyle}
                  onClick={() => deleteSyllabus(syllabus.id)}
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

// Manage Questions Component
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

// Main Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Generate Test");

  const dashboardStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    minHeight: "100vh",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  };

  // check login
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div style={dashboardStyle}>
      <Navigation setActiveTab={setActiveTab} />
      <div style={contentStyle}>
        {activeTab === "Generate Test" && <GenerateTest />}
        {activeTab === "Test History" && <TestHistory />}
        {activeTab === "Manage Syllabus" && <ManageSyllabus />}
        {activeTab === "Manage Questions" && <ManageQuestions />}
      </div>
    </div>
  );
}
