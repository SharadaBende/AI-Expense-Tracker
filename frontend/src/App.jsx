import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AIInsights from "./pages/AIInsights";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div>
      {/* NAVBAR */}
      <nav style={{
  padding: "12px 20px",
  background: "#111",
  display: "flex",
  gap: "15px",
  position: "sticky",
  top: 0
}}>
  <Link style={{ color: "white", textDecoration: "none" }} to="/">Dashboard</Link>
<Link style={{ color: "white", textDecoration: "none" }} to="/add">Add Expense</Link>
<Link style={{ color: "white", textDecoration: "none" }} to="/ai">AI Insights</Link>
<Link style={{ color: "white", textDecoration: "none" }} to="/analytics">Analytics</Link>
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

export default App;