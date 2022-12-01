import React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import AlbumArt from '../components/AlbumArt';
import { SAVE_TOP } from '../utils/mutations';
import { UPDATE_TOP } from '../utils/mutations';



export default TopFour;

// The below works for sure but it's consolidated. testing for saveTop and updateTop by delving in
//  const TopFour = () => {
//     const { loading, data } = useQuery(GET_ME); 
//     const userData = data?.me || [];
//     console.log(userData)
//     return (
//     <div>
//         {userData.medley.map((four, i) => {
//             if (i <= 3){
//                 return <AlbumArt image = {four.image} />
//             }
//         })}
//     </div>
//   )
// }