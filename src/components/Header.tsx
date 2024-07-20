import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import logo from '../assets/logo.png'
import Image from 'next/image';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="bg-black text-white h-30 relative">
      <div className="container mx-auto flex items-center justify-between h-full relative">
        <div className="flex items-center">
        <Image
            src={logo}
            alt="logo"
            style={{height:"100%", width:"50%"}}
          />
        </div>

        <nav className="flex space-x-6" style={{marginRight:"20px"}}>
          <a href="/" className="hover:text-yellow-500 transition-colors duration-300">Home</a>
          <a href="/browse" className="hover:text-yellow-500 transition-colors duration-300">Browse</a>
          <a href="/categories" className="hover:text-yellow-500 transition-colors duration-300">Categories</a>
          <a href="/chat" className="hover:text-yellow-500 transition-colors duration-300">Chat</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
