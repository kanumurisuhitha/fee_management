import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentForm() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/students/pay/${studentId}`,
        { amount }
      );

      if (res.data.success) {
        alert("Payment successful!");
        navigate("/profile");
      } else {
        alert("Payment failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error occurred.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/money-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#00695c" }}>Pay Your Fees</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#009688",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
