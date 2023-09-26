import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Navigation.module.scss'

const Navigation: React.FC = () => {
  return (
    <nav className={style.links}>
      <NavLink
        to='/ipLookup'
        className={({ isActive }) => (isActive ? style.selected : style.unselected)}
      >
        Ip Lookup
      </NavLink>
      <NavLink
        to='/imageToText'
        className={({ isActive }) => (isActive ? style.selected : style.unselected)}
      >
        Image To Text
      </NavLink>
    </nav>
  )
}

export default Navigation
