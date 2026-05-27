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

  if (!aiData) return <p>Loading AI...</p>;

  const labels = Object.keys(aiData.category_breakdown);
  const values = Object.values(aiData.category_breakdown);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"]
      }
    ]
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      
      <h2>🤖 AI Insights Dashboard</h2>

      {/* Summary Card */}
      <div style={{
        padding: "15px",
        background: "#f5f5f5",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3>Total Expense: ₹{aiData.total_expense}</h3>
        <p>{aiData.ai_suggestion}</p>
      </div>

      {/* Chart Card */}
      <div style={{
        padding: "15px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3>Category Breakdown</h3>
        <Pie data={data} />
      </div>

    </div>
  );
}

export default AIInsights;