'use client'; // Required because this component uses state/props

import { assets } from '@/assets/assets' // Import icons/images
import Image from 'next/image' // Next.js optimized image
import React, { useState } from 'react'
import { useClerk,UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setExpand }) => {

  const {openSignIn} = useClerk() ;
  const {user} = useAppContext();
  const [openMenu,setOpenMenu] = useState({id:0,open:false})

  return (
    // Outer container: flex column, full height, responsive, smooth transitions
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50
                  max-md:absolute max-md:h-screen
                  ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>

      {/* Top section: logo + toggle + navigation */}
      <div>
        <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>

          {/* Logo: full text when expanded, icon when collapsed */}
          <Image
            className={expand ? "w-36" : "w-10"}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="Logo"
          />

          {/* Sidebar toggle button */}
          <div
            onClick={() => setExpand(!expand)} // Correct toggle logic
            className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'
          >
            {/* Hamburger icon for mobile */}
            <Image src={assets.menu_icon} className='md:hidden' alt='Menu' />

            {/* Toggle icon for desktop */}
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              className='hidden md:block w-7'
              alt='Toggle Sidebar'
            />

            {/* Tooltip text */}
            <div
              className={`absolute w-max 
                          ${expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'} 
                          opacity-0 group-hover:opacity-100 
                          transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close sidebar' : 'Open sidebar'}

              {/* Tooltip arrow */}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 
                            ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'}`}
              />
            </div>
          </div>
        </div>

        {/* New Chat button */}
        <button
          className={`
            relative flex items-center gap-3 mt-8
            ${expand 
              ? 'bg-primary hover:opacity-90 rounded-2xl p-2.5 w-max justify-start' 
              : 'bg-primary hover:opacity-90 rounded-lg h-9 w-9 mx-auto flex justify-center items-center'}
            transition-all duration-300
          `}
        >
          {/* Icon changes when expanded/collapsed */}
          <Image
            className={expand ? 'w-6' : 'w-5'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt='New Chat'
          />

          {/* Label shown only when sidebar is expanded */}
          {expand && <p className='text-white font-medium'>New Chat</p>}
        </button>
      </div>

<div className={`mt-8 ${expand ? 'block' : 'hidden'}`}>
  <p className="text-white/40 text-sm mb-2">Recent</p>

  <ChatLabel
    id={1}
    title="Chat Name Here"
    openMenu={openMenu}
    setOpenMenu={setOpenMenu}
  />
</div>

      {/* Bottom section: QR scanner */}
    <div className="pb-4">
    <div
        className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer
        hover:bg-white/5 transition-all duration-300
        ${expand ? 'justify-start' : 'justify-center'}
        `}
    >
        {/* Phone icon */}
        <Image
        src={expand ? assets.phone_icon : assets.phone_icon_dull}
        alt="Mobile App"
        className="w-6"
        />

        {/* Text + QR only when expanded */}
        {expand && (
        <div className="flex items-center gap-3">
            {/* QR image */}
            <div className="bg-white p-1 rounded-md">
            <Image
                src={assets.qrcode}
                alt="QR Code"
                className="w-14 h-14"
            />
            </div>

            {/* Text */}
            <p className="text-sm text-gray-300 leading-snug">
            Scan to get <br />
            <span className="text-white font-medium">DeepSeek App</span>
            </p>
        </div>
        )}
    </div>
    </div>

    <div onClick={user ? null: openSignIn} className={` flex items-center ${expand? 'hover:bg-white/10 rounded-lg':'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`} >
    {user ? <UserButton/>:  <Image  src={assets.profile_icon} alt='' className='w-7'/>
        }
      {expand && <span> My Profile</span>}
    </div>

    </div>
  )
}

export default Sidebar
