import { Divider } from '@mui/material';
import React from 'react'
import banner from "../Assets/Images/banner.jpg";

const Header = () => {
  return (
    <header style={{ 
      backgroundImage: `url(${banner})`, backgroundSize: 100 
    }}>
      <h1 id="test">testing</h1>
    </header>
  )
}

export default Header;