import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get(`${API}/expenses`);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
  <div style={{
    padding: "20px",
    maxWidth: "800px",
    margin: "auto"
  }}>
    <h2>📋 Dashboard</h2>

    {expenses.map((exp) => (
      <div key={exp.id} style={{
        background: "#fff",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        {exp.title} - ₹{exp.amount} ({exp.category})
      </div>
    ))}
  </div>
);
}

export default Dashboard;