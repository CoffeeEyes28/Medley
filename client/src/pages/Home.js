// placeholder

import { Divider } from '@mui/material';
import React from 'react'
import banner from "../Assets/Images/banner.jpg";
import Searchbar from '../components/Searchbar';
import Aside from '../components/Aside';
const Home = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <Searchbar />
      <aside>
        <Aside />
      </aside>
    </div>
   
  )
}

export default Home;