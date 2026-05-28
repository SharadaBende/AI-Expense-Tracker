import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.app}>
      
      {/* NAVBAR */}
      <nav style={styles.navbar}>

        <div style={styles.topBar}>

          {/* LOGO */}
          <div style={styles.logo}>
            💰 ExpenseAI
          </div>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <div style={styles.desktopLinks}>
              <Link style={styles.link} to="/">Dashboard</Link>
              <Link style={styles.link} to="/add">Add Expense</Link>
              <Link style={styles.link} to="/analytics">Analytics</Link>
              <Link style={styles.link} to="/ai">AI Chat</Link>
            </div>
          )}

          {/* MOBILE BUTTON */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.menuButton}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}

        </div>

        {/* MOBILE MENU */}
        {isMobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/">
              Dashboard
            </Link>
            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/add">
              Add Expense
            </Link>
            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/analytics">
              Analytics
            </Link>
            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/ai">
              AI Chat
            </Link>

            {/* AUTH LINKS */}
            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/login">
              Login
            </Link>

            <Link onClick={() => setMenuOpen(false)} style={styles.mobileLink} to="/register">
              Register
            </Link>
          </div>
        )}

      </nav>

      {/* PAGES */}
      <div style={styles.pageContent}>
        <Routes>

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai"
            element={
              <ProtectedRoute>
                <AIInsights />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif"
  },

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#111827",
    padding: "14px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold"
  },

  desktopLinks: {
    display: "flex",
    gap: "12px"
  },

  menuButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "28px",
    cursor: "pointer"
  },

  mobileMenu: {
    position: "absolute",
    top: "60px",
    left: 0,
    right: 0,
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    gap: "10px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },

  link: {
    textDecoration: "none",
    color: "#e5e7eb",
    padding: "10px 14px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.05)"
  },

  mobileLink: {
    textDecoration: "none",
    color: "#e5e7eb",
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.05)"
  },

  pageContent: {
    padding: "10px"
  }
};

export default App;