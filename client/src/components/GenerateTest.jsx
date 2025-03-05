import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const GenerateTest = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [duration, setDuration] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [editingTest, setEditingTest] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const testData = {
        title,
        subject,
        class: className,
        duration,
        totalMarks,
        instructions,
      };

      if (editingTest) {
        const response = await axios.put(`http://localhost:3001/api/tests/${editingTest._id}`, testData);
        if (response.status === 200) {
          toast.success("Test updated successfully!");
          setEditingTest(null);
        } else {
          toast.error("Failed to update test.");
        }
      } else {
        const response = await axios.post("http://localhost:3001/api/tests", testData);
        if (response.status === 201 || response.status === 200) {
          toast.success("Test generated successfully!");
        } else {
          toast.error("Failed to generate test.");
        }
      }
    } catch (error) {
      toast.error("Failed to generate/update test.");
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

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Generate Test</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="title" style={labelStyle}>
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>
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
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="className" style={labelStyle}>
            Class
          </label>
          <input
            id="className"
            type="text"
            placeholder="Enter the class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="duration" style={labelStyle}>
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Enter the duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="totalMarks" style={labelStyle}>
            Total Marks
          </label>
          <input
            id="totalMarks"
            type="number"
            placeholder="Enter the total marks"
            value={totalMarks}
            onChange={(e) => setTotalMarks(parseInt(e.target.value) || 0)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="instructions" style={labelStyle}>
            Instructions
          </label>
          <input
            id="instructions"
            type="text"
            placeholder="Enter instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
        >
          {editingTest ? "Update Test" : "Generate Test"}
        </button>
      </form>
    </div>
  );
};

export default GenerateTest;