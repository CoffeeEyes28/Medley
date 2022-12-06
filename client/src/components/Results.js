import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_RECORD } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Icon from '@mui/material/Icon'
import { Grid, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box'
import { grey } from "@mui/material/colors";
import Auth from '../utils/auth';

const Results = (props) => {
  const lightGrey = grey[300];
  const [albumName, setAlbumName] = useState('');
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];
  const [saveRecord] = useMutation(SAVE_RECORD);

  const recordData = props.props

  const addToMedley = async (album_name) => {
    const recordToSave = recordData.find((record) => record.album_name === album_name);

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
    <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-start">

      {recordData.map((artist) => (
        !artist.image || !artist.artist || !artist.album_name ? null :
          <Box sx={{
            backgroundColor: lightGrey,
            opacity: [0.85],
            justifyContent: 'center',
            my: 2,
            py: 2,
            width: 350,
            height: 540,
            alignItems: 'center',
            borderRadius: 2,
          }}>
            <Box key={artist.album_name} sx={{ textAlign: 'center' }}>

              <img src={artist.image} alt={artist.album_name} />
              <Typography variant="h5" color='black'
                sx={{
                  mt: 2,
                  mx:2
                }}>{artist.album_name}</Typography>
              <Typography variant="body1" color='black'
                sx={{
                  mb:2,
                  mx: 2
                }}>{artist.artist}</Typography>

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

    </Grid>


  )
}

export default Results;






