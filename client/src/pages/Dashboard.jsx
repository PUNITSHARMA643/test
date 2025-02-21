import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GenerateTest from "../components/GenerateTest";
import TestHistory from "../components/TestHistory";
import ManageSyllabus from "../components/ManageSyllabus";
import ManageQuestions from "../components/ManageQuestion";


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
