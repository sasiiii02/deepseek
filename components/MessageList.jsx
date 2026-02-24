'use client';
import React from 'react'
import MessageBubble from './MessageBubble'

const MessageList = ({messages}) => {
  return (
    <div className='flex flex-col gap-4 w-full max-w-3xl mx-auto overflow-y-auto'>
        {messages.map((msg,index)=>(
            <MessageBubble key={index} role={msg.role} text={msg.text}/>
        ))}
    </div>
  )
}

export default MessageList