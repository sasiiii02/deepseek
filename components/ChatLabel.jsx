import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const ChatLabel = ({ id, title, openMenu, setOpenMenu }) => {
  const isOpen = openMenu.open && openMenu.id === id

  return (
    <div className="flex items-center justify-between px-2 py-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      
      {/* Chat name */}
      <p className="truncate max-w-[160px]">
        {title}
      </p>

      {/* 3 dots */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          setOpenMenu(
            isOpen ? { id: null, open: false } : { id, open: true }
          )
        }}
        className="relative flex items-center justify-center h-6 w-6 rounded-md hover:bg-black/60 opacity-0 group-hover:opacity-100 transition"
      >
        <Image src={assets.three_dots} alt="" className="w-4" />

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 top-7 bg-[#2f3033] rounded-xl w-36 py-1 shadow-lg z-50">
            
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10">
              <Image src={assets.pencil_icon} alt="" className="w-4" />
              <p>Rename</p>
            </div>

            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 text-red-400">
              <Image src={assets.delete_icon} alt="" className="w-4" />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatLabel
