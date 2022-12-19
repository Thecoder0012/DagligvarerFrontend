import React from 'react'
import {Link} from "react-router-dom"
import '../css/Navbar.css';


export default function Navbar() {
  return (
    <div className='container'>

    <ul>
        <li> <Link to="/">Hjem</Link> </li>
        <li> <Link to="/products">Produkter</Link> </li>
    </ul>

    </div>
  )
}
