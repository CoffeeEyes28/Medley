import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_RECORD } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { grey } from "@mui/material/colors";
import Auth from '../utils/auth';

const Results = (props) => {
  const colorGrey = grey[100];
  const [albumName, setAlbumName] = useState('');
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  const [saveRecord] = useMutation(SAVE_RECORD);

  const recordData = props.props

  const addToMedley = async (album_name) => {
    const recordToSave = recordData.find((record) => record.album_name === album_name);
    console.log(recordToSave)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
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
    <Box>

      {recordData.map((artist) => (
        <Box sx={{
          backgroundColor: colorGrey,
          opacity: [0.9],
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mt: 2,
          pt: 2,
          maxWidth:380,
          alignItems: 'center',
          borderRadius: 2,

        }}>
          <br></br>
          <br></br>
          <Box key={artist.album_name} sx={{ textAlign: 'center' }}>

            <img src={artist.image} alt={artist.album_name} />

            <h1>{artist.album_name}</h1>
            <p>{artist.artist}</p>


            {Auth.loggedIn() && (

              <Button
                disabled={userData.medley.some(record => artist.album_name === record.album_name)}
                onClick={() => addToMedley(artist.album_name)}>
                <Icon>
                  {userData.medley.some(record => artist.album_name === record.album_name) ? 'check_circle' : 'add_circle'}</Icon>
              </Button>
            )}

            <br></br>
          </Box>
          <br></br>
        </Box>
      ))}
      <br></br>

    </Box>


  )
}

export default Results;






