import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AddExpense() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    await axios.post(`${API}/expenses`, {
      title: form.title,
      amount: Number(form.amount),
      category: form.category
    });

    setForm({ title: "", amount: "", category: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add Expense</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="amount" placeholder="Amount" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />

      <button onClick={addExpense}>Add</button>
    </div>
  );
}

export default AddExpense;