// placeholder

import { Divider } from '@mui/material';
import React from 'react'
import banner from "../Assets/Images/banner.jpg";
import Searchbar from '../components/Searchbar';
import TopFour from '../components/TopFour';

const Profile = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <Searchbar />
            <br></br>
            <h1>Top Four from My Medley</h1>
            <TopFour />
            <br></br>
            <br></br>
        </div>

    )
}

export default Profile;