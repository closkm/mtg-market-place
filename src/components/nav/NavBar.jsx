import React from 'react';
import { Link } from "react-router-dom"
import '../Index.css'



function NavBar() {
  return (
    <footer className='navbar'>
<nav className="navbarNav">

  <ul className='navbarListItems'>
    <li className='navbarListItem active'>
        <Link className='navbar_link' to='/market'>Market</Link>
    </li>
    <li className='navbarListItem'>
        <Link className='navbar_link' to='/cart'>Cart</Link>
    </li>
      {/* <li className='navbarListItem'>
          <Link className='navbar_link' to='/sell'>Sell</Link>
      </li> */}
  </ul>
</nav>
</footer>
  )
}

export default NavBar;
