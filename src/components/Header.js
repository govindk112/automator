import React, { useState } from 'react';
import logo from './image/logo.svg';
import { Link } from 'react-router-dom';
import menu from './image/menu.svg';
import './styles.css';

const Header = () => {
 
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="JobForm Automator Logo" />
      </div>
      <img id="Menu" src={menu} alt="Menu Icon" onClick={toggleMenu} />
      <nav id="navMenu" className={menuActive ? 'active' : ''}>
        <span id="closeMenu" onClick={closeMenu}>&times;</span>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/policy" onClick={closeMenu}>Policy</Link>
      </nav>
    </header>
  );
};

export default Header;
