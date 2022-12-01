
// import { Divider } from '@mui/material';
import React from 'react'
// import banner from "../Assets/Images/banner.jpg";
// import Searchbar from '../components/Searchbar';
import TopFour from '../components/TopFour';
import Medley from '../components/Medley';


const Profile = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>Top Four from My Medley</h1>
            <TopFour />
            <br></br>
            <br></br>
            <h1> My Medley</h1>
            <Medley />
        </div>

    )
}

export default Profile;