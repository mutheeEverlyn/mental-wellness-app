import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatWithAI = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am here to support your mental wellness. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    console.log('Token being sent to backend:', token); // Debug log
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/ai-chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: userMessage.text }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'ai', text: 'Sorry, I could not process your request.' }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Error connecting to AI service.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 flex flex-col h-[70vh]">
        <h2 className="text-2xl font-bold mb-4 text-center">AI Mental Wellness Chat</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWithAI; 