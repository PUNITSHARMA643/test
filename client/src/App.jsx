import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import GoogleAuthSuccess from "./components/GoogleAuthSuccess";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            top: "50px",
            zIndex: 999,
          },
        }}
        richcolors
      />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;