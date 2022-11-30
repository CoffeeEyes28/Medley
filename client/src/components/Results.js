import React from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_RECORD } from '../utils/mutations';

import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button';


import Auth from '../utils/auth';




const Results = (props) => {


const [saveRecord] = useMutation(SAVE_RECORD);




const data = props.props

const addToMedley = async (album_name) => {
    const recordToSave = data.find((record) => record.album_name === album_name);
    console.log(recordToSave)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
      return false;
    }

    try {
      await saveRecord({
        variables: { input: recordToSave },
      })
    } catch (err) {
      console.error(err)
    }


  };

    return (
        <div>
        {data.map((artist) => (

            <div key={artist.album_name}>
                <h1>{artist.artist}</h1>
                <h2>{artist.album_name}</h2>
                <img src={artist.image} alt={artist.album_name}/>
                <br></br>
                {Auth.loggedIn() && (
                     <Button onClick={() => addToMedley(artist.album_name)}><Icon>add_circle</Icon></Button>
                )}
               
            </div>

        ))}


</div>
       
    )
}

export default Results;






