import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingSocials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey 👋 I'm your Wellwigen assistant. What's your name?",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // 🎤 Voice Input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

  // 🧠 Smart Reply Logic
  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    // Save name
    if (!userName) {
      setUserName(msg);
      localStorage.setItem("userName", msg);
      return {
        text: `Nice to meet you, ${msg} 😊\n\nHow can I help you today?`,
        options: ["Lose Weight", "Diet Plan", "View Pricing", "Talk to Expert"]
      };
    }

    if (text.includes("weight") || text.includes("lose")) {
      return {
        text: `Great choice ${userName} 🔥\n\nWe help you lose fat with proper workout + diet strategy. Most users see results in 2-3 weeks.\n\nWant to explore plans?`,
        options: ["View Pricing", "Talk to Expert"]
      };
    }

    if (text.includes("diet")) {
      return {
        text: `Hey ${userName} 🥗\n\nWe create personalized diet plans based on your lifestyle and goals — no crash dieting.\n\nWant expert help?`,
        options: ["Talk to Expert", "View Pricing"]
      };
    }

    if (text.includes("price")) {
      return {
        text: `No worries ${userName} 💰\n\nCheck our affordable plans below 👇`,
        options: ["View Pricing"]
      };
    }

    return {
      text: `I’m here to guide you ${userName} 😊\n\nChoose an option below 👇`,
      options: ["Lose Weight", "Diet Plan", "View Pricing", "Talk to Expert"]
    };
  };

  const handleNavigation = (option) => {
    if (option === "View Pricing") {
      window.location.href = "/pricing";
    } else if (option === "Talk to Expert") {
      window.open("https://wa.me/919598506627", "_blank");
    }
  };

  const sendMessage = (msg) => {
    const userMsg = { text: msg, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setTyping(true);

    setTimeout(() => {
      const botReply = getBotReply(msg);
      setMessages((prev) => [
        ...prev,
        { text: botReply.text, sender: "bot", options: botReply.options }
      ]);
      setTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            className="w-80 h-[32rem] backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Wellwigen AI
                </h3>
                <p className="text-xs text-white/80">
                  Personalized Assistant
                </p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div key={i}>
                  <div
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            sendMessage(opt);
                            handleNavigation(opt);
                          }}
                          className="text-xs px-3 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Dots */}
              {typing && (
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-300"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Type or speak..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* 🎤 Voice Button */}
              <button
                onClick={startListening}
                className="bg-white/20 p-2 rounded-xl hover:bg-white/30"
              >
                <Mic className="text-white w-4 h-4" />
              </button>

              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-xl"
              >
                <Send className="text-white w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-full text-white shadow-lg"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>
    </div>
  );
};

export default FloatingSocials;