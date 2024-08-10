import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
          <div className="logo-container">

            <a href = "/" className="logo-link">
            <div className="logo"></div>
            <span>NYUROPRINT</span>
            </a>

          </div>
          <nav className="navigation">
          <a href="/about">
            <button className="nav-button">About us</button> 
          </a>
          <a href="/started">
            <button className="nav-button-2">Get started</button>
          </a>
          </nav>
        </header>
    );
};

export default Header;