import React from 'react'
import css from './header.module.scss'
import logo from '../../../assets/pokemon.png'

const Header = () => {
  return (
    <nav className={css.header}>
        <div className={css.div_header}>
            <div className={css.div_logo}>
                <img src={logo} alt="Pokemon_logo" />
            </div>
            <div className={css.div_search}>
                <input type="search" />
            </div>
        </div>
    </nav>
  )
}

export default Header