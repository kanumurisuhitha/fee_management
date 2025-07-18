import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <Link to="/profile" style={{ marginRight: "20px" }}>Profile</Link>
      <Link to="/students-paid" style={{ marginRight: "20px" }}>All Students</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
