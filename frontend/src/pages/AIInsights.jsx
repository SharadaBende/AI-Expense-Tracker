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
  const [loading, setLoading] = useState(true);

  const fetchAI = async () => {
    try {
      // ✅ Using REAL AI endpoint (Ollama chat)
      const res = await axios.get(
        `${API}/ai-chat?prompt=Analyze my spending and give financial advice`
      );

      console.log("AI RESPONSE:", res.data);
      setAiData(res.data);
    } catch (err) {
      console.log("AI ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAI();
  }, []);

  if (loading) return <p>Loading AI Insights...</p>;

  if (!aiData?.reply) return <p>AI response not available</p>;

  // fallback dummy chart (since ai-chat does not return breakdown)
  const data = {
    labels: ["Food", "Travel", "Shopping"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"]
      }
    ]
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      
      <h2>🤖 AI Insights Dashboard</h2>

      {/* AI RESPONSE CARD */}
      <div
        style={{
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <h3>AI Financial Advice</h3>
        <p style={{ lineHeight: "1.6" }}>{aiData.reply}</p>
      </div>

      {/* CHART */}
      <div
        style={{
          padding: "15px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <h3>Spending Overview</h3>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default AIInsights;