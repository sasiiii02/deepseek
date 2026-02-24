'use client';// client side component
import { assets } from "@/assets/assets";
import ChatInput from "@/components/ChatInput";
import Message from "@/components/Message";
import MessageList from "@/components/MessageList";
import PromtBox from "@/components/PromtBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [expand,setExpand] = useState(false); // Controls sidebar expand/collapse
  const [messages,setMessages] = useState([]); // Stores chat messages
  const [isLoading,setIsLoading] = useState(false); // For showing loader when AI responds
    // Called when ChatInput sends a message
  const handleSend = (text) => {

    // 1️⃣ Add user message
    setMessages(prev => [
      ...prev,
      { role: 'user', text }
    ]);

    // 2️⃣ Show loading
    setIsLoading(true);

    // 3️⃣ Simulate AI response (replace later with API)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: 'This is a simulated AI response.' }
      ]);

      // 4️⃣ Stop loading
      setIsLoading(false);
    }, 1000);
  };



  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=>(expand?setExpand(false): setExpand(true))}
            className="rotate-180" src={assets.menu_icon} alt=""/>

            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          {messages.length===0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16"/>
                <p className="text-2xl font-medium">Hi, I am DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ):(
            <div>
              <Message role='user' content='what is next js'/>
            </div>
          )}

          <PromtBox isLoading={isLoading} setIsLoading={isLoading}/>
          


          {/*prompt box*/}
          <p className="text-xs absolute bottom-1 text-gray-500">AI- generated, for reference only</p>
        </div>

      </div>
    </div>
  );
}
