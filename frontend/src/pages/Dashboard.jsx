// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function Dashboard() {
//   const [expenses, setExpenses] = useState([]);

//   const fetchExpenses = async () => {
//     const res = await axios.get(`${API}/expenses`);
//     setExpenses(res.data);
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   return (
//   <div style={{
//     padding: "20px",
//     maxWidth: "800px",
//     margin: "auto"
//   }}>
//     <h2>📋 Dashboard</h2>

//     {expenses.map((exp) => (
//       <div key={exp.id} style={{
//         background: "#fff",
//         padding: "10px",
//         marginBottom: "10px",
//         borderRadius: "8px",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//       }}>
//         {exp.title} - ₹{exp.amount} ({exp.category})
//       </div>
//     ))}
//   </div>
// );
// }

// export default Dashboard;






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

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryMap = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 Finance Dashboard</h2>
        <p>Overview of your expenses</p>
      </div>

      {/* CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Spent</h3>
          <p style={styles.big}>₹{total}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Transactions</h3>
          <p style={styles.big}>{expenses.length}</p>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div style={styles.section}>
        <h3>📁 Category Breakdown</h3>

        {Object.keys(categoryMap).length === 0 && (
          <p>No data available</p>
        )}

        {Object.entries(categoryMap).map(([key, value]) => (
          <div key={key} style={styles.categoryRow}>
            <span>{key}</span>
            <b>₹{value}</b>
          </div>
        ))}
      </div>

      {/* RECENT TRANSACTIONS */}
      <div style={styles.section}>
        <h3>🧾 Recent Transactions</h3>

        {expenses.slice(-5).reverse().map((exp) => (
          <div key={exp.id} style={styles.transaction}>
            <div>
              <b>{exp.title}</b>
              <div style={styles.sub}>{exp.category}</div>
            </div>
            <div style={styles.amount}>₹{exp.amount}</div>
          </div>
        ))}
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
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },

  big: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px"
  },

  section: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  categoryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #eee"
  },

  transaction: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },

  sub: {
    fontSize: "12px",
    color: "#777"
  },

  amount: {
    fontWeight: "bold"
  }
};

export default Dashboard;