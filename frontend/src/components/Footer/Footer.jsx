import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="EasyFood" />
          <p>Delicious food delivered to your door. Fresh ingredients, great taste, every time.</p>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 9876543210</li>
            <li>contact@easyfood.com</li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <p className="footer-copyright">© 2025 EasyFood.com — All rights reserved.</p>
        <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="Facebook" />
          <img src={assets.twitter_icon} alt="Twitter" />
          <img src={assets.linkedin_icon} alt="LinkedIn" />
        </div>
      </div>
    </div>
  )
}

export default Footer