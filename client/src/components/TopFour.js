import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
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