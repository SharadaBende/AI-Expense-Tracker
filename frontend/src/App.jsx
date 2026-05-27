// import { Routes, Route, Link } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import AddExpense from "./pages/AddExpense";
// import AIInsights from "./pages/AIInsights";
// import Analytics from "./pages/Analytics";

// function App() {
//   return (
//     <div>
//       {/* NAVBAR */}
//       <nav style={{
//   padding: "12px 20px",
//   background: "#111",
//   display: "flex",
//   gap: "15px",
//   position: "sticky",
//   top: 0
// }}>
//   <Link style={{ color: "white", textDecoration: "none" }} to="/">Dashboard</Link>
// <Link style={{ color: "white", textDecoration: "none" }} to="/add">Add Expense</Link>
// <Link style={{ color: "white", textDecoration: "none" }} to="/ai">AI Insights</Link>
// <Link style={{ color: "white", textDecoration: "none" }} to="/analytics">Analytics</Link>
//     </nav>

//       {/* ROUTES */}
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/add" element={<AddExpense />} />
//         <Route path="/ai" element={<AIInsights />} />
//         <Route path="/analytics" element={<Analytics />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;








import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AIInsights from "./pages/AIInsights";
import Analytics from "./pages/Analytics";

function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        {/* BRAND */}
        <div style={styles.logo}>
          💰 ExpenseAI
        </div>

        {/* LINKS */}
        <div style={styles.links}>

          <Link
            to="/"
            style={{
              ...styles.link,
              ...(isActive("/") ? styles.active : {})
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/add"
            style={{
              ...styles.link,
              ...(isActive("/add") ? styles.active : {})
            }}
          >
            Add Expense
          </Link>

          <Link
            to="/ai"
            style={{
              ...styles.link,
              ...(isActive("/ai") ? styles.active : {})
            }}
          >
            AI Chat
          </Link>

          <Link
            to="/analytics"
            style={{
              ...styles.link,
              ...(isActive("/analytics") ? styles.active : {})
            }}
          >
            Analytics
          </Link>

        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/ai" element={<AIInsights />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>

    </div>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "12px 24px",

    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #eee"
  },

  logo: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4f46e5"
  },

  links: {
    display: "flex",
    gap: "16px"
  },

  link: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#555",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "0.2s"
  },

  active: {
    background: "#4f46e5",
    color: "white"
  }
};

export default App;