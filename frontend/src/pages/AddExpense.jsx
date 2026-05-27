// import { useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function AddExpense() {
//   const [form, setForm] = useState({
//     title: "",
//     amount: "",
//     category: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addExpense = async () => {
//     await axios.post(`${API}/expenses`, {
//       title: form.title,
//       amount: Number(form.amount),
//       category: form.category.trim()
//     //   category: form.category
//     });

//     setForm({ title: "", amount: "", category: "" });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>➕ Add Expense</h2>

//       <input name="title" placeholder="Title" onChange={handleChange} />
//       <input name="amount" placeholder="Amount" onChange={handleChange} />
//       <input name="category" placeholder="Category" onChange={handleChange} />

//       <button onClick={addExpense}>Add</button>
//     </div>
//   );
// }

// export default AddExpense;











// import { useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function AddExpense() {
//   const [form, setForm] = useState({
//     title: "",
//     amount: "",
//     category: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addExpense = async () => {
//     if (!form.title || !form.amount || !form.category) {
//       alert("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     setSuccess("");

//     try {
//       await axios.post(`${API}/expenses`, {
//         title: form.title,
//         amount: Number(form.amount),
//         category: form.category.trim()
//       });

//       setForm({ title: "", amount: "", category: "" });
//       setSuccess("Expense added successfully ✅");
//     } catch (err) {
//       alert("Failed to add expense");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
      
//       <div style={styles.card}>
//         <h2>➕ Add Expense</h2>
//         <p style={styles.sub}>Track your spending easily</p>

//         <input
//           name="title"
//           placeholder="Expense Title"
//           value={form.title}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           name="amount"
//           placeholder="Amount (₹)"
//           value={form.amount}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           name="category"
//           placeholder="Category (Food, Travel...)"
//           value={form.category}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <button
//           onClick={addExpense}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.6 : 1
//           }}
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add Expense"}
//         </button>

//         {success && <p style={styles.success}>{success}</p>}
//       </div>

//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg,#eef2f7,#ffffff)",
//     fontFamily: "Arial"
//   },

//   card: {
//     width: "100%",
//     maxWidth: "420px",
//     background: "white",
//     padding: "25px",
//     borderRadius: "14px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
//   },

//   sub: {
//     fontSize: "13px",
//     color: "#666",
//     marginBottom: "15px"
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     outline: "none"
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#4f46e5",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },

//   success: {
//     marginTop: "10px",
//     color: "green",
//     fontSize: "13px"
//   }
// };

// export default AddExpense;



















import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    if (!form.title || !form.amount || !form.category) return;

    setLoading(true);
    setSuccess("");

    try {
      await axios.post(`${API}/expenses`, {
        title: form.title,
        amount: Number(form.amount),
        category: form.category.trim()
      });

      setForm({ title: "", amount: "", category: "" });
      setSuccess("Expense added successfully ✅");
    } catch (err) {
      setSuccess("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* HEADER */}
        <h2 style={styles.title}>💳 Add New Expense</h2>
        <p style={styles.subtitle}>
          Track your spending in seconds
        </p>

        {/* INPUTS */}
        <div style={styles.group}>
          <label style={styles.label}>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Uber ride, Groceries"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Amount</label>
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="₹ 500"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Food, Travel, Shopping"
            style={styles.input}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={addExpense}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>

        {/* SUCCESS */}
        {success && <p style={styles.success}>{success}</p>}

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
    fontFamily: "Arial"
  },

  card: {
    width: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "5px"
  },

  subtitle: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px"
  },

  group: {
    marginBottom: "15px"
  },

  label: {
    fontSize: "12px",
    color: "#555",
    display: "block",
    marginBottom: "6px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  },

  success: {
    marginTop: "10px",
    fontSize: "13px",
    color: "green"
  }
};

export default AddExpense;