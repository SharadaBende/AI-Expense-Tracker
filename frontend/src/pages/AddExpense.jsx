
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
//     if (!form.title || !form.amount || !form.category) return;

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
//       setSuccess("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>

//       <div style={styles.card}>

//         {/* HEADER */}
//         <h2 style={styles.title}>💳 Add New Expense</h2>
//         <p style={styles.subtitle}>
//           Track your spending in seconds
//         </p>

//         {/* INPUTS */}
//         <div style={styles.group}>
//           <label style={styles.label}>Title</label>
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="e.g. Uber ride, Groceries"
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.group}>
//           <label style={styles.label}>Amount</label>
//           <input
//             name="amount"
//             value={form.amount}
//             onChange={handleChange}
//             placeholder="₹ 500"
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.group}>
//           <label style={styles.label}>Category</label>
//           <input
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             placeholder="Food, Travel, Shopping"
//             style={styles.input}
//           />
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={addExpense}
//           disabled={loading}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.6 : 1
//           }}
//         >
//           {loading ? "Saving..." : "Add Expense"}
//         </button>

//         {/* SUCCESS */}
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
//     background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
//     fontFamily: "Arial"
//   },

//   card: {
//     width: "420px",
//     background: "white",
//     padding: "30px",
//     borderRadius: "16px",
//     boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
//   },

//   title: {
//     marginBottom: "5px"
//   },

//   subtitle: {
//     fontSize: "13px",
//     color: "#666",
//     marginBottom: "20px"
//   },

//   group: {
//     marginBottom: "15px"
//   },

//   label: {
//     fontSize: "12px",
//     color: "#555",
//     display: "block",
//     marginBottom: "6px"
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "10px",
//     border: "1px solid #ddd",
//     outline: "none",
//     fontSize: "14px"
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "10px",
//     border: "none",
//     background: "#4f46e5",
//     color: "white",
//     fontWeight: "bold",
//     cursor: "pointer",
//     marginTop: "10px"
//   },

//   success: {
//     marginTop: "10px",
//     fontSize: "13px",
//     color: "green"
//   }
// };

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

//   const [message, setMessage] = useState({
//     text: "",
//     type: ""
//   });

//   // HANDLE INPUT
//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//   };

//   // ADD EXPENSE
//   const addExpense = async () => {

//     if (
//       !form.title.trim() ||
//       !form.amount.trim() ||
//       !form.category.trim()
//     ) {

//       setMessage({
//         text: "Please fill all fields",
//         type: "error"
//       });

//       return;
//     }

//     setLoading(true);

//     setMessage({
//       text: "",
//       type: ""
//     });

//     try {

//       await axios.post(`${API}/expenses`, {
//         title: form.title,
//         amount: Number(form.amount),
//         category: form.category.trim()
//       });

//       setForm({
//         title: "",
//         amount: "",
//         category: ""
//       });

//       setMessage({
//         text: "Expense added successfully ✅",
//         type: "success"
//       });

//     } catch (err) {

