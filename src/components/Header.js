import React from 'react';
import logo from './image/logo.svg';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="JobForm Automator Logo" />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/guide">Guide</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;
