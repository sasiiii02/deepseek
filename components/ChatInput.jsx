'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

// ChatInput handles ONLY the input box logic
// It sends the message text to its parent using onSend
const ChatInput = ({ onSend, disabled }) => {

  // Local state to control the input field
  const [input, setInput] = useState('');

  // Called when user clicks send
  const handleSend = () => {
    // Prevent sending empty messages
    if (!input.trim()) return;

    // Send input value to parent component
    onSend(input);

    // Clear input field
    setInput('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex items-center gap-3 bg-[#3a3b3f] rounded-2xl px-4 py-3">
        
        {/* Controlled input field */}
        <input
          type="text"
          value={input}                     // Value comes from state
          onChange={(e) => setInput(e.target.value)} // Update state on typing
          placeholder="Message DeepSeek..."
          disabled={disabled}
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-white
            placeholder-gray-400
          "
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled}
          className="hover:opacity-80 transition"
        >
          <Image src={assets.arrow_icon} alt="Send" className="w-5" />
        </button>

      </div>
    </div>
  );
};

export default ChatInput;
