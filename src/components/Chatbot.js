import { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋! How can I help you today?" },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "❌ Sorry, server not responding." },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="chatbot"
        />
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Chatbot</h4>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([
                  { sender: "bot", text: "Hello 👋! How can I help you today?" },
                ]);
              }}
            >
              ✖
            </button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <p
                key={i}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
