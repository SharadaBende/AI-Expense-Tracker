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

function Analytics() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`${API}/ai-summary`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <div style={styles.loading}>
        Loading analytics...
      </div>
    );
  }

  const labels = Object.keys(data.category_breakdown || {});
  const values = Object.values(data.category_breakdown || {});

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#4f46e5",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4"
        ]
      }
    ]
  };

  const topCategory = labels.reduce((a, b) =>
    (data.category_breakdown[a] || 0) > (data.category_breakdown[b] || 0)
      ? a
      : b
  , labels[0] || "None");

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 Analytics</h2>
        <p>Understand your spending pattern</p>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Spending</h3>
          <p style={styles.big}>₹{data.total_expense}</p>
        </div>

        <div style={styles.card}>
          <h3>Top Category</h3>
          <p style={styles.big}>{topCategory}</p>
        </div>
      </div>

      {/* AI INSIGHT */}
      <div style={styles.insight}>
        🤖 {data.ai_suggestion}
      </div>

      {/* CHART */}
      <div style={styles.chartBox}>
        <h3>Category Breakdown</h3>
        <Pie data={chartData} />
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial",
    background: "#f5f7fb",
    minHeight: "100vh"
  },

  header: {
    marginBottom: "20px"
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginBottom: "15px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  big: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "10px"
  },

  insight: {
    background: "#e0e7ff",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    fontSize: "14px"
  },

  chartBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },

  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "16px"
  }
};

export default Analytics;