//       setMessage({
//         text: "Something went wrong ❌",
//         type: "error"
//       });

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (

//     <div style={styles.page}>

//       <div style={styles.container}>

//         {/* LEFT SECTION */}
//         <div style={styles.leftSection}>

//           <div style={styles.badge}>
//             Smart Expense Tracking
//           </div>

//           <h1 style={styles.heading}>
//             Add your daily expenses easily
//           </h1>

//           <p style={styles.description}>
//             Keep track of spending, monitor categories,
//             and get AI-powered insights instantly.
//           </p>

//           <div style={styles.features}>

//             <div style={styles.feature}>
//               ✅ AI Insights
//             </div>

//             <div style={styles.feature}>
//               ✅ Expense Analytics
//             </div>

//             <div style={styles.feature}>
//               ✅ Voice Assistant
//             </div>

//           </div>

//         </div>

//         {/* RIGHT CARD */}
//         <div style={styles.card}>

//           <h2 style={styles.cardTitle}>
//             Add Expense
//           </h2>

//           <p style={styles.cardSubtitle}>
//             Enter your expense details below
//           </p>

//           {/* TITLE */}
//           <div style={styles.group}>

//             <label style={styles.label}>
//               Expense Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Netflix, Uber, Food..."
//               style={styles.input}
//             />

//           </div>

//           {/* AMOUNT */}
//           <div style={styles.group}>

//             <label style={styles.label}>
//               Amount
//             </label>

//             <input
//               type="number"
//               name="amount"
//               value={form.amount}
//               onChange={handleChange}
//               placeholder="₹ 500"
//               style={styles.input}
//             />

//           </div>

//           {/* CATEGORY */}
//           <div style={styles.group}>

//             <label style={styles.label}>
//               Category
//             </label>

//             <input
//               type="text"
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               placeholder="Food, Travel, Shopping..."
//               style={styles.input}
//             />

//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={addExpense}
//             disabled={loading}
//             style={{
//               ...styles.button,
//               opacity: loading ? 0.7 : 1
//             }}
//           >

//             {loading
//               ? "Adding..."
//               : "Add Expense"}

//           </button>

//           {/* MESSAGE */}
//           {message.text && (

//             <div
//               style={{
//                 ...styles.message,

//                 background:
//                   message.type === "success"
//                     ? "#ecfdf5"
//                     : "#fef2f2",

//                 color:
//                   message.type === "success"
//                     ? "#065f46"
//                     : "#991b1b",

//                 border:
//                   message.type === "success"
//                     ? "1px solid #10b981"
//                     : "1px solid #ef4444"
//               }}
//             >

//               {message.text}

//             </div>

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
//     background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
//     padding: "20px",
//     boxSizing: "border-box",
//     fontFamily: "Arial, sans-serif"
//   },

//   container: {
//     maxWidth: "1200px",
//     margin: "auto",
//     display: "flex",
//     gap: "40px",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap"
//   },

//   leftSection: {
//     flex: 1,
//     minWidth: "280px"
//   },

//   badge: {
//     display: "inline-block",
//     background: "#e0e7ff",
//     color: "#4338ca",
//     padding: "8px 14px",
//     borderRadius: "999px",
//     fontSize: "13px",
//     fontWeight: "bold",
//     marginBottom: "20px"
//   },

//   heading: {
//     fontSize: "42px",
//     lineHeight: "1.2",
//     color: "#111827",
//     marginBottom: "18px"
//   },

//   description: {
//     color: "#6b7280",
//     fontSize: "16px",
//     lineHeight: "1.7",
//     marginBottom: "30px",
//     maxWidth: "500px"
//   },

//   features: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px"
//   },

//   feature: {
//     background: "white",
//     padding: "14px",
//     borderRadius: "14px",
//     boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
//     fontSize: "14px",
//     color: "#111827"
//   },

//   card: {
//     flex: 1,
//     minWidth: "320px",
//     maxWidth: "450px",
//     background: "white",
//     padding: "30px",
//     borderRadius: "24px",
//     boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
//     boxSizing: "border-box"
//   },

//   cardTitle: {
//     margin: 0,
//     fontSize: "28px",
//     color: "#111827"
//   },

//   cardSubtitle: {
//     marginTop: "8px",
//     color: "#6b7280",
//     fontSize: "14px",
//     marginBottom: "28px"
//   },

//   group: {
//     marginBottom: "18px"
//   },

//   label: {
//     display: "block",
//     marginBottom: "8px",
//     fontSize: "13px",
//     color: "#374151",
//     fontWeight: "bold"
//   },

//   input: {
//     width: "100%",
//     padding: "14px",
//     borderRadius: "14px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     fontSize: "14px",
//     boxSizing: "border-box"
//   },

//   button: {
//     width: "100%",
//     padding: "15px",
//     borderRadius: "14px",
//     border: "none",
//     background: "linear-gradient(135deg, #4f46e5, #6366f1)",
//     color: "white",
//     fontWeight: "bold",
//     fontSize: "15px",
//     cursor: "pointer",
//     marginTop: "10px"
//   },

//   message: {
//     marginTop: "16px",
//     padding: "12px",
//     borderRadius: "12px",
//     fontSize: "14px"
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

  const [message, setMessage] = useState({
    text: "",
    type: ""
  });

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ADD EXPENSE
  const addExpense = async () => {

    if (
      !form.title.trim() ||
      !form.amount.trim() ||
      !form.category.trim()
    ) {

      setMessage({
        text: "Please fill all fields",
        type: "error"
      });

      return;
    }

    setLoading(true);

    setMessage({
      text: "",
      type: ""
    });

    try {

      await axios.post(`${API}/expenses`, {
        title: form.title,
        amount: Number(form.amount),
        category: form.category.trim()
      });

      setForm({
        title: "",
        amount: "",
        category: ""
      });

      setMessage({
        text: "Expense added successfully ✅",
        type: "success"
      });

    } catch (err) {

      setMessage({
        text: "Something went wrong ❌",
        type: "error"
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>

          <h1 style={styles.title}>
            Add Expense
          </h1>

          <p style={styles.subtitle}>
            Track your daily spending easily
          </p>

        </div>

        {/* TITLE */}
        <div style={styles.group}>

          <label style={styles.label}>
            Expense Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Netflix, Uber, Food..."
            style={styles.input}
          />

        </div>

        {/* AMOUNT */}
        <div style={styles.group}>

          <label style={styles.label}>
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="₹ 500"
            style={styles.input}
          />

        </div>

        {/* CATEGORY */}
        <div style={styles.group}>

          <label style={styles.label}>
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Food, Travel, Shopping..."
            style={styles.input}
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={addExpense}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1
          }}
        >

          {loading
            ? "Adding..."
            : "Add Expense"}

        </button>

        {/* MESSAGE */}
        {message.text && (

          <div
            style={{
              ...styles.message,

              background:
                message.type === "success"
                  ? "#ecfdf5"
                  : "#fef2f2",

              color:
                message.type === "success"
                  ? "#065f46"
                  : "#991b1b",

              border:
                message.type === "success"
                  ? "1px solid #10b981"
                  : "1px solid #ef4444"
            }}
          >

            {message.text}

          </div>

        )}

      </div>

    </div>

  );
}

// STYLES
const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    boxSizing: "border-box"
  },

  header: {
    marginBottom: "24px"
  },

  title: {
    margin: 0,
    fontSize: "30px",
    color: "#111827"
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "14px"
  },

  group: {
    marginBottom: "18px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#374151"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px"
  },

  message: {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px"
  }

};

export default AddExpense;