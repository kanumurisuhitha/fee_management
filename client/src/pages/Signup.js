import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.msg || "Signup successful!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.msg);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Signup</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your phone number"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Create a password"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

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
    color: "#333",
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

export default Signup;
