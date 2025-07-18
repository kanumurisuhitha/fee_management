import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        if (!res.data.feesPaid) {
          alert("You must pay your fees to view the student list.");
          navigate("/pay");
          return;
        }

        const paidRes = await axios.get("http://localhost:5000/api/students/paid/list");
        setStudents(paidRes.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching student data.");
      }
    }

    fetchData();
  }, [studentId, navigate]);

  // ✅ Clean peacock green money-themed background (Unsplash, no watermark)
  const backgroundImage =
    "https://images.unsplash.com/photo-1611392102878-8b35c3ed10c2?fit=crop&w=1480&q=80";

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,105,92,0.85), rgba(0,105,92,0.85)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "30px" }}>
        All Students Who Paid Fees
      </h2>

      {error && (
        <p style={{ color: "red", backgroundColor: "white", padding: "10px" }}>{error}</p>
      )}

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.97)",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "920px",
          margin: "auto",
          overflowX: "auto",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#0f5132",
            fontSize: "16px",
          }}
        >
          <thead style={{ backgroundColor: "#d1e7dd" }}>
            <tr>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Email</th>
              <th style={{ padding: "12px", border: "1px solid #ccc" }}>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu._id}>
                <td style={{ padding: "12px", border: "1px solid #ccc" }}>{stu.name}</td>
                <td style={{ padding: "12px", border: "1px solid #ccc" }}>{stu.email}</td>
                <td style={{ padding: "12px", border: "1px solid #ccc" }}>₹{stu.paymentAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllStudents;
