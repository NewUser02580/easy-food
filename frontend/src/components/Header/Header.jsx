import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <span className="header-badge">Fresh &amp; Fast Delivery</span>
        <h2>Order your <em>favourite</em><br />food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients. Satisfy your cravings, one delicious meal at a time.</p>
        <div className="header-cta">
          <button>View Menu</button>
          <span className="header-scroll-hint">↓ scroll to explore</span>
        </div>
      </div>
      <div className="header-stats">
        <div className="stat-pill">
          <strong>50+</strong>
          <span>Dishes</span>
        </div>
        <div className="stat-pill">
          <strong>30 min</strong>
          <span>Avg. Delivery</span>
        </div>
        <div className="stat-pill">
          <strong>4.8★</strong>
          <span>Rating</span>
        </div>
      </div>
    </div>
  )
}

export default Header