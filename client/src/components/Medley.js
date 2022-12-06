import React from 'react';
import { useMutation} from '@apollo/client';
import { useState, useEffect } from 'react';
import { REMOVE_RECORD } from '../utils/mutations';
import Auth from '../utils/auth';
import { SAVE_TOP } from '../utils/mutations';
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import { CardContent, CardMedia, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import './medleyStyles.css';



const Medley = ({ allowDelete, userData }) => {

  let [ width, setWidth] = useState(window.innerWidth)
  const [column, setColumn] = useState(4);

  const [removeRecord, { error }] = useMutation(REMOVE_RECORD);
  const [saveTop] = useMutation(SAVE_TOP);


  useEffect(() => {
    window.addEventListener('resize', handleResize)
  },[])

  // function wiil resize columns when window is changed
const handleResize = () => {
  const winWidth = window.innerWidth
  setWidth(winWidth)
  if (winWidth<700){
      setColumn(2)
  }
  else if(winWidth>700){
      setColumn(4)
  }
}




  // create function that accepts the medley mongo _id value as param and deletes the album from the database
  const handleRemoveRecord = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
  
    try {
      let data = await removeRecord({
        variables: { _id: _id },
      });
   
    } catch (err) {
      console.error(error);
    }
  };


  const handleSaveTop = async (input) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
   
    const frank = {
      artist: input.artist, album_name: input.album_name,
      image: input.image
    }
    try {
      let data = await saveTop({
        variables: { input: frank },
      });
  

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
          <Typography component="h1"
            variant="h4"
            color="white"
            gutterBottom>


            Saved Records:<span style={{ color: 'orange' }}> {userData.medley.length}
            </span>

          </Typography>
          {/* </Box> */}
          <ImageList className='medley ' sx={{ pt: 4 }} cols={column} rowHeight={164}>
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
                    {allowDelete && userData.topFour.length < 5 && (<Button className='text-dark border-white' sx={{ bgcolor: 'lightgrey' }}  variant="outlined" size="small" hidden={userData.topFour.length >= 4 || userData.topFour.some((record => record.album_name === medley.album_name))} onClick={() => handleSaveTop(medley)}>
                      Save to Top Four!
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



