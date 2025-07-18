import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${studentId}`
        );
        setStudent(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    if (studentId) fetchStudent();
  }, [studentId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        formData
      );
      setStudent(response.data);
      setEditing(false);
      alert("🎉 Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("❌ Failed to update profile");
    }
  };

  if (!student) return <p style={{ color: "#fff" }}>Loading profile...</p>;

  return (
    <div
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/green-graduation-cap-with-books-and-coins-money-for-college-and-university-savings-investment-education-scholarships-ai-generated-305670786.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          padding: "40px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#34495e", marginBottom: "25px" }}>
          🎓 Student Profile
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>👤 Full Name:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          ) : (
            <p style={textStyle}>{student.name}</p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>📧 Email:</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          ) : (
            <p style={textStyle}>{student.email}</p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>💰 Fees Status:</label>
          <p style={textStyle}>{student.feesPaid ? "✅ Paid" : "❌ Not Paid"}</p>
        </div>

        {student.feesPaid && (
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>💸 Amount Paid:</label>
            <p style={textStyle}>₹{student.paymentAmount}</p>
          </div>
        )}

        {!student.feesPaid && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={() => navigate("/pay")}
              style={buttonStyle("#2ecc71")}
            >
              💳 Pay Fees
            </button>
          </div>
        )}

        {editing ? (
          <div style={{ textAlign: "center" }}>
            <button onClick={handleSave} style={buttonStyle("#2980b9")}>
              💾 Save
            </button>
            <button
              onClick={() => setEditing(false)}
              style={buttonStyle("#e74c3c", "10px")}
            >
              ❌ Cancel
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setEditing(true)}
              style={buttonStyle("#8e44ad")}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "5px",
  fontSize: "15px",
};

const textStyle = {
  marginTop: "8px",
  padding: "10px",
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#2c3e50",
};

const buttonStyle = (bgColor, marginLeft = "0") => ({
  backgroundColor: bgColor,
  color: "#fff",
  padding: "10px 20px",
  margin: "5px",
  marginLeft,
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
});

export default Profile;
