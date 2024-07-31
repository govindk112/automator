import React from 'react';
import logo from './image/logo.svg';
import telegram from './image/telegram.svg';
import instagram from './image/instagram.svg';
import linkedin from './image/linkedin.svg';
import youtube from './image/youtube.svg';
import './styles.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="newsletter">
          <img src={logo} alt="JobForm Automator Logo" className="footer-logo" />
          <h3>Email</h3>
          <p>contact@jobformautoator.com</p>
          <h3>Whatsapp</h3>
          <p>+91 9766116839</p>
        </div>
        <div className="footer-links">
          <p>&copy; 2022 Aiking Software Solutions Pvt Ltd</p>
        </div>
        <div className="social-icons">
          <a href="#"><img src={telegram} alt="Telegram" /></a>
          <a href="#"><img src={instagram} alt="Instagram" /></a>
          <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
          <a href="#"><img src={youtube} alt="YouTube" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
