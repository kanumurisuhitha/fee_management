import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const student = res.data?.student;

      if (student && student._id) {
        localStorage.setItem("studentId", student._id);
        setIsLoggedIn(true);
        navigate("/profile");
      } else {
        setError("User does not exist.");
      }
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 400) {
        setError("User does not exist or invalid credentials.");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#00796b",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#00796b",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  footerText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#00796b",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Login;
