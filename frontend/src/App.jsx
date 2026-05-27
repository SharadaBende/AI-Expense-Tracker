import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";

function App() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth <= 768);

  // SCREEN RESIZE
  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth <= 768
      );

      // CLOSE MENU ON DESKTOP
      if (window.innerWidth > 768) {

        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  return (

    <div style={styles.app}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>

        {/* TOP BAR */}
        <div style={styles.topBar}>

          {/* LOGO */}
          <div style={styles.logo}>
            💰 ExpenseAI
          </div>

          {/* DESKTOP LINKS */}
          {!isMobile && (

            <div style={styles.desktopLinks}>

              <Link
                to="/"
                style={styles.link}
              >
                Dashboard
              </Link>

              <Link
                to="/add"
                style={styles.link}
              >
                Add Expense
              </Link>

              <Link
                to="/analytics"
                style={styles.link}
              >
                Analytics
              </Link>

              <Link
                to="/ai"
                style={styles.link}
              >
                AI Chat
              </Link>

            </div>

          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              style={styles.menuButton}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          )}

        </div>

        {/* MOBILE MENU */}
        {isMobile && menuOpen && (

          <div style={styles.mobileMenu}>

            <Link
              to="/"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Dashboard
            </Link>

            <Link
              to="/add"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Add Expense
            </Link>

            <Link
              to="/analytics"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Analytics
            </Link>

            <Link
              to="/ai"
              style={styles.mobileLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              AI Chat
            </Link>

          </div>

        )}

      </nav>

      {/* PAGES */}
      <div style={styles.pageContent}>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/add"
            element={<AddExpense />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/ai"
            element={<AIInsights />}
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

    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  logo: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    letterSpacing: "0.5px"
  },

  desktopLinks: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  menuButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "26px",
    cursor: "pointer"
  },

  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px"
  },

  link: {
    textDecoration: "none",

    color: "#e5e7eb",

    padding: "10px 16px",

    borderRadius: "10px",

    background:
      "rgba(255,255,255,0.05)",

    fontSize: "14px",

    fontWeight: "500",

    transition: "0.3s"
  },

  mobileLink: {
    textDecoration: "none",

    color: "#e5e7eb",

    padding: "12px",

    borderRadius: "10px",

    background:
      "rgba(255,255,255,0.05)",

    fontSize: "14px",

    fontWeight: "500"
  },

  pageContent: {
    width: "100%"
  }

};

export default App;