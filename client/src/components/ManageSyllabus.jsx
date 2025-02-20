import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    if (
      newSyllabus.title === "" ||
      newSyllabus.subject === "" ||
      newSyllabus.class === "" ||
      newSyllabus.numOfChapters === 0 ||
      newSyllabus.chapters.length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (newSyllabus.numOfChapters !== newSyllabus.chapters.length) {
      toast.error("Number of chapters should match the chapters list");
      return;
    }
    try {
      if (editingSyllabus) {
        const res = await axios({
          url: `http://localhost:3001/api/syllabus/${editingSyllabus._id}`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          data: newSyllabus,
        });
        if (res.status === 200) {
          toast.success("Syllabus updated successfully");
          setSyllabuses(
            syllabuses.map((s) =>
              s.id === editingSyllabus.id
                ? { ...newSyllabus, id: s.id, createdAt: s.createdAt }
                : s
            )
          );
          setEditingSyllabus(null);
        } else {
          toast.error("Failed to update syllabus");
        }
      } else {
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
      }
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const editSyllabus = (syllabus) => {
    setEditingSyllabus(syllabus);
    setNewSyllabus(syllabus);
  };

  const deleteSyllabus = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/syllabus/${id}`
      );
      if (res.status === 200) {
        toast.success("Syllabus deleted successfully");
        setSyllabuses(syllabuses.filter((s) => s._id !== id));
      } else {
        toast.error("Failed to delete syllabus");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
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
          {syllabuses.length > 0 &&
            syllabuses.map((syllabus) => (
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
                    onClick={() => deleteSyllabus(syllabus._id)}
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

export default ManageSyllabus;
