import React from 'react';
// import {  Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
// import { SAVE_TOP } from '../utils/mutations';
// import { UPDATE_TOP } from '../utils/mutations';
// import Auth from '../utils/auth';
import AlbumArt from '../components/AlbumArt';

const TopFour = () => {
    const { loading, data } = useQuery(GET_ME); 
    const userData = data?.me || [];
    console.log(userData)
    return (
    <div>
        {userData.medley.map((four, i) => {
            if (i <= 3){
                return <AlbumArt image = {four.image} />
            }
        })}
    </div>
  )
}

export default TopFour;
