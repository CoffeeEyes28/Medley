import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import AlbumArt from '../components/AlbumArt';
// import { SAVE_TOP} from '../utils/mutations';
// import Auth from '../utils/auth';


const TopFour = () => {
    const { data } = useQuery(GET_ME); 
    const userData = data?.me || [];
    console.log(userData)
    return (
    <div>
        {userData.topFour.map((four, i) => {
            if (i <= 3){
                return <AlbumArt image = {four.image} />
            }
        })}
    </div>
  )
}

export default TopFour;