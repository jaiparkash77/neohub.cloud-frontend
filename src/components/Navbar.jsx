import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <a href="/">Neohub</a>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">Logiin</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Navbar