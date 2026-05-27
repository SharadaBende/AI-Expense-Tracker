// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const API = "http://127.0.0.1:8000";

// function Analytics() {
//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     const res = await axios.get(`${API}/ai-summary`);
//     setData(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (!data) {
//     return (
//       <div style={styles.loading}>
//         Loading analytics...
//       </div>
//     );
//   }

//   const labels = Object.keys(data.category_breakdown || {});
//   const values = Object.values(data.category_breakdown || {});

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         data: values,
//         backgroundColor: [
//           "#4f46e5",
//           "#22c55e",
//           "#f59e0b",
//           "#ef4444",
//           "#06b6d4"
//         ]
//       }
//     ]
//   };

//   const topCategory = labels.reduce((a, b) =>
//     (data.category_breakdown[a] || 0) > (data.category_breakdown[b] || 0)
//       ? a
//       : b
//   , labels[0] || "None");

//   return (
//     <div style={styles.page}>

//       {/* HEADER */}
//       <div style={styles.header}>
//         <h2>📊 Analytics</h2>
//         <p>Understand your spending pattern</p>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div style={styles.cards}>
//         <div style={styles.card}>
//           <h3>Total Spending</h3>
//           <p style={styles.big}>₹{data.total_expense}</p>
//         </div>

//         <div style={styles.card}>
//           <h3>Top Category</h3>
//           <p style={styles.big}>{topCategory}</p>
//         </div>
//       </div>

//       {/* AI INSIGHT */}
//       <div style={styles.insight}>
//         🤖 {data.ai_suggestion}
//       </div>

//       {/* CHART */}
//       <div style={styles.chartBox}>
//         <h3>Category Breakdown</h3>
//         <Pie data={chartData} />
//       </div>

//     </div>
//   );
// }

// const styles = {
//   page: {
//     padding: "20px",
//     maxWidth: "900px",
//     margin: "auto",
//     fontFamily: "Arial",
//     background: "#f5f7fb",
//     minHeight: "100vh"
//   },

//   header: {
//     marginBottom: "20px"
//   },

//   cards: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "15px",
//     marginBottom: "15px"
//   },

//   card: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
//   },

//   big: {
//     fontSize: "22px",
//     fontWeight: "bold",
//     marginTop: "10px"
//   },

//   insight: {
//     background: "#e0e7ff",
//     padding: "12px",
//     borderRadius: "10px",
//     marginBottom: "15px",
//     fontSize: "14px"
//   },

//   chartBox: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
//   },

//   loading: {
//     textAlign: "center",
//     padding: "40px",
//     fontSize: "16px"
//   }
// };

// export default Analytics;

























import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const API = "http://127.0.0.1:8000";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444"
];

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API}/ai-summary`);

      const breakdown = res.data.category_breakdown;

      const formatted = Object.keys(breakdown).map((key) => ({
        name: key,
        value: breakdown[key]
      }));

      setData(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Expense Analytics</h1>
        <p style={styles.subtitle}>
          Visual overview of your spending
        </p>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        
        <h2 style={styles.chartTitle}>
          Spending Breakdown
        </h2>

        {/* RESPONSIVE CHART */}
        <div style={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "20px",
    boxSizing: "border-box"
  },

  header: {
    textAlign: "center",
    marginBottom: "25px"
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#111827"
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "15px"
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    margin: "auto",
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxSizing: "border-box",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
  },

  chartTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#111827"
  },

  chartWrapper: {
    width: "100%",
    height: "300px"
  }
};

export default Analytics;