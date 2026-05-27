import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AIInsights() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (textFromVoice = null) => {
    const messageText = textFromVoice || input;
    if (!messageText.trim()) return;

    const userMsg = {
      role: "user",
      text: messageText,
      time: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/ai-chat?prompt=${encodeURIComponent(messageText)}`
      );

      const aiMsg = {
        role: "ai",
        text: res.data.reply,
        time: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Try again.",
          time: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VOICE INPUT ----------------
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
      setListening(false);

      // AUTO SEND (you can remove this line if you want manual send)
      sendMessage(text);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>AI Finance Assistant</h2>
        <p>Chat or use voice 🎤</p>
      </div>

      {/* CHAT */}
      <div style={styles.chatContainer}>
        {messages.length === 0 && (
          <div style={styles.empty}>
            Start chatting or click mic 🎤
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.messageRow,
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                ...styles.bubble,
                backgroundColor:
                  msg.role === "user" ? "#DCF8C6" : "#ffffff"
              }}
            >
              <div style={styles.text}>{msg.text}</div>
              <div style={styles.time}>{msg.time}</div>
            </div>
          </div>
        ))}

        {loading && <div style={styles.typing}>AI is thinking...</div>}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div style={styles.inputBar}>
        
        {/* MIC BUTTON */}
        <button
          onClick={startVoiceInput}
          style={{
            ...styles.micButton,
            background: listening ? "#ff4d4d" : "#eee"
          }}
        >
          🎤
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? "Listening..." : "Type or speak..."}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={() => sendMessage()} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f4f6f8",
    fontFamily: "Arial"
  },

  header: {
    textAlign: "center",
    padding: "15px",
    background: "#111",
    color: "white"
  },

  chatContainer: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  messageRow: {
    display: "flex"
  },

  bubble: {
    maxWidth: "70%",
    padding: "12px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  text: {
    fontSize: "14px",
    lineHeight: "1.4"
  },

  time: {
    fontSize: "10px",
    opacity: 0.5,
    marginTop: "5px"
  },

  inputBar: {
    display: "flex",
    padding: "12px",
    background: "white",
    borderTop: "1px solid #ddd",
    gap: "10px",
    alignItems: "center"
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    padding: "12px 18px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  micButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  },

  typing: {
    fontStyle: "italic",
    color: "#666"
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: "50px"
  }
};

export default AIInsights;