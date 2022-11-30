import { Divider } from '@mui/material';
import React from 'react'
import banner from "../Assets/Images/banner.jpg";

const Header = () => {
  return (
    <header style={{ 
      backgroundPosition: '0px 0px',
      backgroundImage: `url(${banner})`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: '55%',
      height: '25vh',
      backgroundColor: 'white',
    }}>
      <h2>navBar Here</h2>
    </header>
  )
}

export default Header;