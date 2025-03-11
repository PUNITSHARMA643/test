import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TestHistory = () => {
  const [tests, setTests] = useState([]);
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tests");
        setTests(response.data);
      } catch (error) {
        toast.error("Failed to fetch test history.");
      }
    };
    fetchTests();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tests/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const deleteTest = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tests/${_id}`);
      setTests(tests.filter((test) => test._id !== _id));
      toast.success("Test deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete test.");
    }
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
            <th style={headerCellStyle} onClick={() => handleSort("totalMarks")}>
              Total Marks
            </th>
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test._id}>
              <td style={cellStyle}>{test.title}</td>
              <td style={cellStyle}>{test.subject}</td>
              <td style={cellStyle}>{test.class}</td>
              <td style={cellStyle}>{formatDate(test.createdAt)}</td>
              <td style={cellStyle}>{test.duration}</td>
              <td style={cellStyle}>{test.totalMarks}</td>
              <td style={cellStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => viewTestDetails(test)}
                >
                  View Details
                </button>
                <button
                  style={deleteButtonStyle}
                  onClick={() => deleteTest(test._id)}
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
              <strong>Total Marks:</strong> {selectedTest.totalMarks}
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

      <h2 style={headingStyle}>Test Data Analysis</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalMarks" fill="#8884d8" />
            <Bar dataKey="duration" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TestHistory;