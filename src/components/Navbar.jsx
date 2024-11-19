import React, { useState } from 'react';
import logo from '../images/logo.jpg';
import { Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState('left');

  const toggleMenu = () => setIsOpen(!isOpen);
  const togglePosition = () => setPosition(position === 'left' ? 'right' : 'left');

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="signatureBg p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-bold text-xl">
          <a className="applogo" href="/"><img src={logo} alt="Logo" /></a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
          <NavLink className="nav-link" to={'/'}>Home</NavLink>
          <NavLink className="nav-link" to={'/Calender'}>Calender</NavLink>
          <NavLink className="nav-link" to={'/Log'}>Log</NavLink>
          <NavLink className="nav-link" to={'/Chart'}>Chart</NavLink>
          <NavLink className="nav-link" to={'/Notes'}>Notes</NavLink>
          <NavLink className="nav-link" to={'/RegistrationForm'}>Registeration</NavLink>
          <NavLink className="nav-link" to={'/Login'}>Login</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={togglePosition}
              className="text-white hover:text-gray-300"
            >
              {position === 'left' ? 'Left' : 'Right'}
            </button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 ${
          position === 'left' ? 'left-0' : 'right-0'
        } h-full w-64 signatureBg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4">
          <button
            onClick={toggleMenu}
            className="self-end text-white hover:text-gray-300 mb-8"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col space-y-4">
          <NavLink className="nav-link" to={'/'}>Home</NavLink>
          <NavLink className="nav-link" to={'/Calender'}>Calender</NavLink>
          <NavLink className="nav-link" to={'/Log'}>Log</NavLink>
          <NavLink className="nav-link" to={'/Chart'}>Chart</NavLink>
          <NavLink className="nav-link text-white hover:text-gray-300" to={'/Notes'}>Notes</NavLink>
          <NavLink className="nav-link" to={'/RegistrationForm'}>Registeration</NavLink>
          <NavLink className="nav-link" to={'/Login'}>Login</NavLink>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Navbar;
