'use client';
import React from 'react'

const MessageBubble = ({role,text}) => {
    const isUser = role==='user'
    return (
        <div className={`flex ${isUser? 'justify-end ':'justify-start'}`}> 
        <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${isUser?'bg-blue-500 text-white rounded-br-sm':'bg-gray-600 text-white rounded-br-sm'} `}>
            {text}

        </div>
        
        </div>
    )
}

export default MessageBubble