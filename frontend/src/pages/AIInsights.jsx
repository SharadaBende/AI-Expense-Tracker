
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// function AIInsights() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [listening, setListening] = useState(false);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async (textFromVoice = null) => {
//     const messageText = textFromVoice || input;
//     if (!messageText.trim()) return;

//     const userMsg = {
//       role: "user",
//       text: messageText,
//       time: new Date().toLocaleTimeString()
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.get(
//         `${API}/ai-chat?prompt=${encodeURIComponent(messageText)}`
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
//           text: "Something went wrong. Try again.",
//           time: new Date().toLocaleTimeString()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startVoiceInput = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Voice input not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;

//     recognition.start();
//     setListening(true);

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       setListening(false);
//       sendMessage(text);
//     };

//     recognition.onerror = () => setListening(false);
//     recognition.onend = () => setListening(false);
//   };

//   return (
//     <div style={styles.page}>

//       {/* HEADER */}
//       <div style={styles.header}>
//         <div style={styles.title}>AI Assistant</div>
//         <div style={styles.subtitle}>Ask anything about your expenses 💬</div>
//       </div>

//       {/* CHAT BOX */}
//       <div style={styles.chatWrapper}>
//         <div style={styles.chatContainer}>

//           {messages.length === 0 && (
//             <div style={styles.empty}>
//               Start a conversation...
//             </div>
//           )}

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               style={{
//                 ...styles.row,
//                 justifyContent:
//                   msg.role === "user" ? "flex-end" : "flex-start"
//               }}
//             >
//               <div
//                 style={{
//                   ...styles.bubble,
//                   background:
//                     msg.role === "user"
//                       ? "#4f46e5"
//                       : "#ffffff",
//                   color: msg.role === "user" ? "white" : "#111"
//                 }}
//               >
//                 {msg.text}
//                 <div style={styles.time}>{msg.time}</div>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div style={styles.typing}>AI is thinking...</div>
//           )}

//           <div ref={chatEndRef} />
//         </div>
//       </div>

//       {/* INPUT BAR */}
//       <div style={styles.inputBar}>

//         <button
//           onClick={startVoiceInput}
//           style={{
//             ...styles.mic,
//             background: listening ? "#ef4444" : "#f3f4f6"
//           }}
//         >
//           🎤
//         </button>

//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={listening ? "Listening..." : "Type message..."}
//           style={styles.input}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />

//         <button onClick={() => sendMessage()} style={styles.send}>
//           Send
//         </button>
//       </div>

//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     background: "#f5f7fb",
//     fontFamily: "Arial"
//   },

//   header: {
//     textAlign: "center",
//     padding: "14px",
//     background: "white",
//     borderBottom: "1px solid #eee"
//   },

//   title: {
//     fontSize: "16px",
//     fontWeight: "bold"
//   },

//   subtitle: {
//     fontSize: "12px",
//     color: "#666"
//   },

//   chatWrapper: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     padding: "15px"
//   },

//   chatContainer: {
//     width: "100%",
//     maxWidth: "800px",
//     background: "white",
//     borderRadius: "12px",
//     padding: "15px",
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
//   },

//   row: {
//     display: "flex"
//   },

//   bubble: {
//     maxWidth: "75%",
//     padding: "10px 12px",
//     borderRadius: "12px",
//     fontSize: "14px"
//   },

//   time: {
//     fontSize: "10px",
//     opacity: 0.6,
//     marginTop: "5px"
//   },

//   inputBar: {
//     display: "flex",
//     padding: "12px",
//     background: "white",
//     borderTop: "1px solid #eee",
//     gap: "10px",
//     alignItems: "center"
//   },

//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     outline: "none"
//   },

//   send: {
//     padding: "10px 16px",
//     background: "#4f46e5",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer"
//   },

//   mic: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer"
//   },

//   typing: {
//     fontStyle: "italic",
//     color: "#666"
//   },

//   empty: {
//     textAlign: "center",
//     color: "#888",
//     marginTop: "40px"
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
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // SEND MESSAGE
  const sendMessage = async (voiceText = null) => {
    const messageText = voiceText || input;

    if (!messageText.trim()) return;

    const userMessage = {
      role: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/ai-chat?prompt=${encodeURIComponent(messageText)}`
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  // VOICE INPUT
  const startVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setListening(false);

      sendMessage(text);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            AI Assistant
          </h1>

          <p style={styles.subtitle}>
            Chat with your smart finance assistant
          </p>
        </div>

      </div>

      {/* CHAT AREA */}
      <div style={styles.chatArea}>

        <div style={styles.chatBox}>

          {messages.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>💬</div>

              <h2 style={styles.emptyTitle}>
                Start chatting
              </h2>

              <p style={styles.emptyText}>
                Ask anything or use voice input
              </p>
            </div>
          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start"
              }}
            >

              <div
                style={{
                  ...styles.messageBubble,

                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                      : "#ffffff",

                  color:
                    msg.role === "user"
                      ? "white"
                      : "#111827",

                  border:
                    msg.role === "ai"
                      ? "1px solid #e5e7eb"
                      : "none"
                }}
              >

                <div style={styles.messageText}>
                  {msg.text}
                </div>

                <div style={styles.time}>
                  {msg.time}
                </div>

              </div>

            </div>

          ))}

          {loading && (
            <div style={styles.typingContainer}>

              <div style={styles.typingBubble}>
                AI is typing...
              </div>

            </div>
          )}

          <div ref={chatEndRef} />

        </div>

      </div>

      {/* INPUT BAR */}
      <div style={styles.inputContainer}>

        <button
          onClick={startVoiceInput}
          style={{
            ...styles.micButton,
            background: listening
              ? "#ef4444"
              : "#f3f4f6",

            color: listening
              ? "white"
              : "#111827"
          }}
        >
          🎤
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}

          placeholder={
            listening
              ? "Listening..."
              : "Type your message..."
          }

          style={styles.input}

          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
        />

        <button
          onClick={() => sendMessage()}
          style={styles.sendButton}
        >
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
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif"
  },

  header: {
    padding: "18px 20px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    margin: 0,
    fontSize: "24px",
    color: "#111827"
  },

  subtitle: {
    margin: "4px 0 0 0",
    color: "#6b7280",
    fontSize: "14px"
  },

  chatArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    overflow: "hidden"
  },

  chatBox: {
    width: "100%",
    maxWidth: "900px",
    background: "white",
    borderRadius: "22px",
    padding: "20px",
    overflowY: "auto",
    boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  messageRow: {
    display: "flex",
    width: "100%"
  },

  messageBubble: {
    maxWidth: "82%",
    padding: "12px 14px",
    borderRadius: "18px",
    fontSize: "14px",
    lineHeight: "1.5",
    wordBreak: "break-word"
  },

  messageText: {
    whiteSpace: "pre-wrap"
  },

  time: {
    fontSize: "10px",
    opacity: 0.7,
    marginTop: "6px",
    textAlign: "right"
  },

  typingContainer: {
    display: "flex",
    justifyContent: "flex-start"
  },

  typingBubble: {
    background: "#eef2ff",
    padding: "10px 14px",
    borderRadius: "14px",
    fontSize: "13px",
    color: "#4338ca"
  },

  inputContainer: {
    padding: "14px",
    background: "white",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px"
  },

  sendButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  micButton: {
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px"
  },

  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#6b7280",
    marginTop: "60px"
  },

  emptyIcon: {
    fontSize: "48px"
  },

  emptyTitle: {
    marginTop: "14px",
    marginBottom: "6px",
    color: "#111827"
  },

  emptyText: {
    margin: 0
  }

};

export default AIInsights;