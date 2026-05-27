import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AIInsights() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/ai-chat?prompt=${encodeURIComponent(input)}`
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error getting response from AI" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🤖 AI Finance Chat</h2>

      {/* CHAT BOX */}
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#DCF8C6" : "#fff"
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>AI is thinking...</div>
        )}
      </div>

      {/* INPUT BOX */}
      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your expenses..."
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f9f9f9"
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "75%"
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px"
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer"
  },
  typing: {
    fontStyle: "italic",
    color: "gray"
  }
};

export default AIInsights;