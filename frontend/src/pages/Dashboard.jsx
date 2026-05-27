
// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function Dashboard() {

//   const [expenses, setExpenses] = useState([]);

//   // FETCH DATA
//   const fetchExpenses = async () => {

//     try {

//       const res = await axios.get(`${API}/expenses`);

//       setExpenses(res.data);

//     } catch (err) {

//       console.log(err);

//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   // TOTAL
//   const total = expenses.reduce(
//     (sum, e) => sum + e.amount,
//     0
//   );

//   // CATEGORY BREAKDOWN
//   const categoryMap = expenses.reduce((acc, e) => {

//     if (!e.category || !e.category.trim()) {
//       return acc;
//     }

//     acc[e.category] =
//       (acc[e.category] || 0) + e.amount;

//     return acc;

//   }, {});

//   return (

//     <div style={styles.page}>

//       {/* HERO */}
//       <div style={styles.hero}>

//         <div>

//           <div style={styles.smallText}>
//             Welcome Back 👋
//           </div>

//           <h1 style={styles.heroTitle}>
//             Finance Dashboard
//           </h1>

//           <p style={styles.heroSub}>
//             Monitor your expenses and financial activity
//           </p>

//         </div>

//       </div>

//       {/* STATS */}
//       <div style={styles.statsGrid}>

//         {/* TOTAL */}
//         <div style={{
//           ...styles.statCard,
//           background:
//             "linear-gradient(135deg,#4f46e5,#6366f1)"
//         }}>

//           <div style={styles.statLabel}>
//             Total Expenses
//           </div>

//           <div style={styles.statValue}>
//             ₹{total}
//           </div>

//         </div>

//         {/* TRANSACTIONS */}
//         <div style={{
//           ...styles.statCard,
//           background:
//             "linear-gradient(135deg,#0f172a,#1e293b)"
//         }}>

//           <div style={styles.statLabel}>
//             Transactions
//           </div>

//           <div style={styles.statValue}>
//             {expenses.length}
//           </div>

//         </div>

//       </div>

//       {/* MAIN GRID */}
//       <div style={styles.mainGrid}>

//         {/* CATEGORY CARD */}
//         <div style={styles.card}>

//           <div style={styles.cardTitle}>
//             📁 Category Breakdown
//           </div>

//           {Object.keys(categoryMap).length === 0 ? (

//             <div style={styles.empty}>
//               No categories yet
//             </div>

//           ) : (

//             Object.entries(categoryMap).map(
//               ([key, value]) => (

//                 <div
//                   key={key}
//                   style={styles.categoryRow}
//                 >

//                   <div>

//                     <div style={styles.categoryName}>
//                       {key}
//                     </div>

//                     <div style={styles.categorySub}>
//                       Expense Category
//                     </div>

//                   </div>

//                   <div style={styles.categoryAmount}>
//                     ₹{value}
//                   </div>

//                 </div>

//               )
//             )

//           )}

//         </div>

//         {/* RECENT TRANSACTIONS */}
//         <div style={styles.card}>

//           <div style={styles.cardTitle}>
//             🧾 Recent Transactions
//           </div>

//           {expenses.length === 0 ? (

//             <div style={styles.empty}>
//               No transactions available
//             </div>

//           ) : (

//             expenses
//               .slice(-6)
//               .reverse()
//               .map((exp) => (

//                 <div
//                   key={exp.id}
//                   style={styles.transaction}
//                 >

//                   <div>

//                     <div style={styles.transactionTitle}>
//                       {exp.title}
//                     </div>

//                     <div style={styles.transactionCategory}>
//                       {exp.category}
//                     </div>

//                   </div>

//                   <div style={styles.transactionAmount}>
//                     ₹{exp.amount}
//                   </div>

//                 </div>

//               ))

//           )}

//         </div>

//       </div>

//     </div>

//   );
// }

// // STYLES
// const styles = {

//   page: {
//     minHeight: "100vh",
//     background: "#f1f5f9",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     boxSizing: "border-box"
//   },

//   hero: {
//     background: "#ffffff",
//     border: "1px solid #e5e7eb",
//     color: "white",
//     borderRadius: "28px",
//     padding: "35px",
//     marginBottom: "25px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
//   },

//   smallText: {
//     fontSize: "14px",
//     opacity: 0.8,
//     marginBottom: "8px"
//   },

//   heroTitle: {
//     margin: 0,
//     fontSize: "38px",
//     fontWeight: "bold"
//   },

//   heroSub: {
//     marginTop: "10px",
//     opacity: 0.8,
//     fontSize: "15px"
//   },

//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(240px,1fr))",
//     gap: "20px",
//     marginBottom: "25px"
//   },

//   statCard: {
//     padding: "28px",
//     borderRadius: "24px",
//     color: "white",
//     boxShadow: "0 10px 24px rgba(0,0,0,0.08)"
//   },

//   statLabel: {
//     fontSize: "15px",
//     opacity: 0.9,
//     marginBottom: "14px"
//   },

