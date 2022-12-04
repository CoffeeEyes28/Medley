import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

// import { Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, GET_ME } from '../utils/queries';
import { REMOVE_RECORD } from '../utils/mutations';
import Auth from '../utils/auth';
// import AlbumArt from '../components/AlbumArt';
import { SAVE_TOP } from '../utils/mutations';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
import { Container } from 'react-bootstrap';

import CssBaseline from '@mui/material/CssBaseline';
import { CardContent, CardMedia, Typography } from '@mui/material';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './medleyStyles.css';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Medley = ({ allowDelete, userData }) => {




  const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
  const [saveTop, { err }] = useMutation(SAVE_TOP);




  // create function that accepts the medley mongo _id value as param and deletes the album from the database
  const handleRemoveRecord = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log(_id)
    try {
      let data = await removeRecord({
        variables: { _id: _id },
      });
      console.log(data)

    } catch (err) {
      console.error(error);
    }
  };

  const handleSaveTop = async (input) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log(input)
    const frank = {
      artist: input.artist, album_name: input.album_name,
      image: input.image
    }
    try {
      let data = await saveTop({
        variables: { input: frank },
      });
      console.log(data)

    } catch (err) {
      console.error(error);
    }


  }



  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <React.Fragment>

      <CssBaseline />
      <Box sx={{
        pb: 15,
        mb: 15,
        // pr: 5,
        // mr: 5,
        // ml: 5,
        // pl: 5,
        pt: 5,
        mt: 5,
      }}>




        <Container className=' border border-light box pt-4 pb-4'>
          {/* <Grid className='box' sx={{
            pt: 3,
            pl: 3,
            pr: 3,
            pb: 3,
          }} container spacing={4}> */}
          {/* <Box> */}
          <Typography component="h1"
            variant="h4"
            align="start"
            color="white"
            gutterBottom>


            Saved Records:<span style={{ color: 'orange' }}> {userData.medley.length}
            </span>

          </Typography>
          {/* </Box> */}
          <ImageList className='medley ' sx={{ pt: 4 }} cols={4} rowHeight={164}>
            {userData.medley.map((medley) => {
              return (
                <CardMedia className='mediaCard1 border border-light' sx={{}} key={medley._Id} border='dark'>
                  {medley.image ? <CardMedia className='image' component="img" src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                  <CardContent>
                    <Typography className="fw-bold "
                      variant="string" component="h5">{medley.album_name}</Typography>
                    <Typography variant="body2"
                      className='pb-2'
                    >{medley.artist}
                      {allowDelete && !userData.topFour.some((record => record.album_name === medley.album_name)) && (<IconButton className='del-btn' title="Delete Record" aria-label="delete" variant="contained" sx={{ color: 'red' }} onClick={() => handleRemoveRecord(medley._id)}>
                        <RemoveCircleIcon />
                      </IconButton>)}</Typography>
                    {allowDelete && userData.topFour.length < 5 && (<Button variant="contained" size="small" hidden={userData.topFour.length >= 4 || userData.topFour.some((record => record.album_name === medley.album_name))} onClick={() => handleSaveTop(medley)}>
                      Save to topFour!
                    </Button>)}

                  </CardContent>
                </CardMedia>
              );
            })}
          </ImageList>
          {/* </Grid> */}
          {/* {!userParam && (
            <div className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}>
              <Stack direction="row" spacing={2}>
                {userData.medley.map((medley) => {
                  return (
                    <item key={medley._Id} border='dark'>
                      {medley.image ? <Card.Img src={medley.image} alt={`The cover for ${medley.artist}`} variant='top' /> : null}
                      <Card.Body>
                        <Card.Title>{medley.artist}</Card.Title>
                        <p className='small'>Album: {medley.album_name}</p>
                      </Card.Body>
                    </>
                  );
                })}
              </Stack>

            </div>
          )} */}


        </Container >
      </Box>
    </React.Fragment >

  )
}

export default Medley



