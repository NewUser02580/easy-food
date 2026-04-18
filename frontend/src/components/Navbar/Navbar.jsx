import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify"

const Navbar = ({ setShowLogin, setSearchQuery }) => {
  const [menu, setMenu] = useState("Home")
  const [showSearch, setShowSearch] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    toast.success("Logout Successfully")
    navigate("/")
  }

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    setSearchQuery(e.target.value)
  }

  const toggleSearch = () => {
    setShowSearch(prev => !prev)
    if (showSearch) {
      setSearchVal("")
      setSearchQuery("")
    }
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("Contact-Us")} className={menu === "Contact-Us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-wrap ${showSearch ? "open" : ""}`}>
          {showSearch && (
            <input
              className="navbar-search-input"
              type="text"
              placeholder="Search food..."
              value={searchVal}
              onChange={handleSearch}
              autoFocus
            />
          )}
          <img src={assets.search_icon} alt="" onClick={toggleSearch} className="nav-icon" />
        </div>
        <div className="navbar-cart-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" className="nav-icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token
          ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" className="nav-icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar