
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
             <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
            Viewing {username ? `${userData.username}'s` : 'your'} profile.
          </h2>
            <Reaction allowDelete={allowDelete} userData={userData} />
            <br></br>
            <br></br>
            <br></br>
            <h1>Top Four from My Medley</h1>
            <TopFour allowDelete={allowDelete} userData={userData} />
            <br></br>
            <br></br>
            <h1> My Medley</h1>
            <Medley allowDelete={allowDelete} userData={userData}/>
        </div>

    )
}

export default Profile;