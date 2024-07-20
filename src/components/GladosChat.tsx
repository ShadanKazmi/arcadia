import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import glados from '../assets/glados.png';
import chat from '../assets/chat.png';
import quotes from '../assets/quotes.json';

type Props = {};

const GladosChat: React.FC<Props> = () => {
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'glados' }[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: `You: ${input}`, sender: 'user' }]);
      setInput('');

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      setMessages((prevMessages) => [...prevMessages, { text: `GLaDOS: ${randomQuote}`, sender: 'glados' }]);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col h-screen bg-zinc-500"
      style={{
        backgroundImage: `url(${glados.src})`,
        backgroundSize: '30vh',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className="bg-grey-900 p-4 shadow-md text-center" style={{ color: 'maroon'}}>
        <h1 className="text-2xl font-bold">GLaDOS</h1>
      </header>
      <div className="flex-1 p-4 overflow-auto mt-40" style={{ borderTop: "1px solid lightgrey" }}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'glados' && (
                <img src={chat.src} alt="Chat Icon" className="w-8 h-8 mr-2" />
              )}
              <div
                className={`p-3 rounded-lg max-w-sm text-white ${msg.sender === 'user' ? 'bg-green-900' : 'bg-gray-700'}`}
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <img src={chat.src} alt="Chat Icon" className="w-8 h-8 ml-2" />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gray-900 p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 p-2 rounded-lg outline-none text-white"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-red-600 hover:bg-blue-800 text-white p-2 rounded-lg"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default GladosChat;
