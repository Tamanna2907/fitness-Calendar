import React, { useState, useEffect } from 'react';
import logo from '../images/logo.jpg';
import { Menu, X } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState('left');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const togglePosition = () => setPosition(position === 'left' ? 'right' : 'left');
  const {isLoggedIn} = useAuth();

  useEffect(()=>{
    const handleResize =  () =>{
      if(window.innerWidth >= 768)
        closeMenu();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

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
          {isLoggedIn ? (
            <NavLink className="nav-link" to={'/Logout'}>Logout</NavLink>
          ): (
            <>
            <NavLink className="nav-link" to={'/RegistrationForm'}>Registeration</NavLink>
            <NavLink className="nav-link" to={'/Login'}>Login</NavLink>
            </>
          )}
          
          
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={togglePosition}
              className="text-white hover:text-gray-300"
            >
              {/* {position === 'left' ? 'Left' : 'Right'} */}
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
          onClick={closeMenu}
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
            onClick={closeMenu}
            className="self-end text-white hover:text-gray-300 mb-8"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col space-y-4">
          <NavLink className="nav-link" to={'/'} onClick={closeMenu}>Home</NavLink>
          <NavLink className="nav-link" to={'/Calender'} onClick={closeMenu}>Calender</NavLink>
          <NavLink className="nav-link" to={'/Log'} onClick={closeMenu}>Log</NavLink>
          <NavLink className="nav-link" to={'/Chart'} onClick={closeMenu}>Chart</NavLink>
          <NavLink className="nav-link text-white hover:text-gray-300" to={'/Notes'} onClick={closeMenu}>Notes</NavLink>
          { isLoggedIn? (
            <NavLink className="nav-link" to={'/Logout'} onClick={closeMenu}>Logout</NavLink>
            ):(<>
            <NavLink className="nav-link" to={'/RegistrationForm'} onClick={closeMenu}>Registeration</NavLink>
            <NavLink className="nav-link" to={'/Login'} onClick={closeMenu}>Login</NavLink>
          </>)}
          
          
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Navbar;