//   statValue: {
//     fontSize: "40px",
//     fontWeight: "bold"
//   },

//   mainGrid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(320px,1fr))",
//     gap: "20px"
//   },

//   card: {
//     background: "white",
//     borderRadius: "24px",
//     padding: "24px",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
//   },

//   cardTitle: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//     color: "#111827"
//   },

//   categoryRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "14px 0",
//     borderBottom: "1px solid #f1f5f9"
//   },

//   categoryName: {
//     fontWeight: "bold",
//     color: "#111827"
//   },

//   categorySub: {
//     fontSize: "12px",
//     color: "#94a3b8",
//     marginTop: "4px"
//   },

//   categoryAmount: {
//     fontWeight: "bold",
//     color: "#4f46e5",
//     fontSize: "15px"
//   },

//   transaction: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "14px 0",
//     borderBottom: "1px solid #f1f5f9"
//   },

//   transactionTitle: {
//     fontWeight: "bold",
//     color: "#111827"
//   },

//   transactionCategory: {
//     fontSize: "12px",
//     color: "#94a3b8",
//     marginTop: "4px"
//   },

//   transactionAmount: {
//     fontWeight: "bold",
//     color: "#111827"
//   },

//   empty: {
//     color: "#94a3b8",
//     textAlign: "center",
//     padding: "20px 0"
//   }

// };

// export default Dashboard;











import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const res = await axios.get(`${API}/expenses`);

      setExpenses(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // TOTAL
  const total = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  // CATEGORY TOTALS
  const categoryMap = expenses.reduce((acc, e) => {

    if (!e.category || !e.category.trim()) {
      return acc;
    }

    acc[e.category] =
      (acc[e.category] || 0) + e.amount;

    return acc;

  }, {});

  return (

    <div style={styles.page}>

      {/* TOP SECTION */}
      <div style={styles.hero}>

        <div style={styles.smallText}>
          Welcome Back 👋
        </div>

        <h1 style={styles.heroTitle}>
          Finance Dashboard
        </h1>

        <p style={styles.heroSub}>
          Track and manage your expenses easily
        </p>

      </div>

      {/* STATS */}
      <div style={styles.statsGrid}>

        {/* TOTAL CARD */}
        <div style={styles.statCard}>

          <div style={styles.statLabel}>
            Total Expenses
          </div>

          <div style={styles.statValue}>
            ₹{total}
          </div>

        </div>

        {/* TRANSACTIONS */}
        <div style={styles.statCard}>

          <div style={styles.statLabel}>
            Transactions
          </div>

          <div style={styles.statValue}>
            {expenses.length}
          </div>

        </div>

      </div>

      {/* MAIN GRID */}
      <div style={styles.mainGrid}>

        {/* CATEGORY */}
        <div style={styles.card}>

          <div style={styles.cardTitle}>
            Category Breakdown
          </div>

          {Object.keys(categoryMap).length === 0 ? (

            <div style={styles.empty}>
              No category data
            </div>

          ) : (

            Object.entries(categoryMap).map(
              ([key, value]) => (

                <div
                  key={key}
                  style={styles.row}
                >

                  <div>

                    <div style={styles.name}>
                      {key}
                    </div>

                    <div style={styles.sub}>
                      Expense Category
                    </div>

                  </div>

                  <div style={styles.amount}>
                    ₹{value}
                  </div>

                </div>

              )
            )

          )}

        </div>

        {/* TRANSACTIONS */}
        <div style={styles.card}>

          <div style={styles.cardTitle}>
            Recent Transactions
          </div>

          {expenses.length === 0 ? (

            <div style={styles.empty}>
              No transactions found
            </div>

          ) : (

            expenses
              .slice(-6)
              .reverse()
              .map((exp) => (

                <div
                  key={exp.id}
                  style={styles.row}
                >

                  <div>

                    <div style={styles.name}>
                      {exp.title}
                    </div>

                    <div style={styles.sub}>
                      {exp.category}
                    </div>

                  </div>

                  <div style={styles.amountDark}>
                    ₹{exp.amount}
                  </div>

                </div>

              ))

          )}

        </div>

      </div>

    </div>

  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  },

  hero: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "20px"
  },

  smallText: {
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "8px"
  },

  heroTitle: {
    margin: 0,
    fontSize: "34px",
    color: "#111827"
  },

  heroSub: {
    color: "#6b7280",
    marginTop: "10px",
    fontSize: "14px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "16px",
    marginBottom: "20px"
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "24px"
  },

  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "12px"
  },

  statValue: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#111827"
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "18px"
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "22px"
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "18px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #f1f5f9"
  },

  name: {
    fontWeight: "600",
    color: "#111827"
  },

  sub: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "4px"
  },

  amount: {
    color: "#4f46e5",
    fontWeight: "bold"
  },

  amountDark: {
    color: "#111827",
    fontWeight: "bold"
  },

  empty: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "20px 0"
  }

};

export default Dashboard;