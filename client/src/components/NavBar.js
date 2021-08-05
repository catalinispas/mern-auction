import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='mainNav'>
      <Link to='/' className='mainNav-link'>
        HomePage
      </Link>
      <Link to='/newAuction' className='mainNav-link'>
        Create New Auction
      </Link>
      <Link to='Login' className='mainNav-link'>
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
