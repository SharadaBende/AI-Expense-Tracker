// import { useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function AIInsights() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", text: input };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.get(
//         `${API}/ai-chat?prompt=${encodeURIComponent(input)}`
//       );

//       const aiMessage = {
//         role: "ai",
//         text: res.data.reply
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: "Error getting response from AI" }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>🤖 AI Finance Chat</h2>

//       {/* CHAT BOX */}
//       <div style={styles.chatBox}>
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               ...styles.message,
//               alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
//               background: msg.role === "user" ? "#DCF8C6" : "#fff"
//             }}
//           >
//             {msg.text}
//           </div>
//         ))}

//         {loading && (
//           <div style={styles.typing}>AI is thinking...</div>
//         )}
//       </div>

//       {/* INPUT BOX */}
//       <div style={styles.inputBox}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about your expenses..."
//           style={styles.input}
//         />

//         <button onClick={sendMessage} style={styles.button}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "auto",
//     padding: "20px",
//     fontFamily: "Arial"
//   },
//   chatBox: {
//     height: "400px",
//     overflowY: "auto",
//     border: "1px solid #ddd",
//     padding: "10px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     background: "#f9f9f9"
//   },
//   message: {
//     padding: "10px",
//     borderRadius: "10px",
//     maxWidth: "75%"
//   },
//   inputBox: {
//     display: "flex",
//     marginTop: "10px",
//     gap: "10px"
//   },
//   input: {
//     flex: 1,
//     padding: "10px"
//   },
//   button: {
//     padding: "10px 15px",
//     cursor: "pointer"
//   },
//   typing: {
//     fontStyle: "italic",
//     color: "gray"
//   }
// };

// export default AIInsights;














// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function AIInsights() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // AUTO SCROLL
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = {
//       role: "user",
//       text: input,
//       time: new Date().toLocaleTimeString()
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.get(
//         `${API}/ai-chat?prompt=${encodeURIComponent(input)}`
//       );

//       const aiMsg = {
//         role: "ai",
//         text: res.data.reply,
//         time: new Date().toLocaleTimeString()
//       };

//       setMessages((prev) => [...prev, aiMsg]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "ai",
//           text: "Error: Unable to get response",
//           time: new Date().toLocaleTimeString()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>🤖 AI Finance Chat</h2>

//       {/* CHAT BOX */}
//       <div style={styles.chatBox}>
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               ...styles.message,
//               alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
//               backgroundColor: msg.role === "user" ? "#DCF8C6" : "#fff"
//             }}
//           >
//             <div>{msg.text}</div>
//             <div style={styles.time}>{msg.time}</div>
//           </div>
//         ))}

//         {/* TYPING ANIMATION */}
//         {loading && (
//           <div style={styles.typing}>
//             AI is typing...
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       {/* INPUT */}
//       <div style={styles.inputBox}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//           style={styles.input}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage} style={styles.button}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "auto",
//     padding: "20px",
//     fontFamily: "Arial"
//   },
//   chatBox: {
//     height: "500px",
//     overflowY: "auto",
//     border: "1px solid #ddd",
//     padding: "10px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     background: "#f9f9f9",
//     borderRadius: "10px"
//   },
//   message: {
//     padding: "10px",
//     borderRadius: "10px",
//     maxWidth: "75%",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
//   },
//   time: {
//     fontSize: "10px",
//     marginTop: "5px",
//     opacity: 0.6
//   },
//   inputBox: {
//     display: "flex",
//     marginTop: "10px",
//     gap: "10px"
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc"
//   },
//   button: {
//     padding: "10px 15px",
//     background: "#111",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer"
//   },
//   typing: {
//     fontStyle: "italic",
//     color: "gray"
//   }
// };

// export default AIInsights;











import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AIInsights() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/ai-chat?prompt=${encodeURIComponent(input)}`
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

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>AI Finance Assistant</h2>
        <p>Ask anything about your expenses</p>
      </div>

      {/* CHAT CONTAINER */}
      <div style={styles.chatContainer}>
        {messages.length === 0 && (
          <div style={styles.empty}>
            Start a conversation 👇
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.messageRow,
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                ...styles.bubble,
                backgroundColor: msg.role === "user" ? "#DCF8C6" : "#ffffff"
              }}
            >
              <div style={styles.text}>{msg.text}</div>
              <div style={styles.time}>{msg.time}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={styles.typing}>
            AI is thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT AREA */}
      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

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
    gap: "10px"
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