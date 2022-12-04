
// import { Divider } from '@mui/material';
import React from 'react'
import {useQuery} from '@apollo/client'
import { Navigate, useParams } from 'react-router-dom';
// import banner from "../Assets/Images/banner.jpg";
// import Searchbar from '../components/Searchbar';
import TopFour from '../components/TopFour';
import Medley from '../components/Medley';
import Reaction from '../components/Reaction';
import Auth from '../utils/auth';
import { GET_USER, GET_ME } from '../utils/queries';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Badge from "@mui/material/Badge";





const Profile = ({allowDelete}) => {
    const { username } = useParams();

    const { loading, data } = useQuery(username ? GET_USER : GET_ME, {
        variables: { username: username },
      });

     

      

      const userData = data?.me || data?.user || {};
      // navigate to personal profile page if username is yours
      if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
        return <Navigate to="/me" />;
      } 

      if (loading) {
        return <h2>LOADING...</h2>;
      }



      
    return (
        <div>
          < div className=" text-light d-flex flex-column flex-wrap justify-content-center align-content-center p-4 mb-5" style={{backgroundColor: 'rgba( 40, 40, 40, 0.8)'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h2" compent="h2"> {username ? `${userData.username}'s` : 'Your'} Medley     </Typography>
            <br></br>
            {Auth.loggedIn() ? <Reaction allowDelete={allowDelete} userData={userData} /> : userData.reactionCount >0 ? <Badge
                    aria-label={`Reactions: ${userData.reactionCount}`}
                    badgeContent={userData.reactionCount}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    color="primary"
                  >
                    <FavoriteIcon sx={{ color: "red", fontSize: 40 }} />
                  </Badge> : <Badge
                    aria-label={`Reactions: ${userData.reactionCount}`}
                    badgeContent={userData.reactionCount}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    color="primary"
                  >
                    <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                  </Badge> }
             

             
             
           
             </Box>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <TopFour allowDelete={allowDelete} userData={userData} />
            <br></br>
            <br></br>
            <Medley allowDelete={allowDelete} userData={userData}/>
        </div>

    )
}

export default Profile;