import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-400 via-orange-600 to-orange-600 text-white shadow-md">
    <div className="container mx-auto  p-4">
      <nav className="hidden md:flex space-x-4 font-bold justify-center items-center">
        <Link to="/admin/config" className="hover:underline hover:text-black">Home</Link>
        <Link to="/admin/vote" className="hover:underline hover:text-black">Vote</Link>
      </nav>
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
    {isMobileMenuOpen && (
      <div className="md:hidden">
        <nav className="px-4 pb-4 space-y-2 text-center">
          <Link to="/admin/config" className="block text-gray-800 hover:bg-white font-bold p-2 rounded">Home</Link>
          <Link to="/admin/vote" className="block text-gray-800 hover:bg-white font-bold p-2 rounded">Vote</Link>
        </nav>
      </div>
    )}
  </header>
  )
}

export default Header