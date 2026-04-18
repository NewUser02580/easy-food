import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-header">
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
          Choose from a diverse array of dishes crafted with the finest ingredients.
          Our mission is to satisfy your cravings, one delicious meal at a time.
        </p>
      </div>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
          >
            <div className="menu-img-wrap">
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="explore-menu-divider" />
    </div>
  )
}

export default ExploreMenu;