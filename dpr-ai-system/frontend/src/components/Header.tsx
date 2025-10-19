import React from 'react';
import { BsSearch, BsJustify, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';

function Header() {
  return (
    <header className='header'>
        {/* Menu icon - only visible on smaller screens */}
        <div className='menu-icon'>
            <BsJustify className='icon' />
        </div>
        {/* Left side - Search icon */}
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        {/* Right side - Action icons */}
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header;