import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function AIInsights() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  // IMPORTANT
  const recognitionRef = useRef(null);

  // AUTO SCROLL
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

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setInput("");

    setLoading(true);

    try {

      const res = await axios.get(
        `${API}/ai-chat?prompt=${encodeURIComponent(messageText)}`
      );

      const aiMessage = {

        role: "ai",

        text:
          res.data.reply ||
          "No response from AI.",

        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);

    } catch (err) {

      console.log(err);

      setMessages((prev) => [

        ...prev,

        {
          role: "ai",

          text:
            "AI server error. Please try again.",

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

      alert("Use Google Chrome");

      return;
    }

    // STOP OLD INSTANCE
    if (recognitionRef.current) {

      recognitionRef.current.stop();
    }

    const recognition =
      new SpeechRecognition();

    recognitionRef.current =
      recognition;

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    let silenceTimer;

    setListening(true);

    recognition.start();

    // RESULTS
    recognition.onresult = (event) => {

      clearTimeout(silenceTimer);

      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const transcript =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {

          finalTranscript +=
            transcript + " ";

        } else {

          interimTranscript +=
            transcript;
        }
      }

      // LIVE TEXT
      setInput(
        finalTranscript +
        interimTranscript
      );

      // WAIT BEFORE STOPPING
      silenceTimer = setTimeout(() => {

        recognition.stop();

      }, 3000);
    };

    // END
    recognition.onend = () => {

      setListening(false);

      if (finalTranscript.trim()) {

        sendMessage(
          finalTranscript.trim()
        );
      }
    };

    // ERROR
    recognition.onerror = (event) => {

      console.log(event.error);

      setListening(false);
    };
  };

  // MANUAL STOP
  const stopVoiceInput = () => {

    if (recognitionRef.current) {

      recognitionRef.current.stop();
    }

    setListening(false);
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
            Chat naturally with your finance AI
          </p>

        </div>

      </div>

      {/* CHAT */}
      <div style={styles.chatArea}>

        <div style={styles.chatBox}>

          {messages.length === 0 && (

            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                💬
              </div>

              <h2 style={styles.emptyTitle}>
                Start a conversation
              </h2>

              <p style={styles.emptyText}>
                Type or speak using the microphone
              </p>

            </div>

          )}

          {/* MESSAGES */}
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
                      ? "#111827"
                      : "#ffffff",

                  color:
                    msg.role === "user"
                      ? "#ffffff"
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

          {/* LOADING */}
          {loading && (

            <div style={styles.typingRow}>

              <div style={styles.typingBubble}>
                AI is typing...
              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>

      </div>

      {/* INPUT */}
      <div style={styles.inputContainer}>

        {/* MIC */}
        <button
          onClick={startVoiceInput}
          style={{
            ...styles.micButton,

            background:
              listening
                ? "#ef4444"
                : "#f3f4f6",

            color:
              listening
                ? "#ffffff"
                : "#111827"
          }}
        >
          🎤
        </button>

        {/* STOP */}
        {listening && (

          <button
            onClick={stopVoiceInput}
            style={styles.stopButton}
          >
            ⏹
          </button>

        )}

        {/* INPUT */}
        <input
          value={input}

          onChange={(e) =>
            setInput(e.target.value)
          }

          placeholder={
            listening
              ? "Listening..."
              : "Type your message..."
          }

          style={styles.input}

          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        {/* SEND */}
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
    background: "#f5f7fb",
    fontFamily: "Arial, sans-serif"
  },

  header: {
    padding: "18px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb"
  },

  title: {
    margin: 0,
    fontSize: "24px",
    color: "#111827"
  },

  subtitle: {
    marginTop: "4px",
    fontSize: "14px",
    color: "#6b7280"
  },

  chatArea: {
    flex: 1,
    padding: "16px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center"
  },

  chatBox: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    border: "1px solid #e5e7eb"
  },

  messageRow: {
    display: "flex"
  },

  messageBubble: {
    maxWidth: "80%",
    padding: "12px 14px",
    borderRadius: "18px",
    fontSize: "14px",
    lineHeight: "1.6",
    wordBreak: "break-word"
  },

  messageText: {
    whiteSpace: "pre-wrap"
  },

  time: {
    marginTop: "6px",
    fontSize: "10px",
    opacity: 0.7,
    textAlign: "right"
  },

  typingRow: {
    display: "flex",
    justifyContent: "flex-start"
  },

  typingBubble: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "10px 14px",
    borderRadius: "14px",
    fontSize: "13px"
  },

  inputContainer: {
    padding: "14px",
    background: "#ffffff",
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
    padding: "14px 18px",
    border: "none",
    borderRadius: "14px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer"
  },

  micButton: {
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px"
  },

  stopButton: {
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  },

  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
    color: "#6b7280"
  },

  emptyIcon: {
    fontSize: "52px"
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