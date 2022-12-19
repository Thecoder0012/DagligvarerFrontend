import React from 'react'
import {NavLink} from "react-router-dom"
import '../css/Navbar.css';


export default function Navbar() {
  return (
    <div className='container'>
    <nav>
    <ul>
        <li> <NavLink to="/">Hjem</NavLink> </li>
        <li> <NavLink to="/products">Produkter</NavLink> </li>
        <li> <NavLink to="/delivery">Bestilling</NavLink> </li>

    </ul>

    </nav>

    </div>
  )
}
