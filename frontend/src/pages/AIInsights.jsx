import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = "http://127.0.0.1:8000";

function AIInsights() {
  const [aiData, setAiData] = useState(null);

  const fetchAI = async () => {
    const res = await axios.get(`${API}/ai-summary`);
    setAiData(res.data);
  };

  useEffect(() => {
    fetchAI();
  }, []);

  if (!aiData) return <p>Loading...</p>;

  const labels = Object.keys(aiData.category_breakdown);
  const values = Object.values(aiData.category_breakdown);

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"]
      }
    ]
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🤖 AI Insights Dashboard</h2>

      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3>Total: ₹{aiData.total_expense}</h3>
        <p>{aiData.ai_suggestion}</p>
      </div>

      <div style={{
        marginTop: "20px",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3>Expense Breakdown</h3>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AIInsights;