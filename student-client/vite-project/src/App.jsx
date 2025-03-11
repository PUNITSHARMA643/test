import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./components/Auth";
import TakeTest from "./components/TakeTest";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route 
          path="/take-test" 
          element={
            <ProtectedRoute>
              <TakeTest />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;