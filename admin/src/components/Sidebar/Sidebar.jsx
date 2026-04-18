import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { FaHome, FaPlus, FaList, FaBox } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink to="/dashboard" className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <FaHome />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/add" className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <FaPlus />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="/list" className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <FaList />
          <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <FaBox />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar