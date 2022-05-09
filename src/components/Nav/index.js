import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navigation">
      <ul className="navigation-wrapper">
        <li className="navigation-item">
          <NavLink to="/configure" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Configure</NavLink>
        </li>
        <li className="navigation-item"><NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Profile
        </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav