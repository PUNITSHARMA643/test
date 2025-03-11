import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GenerateTest from "../components/GenerateTest";
import TestHistory from "../components/TestHistory";
import ManageSyllabus from "../components/ManageSyllabus";
import ManageQuestions from "../components/ManageQuestion";
import TakeTest from "../components/TakeTest";
import "./Dashboard.css";

const Navigation = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-items">
        <button 
          className={`nav-item ${activeTab === "take-test" ? "active" : ""}`}
          onClick={() => setActiveTab("take-test")}
        >
          Take Test
        </button>
        <button 
          className={`nav-item ${activeTab === "generate" ? "active" : ""}`}
          onClick={() => setActiveTab("generate")}
        >
          Generate Test
        </button>
        <button 
          className={`nav-item ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Test History
        </button>
        <button 
          className={`nav-item ${activeTab === "syllabus" ? "active" : ""}`}
          onClick={() => setActiveTab("syllabus")}
        >
          Manage Syllabus
        </button>
        <button 
          className={`nav-item ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Manage Questions
        </button>
        <button 
          className="nav-item logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("take-test");

  const renderContent = () => {
    switch (activeTab) {
      case "take-test":
        return <TakeTest />;
      case "generate":
        return <GenerateTest />;
      case "history":
        return <TestHistory />;
      case "syllabus":
        return <ManageSyllabus />;
      case "questions":
        return <ManageQuestions />;
      default:
        return <TakeTest />;
    }
  };

  return (
    <div className="dashboard">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;