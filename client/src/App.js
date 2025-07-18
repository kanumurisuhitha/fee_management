import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PayFees from "./pages/PayFees";
import AllStudents from "./pages/AllStudents";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("studentId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("studentId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/pay" element={isLoggedIn ? <PayFees /> : <Navigate to="/login" />} />
        <Route path="/students-paid" element={isLoggedIn ? <AllStudents /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
