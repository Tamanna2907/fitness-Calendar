import React from 'react';
import logo from '../images/logo.jpg';
import { NavLink, Outlet } from 'react-router-dom'; 



function Navbar() {
    return (
        <>

        <div className='mt-1 p-2 text-center text-bold topBar'>
        <a className="applogo" href="/"><img src={logo} alt="Logo" /></a>
        </div>
            <nav className="navbar navbar-dark navbar-expand-md signatureBg">
                <div className="container-fluid">
                    <a className="navbar-brand applogo secondBar" href="/"><img src={logo} alt="Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse text-white" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/Calender'}>Calender</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/Log'}>Log</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/Chart'}>Chart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/Notes'}>Notes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/RegistrationForm'}>Registeration</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/Login'}>Login</NavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>

        </>
    )
}


export default Navbar;