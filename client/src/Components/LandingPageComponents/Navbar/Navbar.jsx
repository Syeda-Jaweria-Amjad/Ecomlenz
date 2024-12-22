import React, { useState } from 'react'
import logo from "../../Images/ecomlenslogo1.png"
// import { Link } from 'react-router-dom'



import { Link } from 'react-scroll'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="z-50 bg-white">
      <div className="w-10/12 m-auto fixed left-0 right-0 bg-white top-10 rounded-2xl">
        <div className="flex justify-between border p-3 rounded-2xl border-gray-300">
          {/* Logo */}
          <div className="py-1 ps-2 cursor-pointer">
            <img src={logo} alt="Logo" className="h-16" />
          </div>

          {/* Hamburger menu button for tablet and mobile */}
          <div className="lg:hidden flex items-center bg-white">
            <button
              className="text-3xl"
              onClick={() => setIsOpen(!isOpen)} // Toggle menu
            >
              &#9776; {/* Hamburger icon */}
            </button>
          </div>

          {/* Links for larger screens (lg and above) */}
          <div className={`hidden lg:flex gap-8 text-lg lg:text-2xl font-medium text-gray-800 pt-3 cursor-pointer`}>
            <Link to="benefits" smooth={true} duration={500}>
              <div className="font-inter">Pros</div>
            </Link>
            <Link to="working" smooth={true} duration={500}>
              <div>Explore</div>
            </Link>
            <Link to="pricing" smooth={true} duration={500}>
              <div>Subscriptions</div>
            </Link>
            <Link to="faq" smooth={true} duration={500}>
              <div>FAQ</div>
            </Link>
          </div>

          {/* Sign Up & Login buttons for larger screens */}
          <div className="hidden lg:flex gap-3 lg:justify-items-center">
            <a href="/signup">
              <button className="border border-gray-300 px-3 py-2 rounded-xl font-medium text-lg hover:bg-gray-50">
                Sign Up
              </button>
            </a>
            <a href="/login">
              <button className="border border-gray-300 px-4 py-2 rounded-xl bg-black text-white font-medium text-lg hover:bg-gray-800">
                Login
              </button>
            </a>
          </div>

          {/* Collapsed menu for tablet and mobile (visible when isOpen is true) */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } flex-col lg:hidden absolute top-20 left-0 w-full bg-white rounded-lg shadow-lg p-5 z-40`}
          >
            <Link to="benefits" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
              <div className="py-2">Pros</div>
            </Link>
            <Link to="working" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
              <div className="py-2">Explore</div>
            </Link>
            <Link to="pricing" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
              <div className="py-2">Subscriptions</div>
            </Link>
            <Link to="faq" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
              <div className="py-2">FAQ</div>
            </Link>

            {/* Sign Up & Login buttons for tablet and mobile */}
            <div className="flex flex-col mt-4 gap-3">
              <a href="/signup">
                <button className="border border-gray-300 px-3 py-2 rounded-xl font-medium text-lg hover:bg-gray-50">
                  Sign Up
                </button>
              </a>
              <a href="/login">
                <button className="border border-gray-300 px-4 py-2 rounded-xl bg-black text-white font-medium text-lg hover:bg-gray-800">
                  Login
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  

  )
}

export default Navbar
