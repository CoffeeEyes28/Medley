import React from 'react'
import { Box, CardContent, Typography } from '@mui/material';
import { grey } from "@mui/material/colors";


const colorGrey = grey[100];

const bull = (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      mx: '2px',
      transform: 'scale(0.8)',
    }}>

    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        Med{bull}ley
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        noun
      </Typography>
      <Typography variant="body2">
        a varied mixture of people or things; a miscellany.
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);


function About() {
  return (
    <Box>
    <Box
    sx={{
      backgroundColor: colorGrey,
      opacity: [0.8],
      borderRadius: 2,
      minWidth: '100%',
      px: 4,
      py: 1,
    }}
    >

        {card}
        </Box>
        <Box
        sx={{
          ml: '33%',
          p: 4,
          my: 25,
          maxWidth: '33%',
          maxHeight: '50%',
          display: 'flex',
          flexBasis: 'auto',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          backgroundColor: colorGrey,
          opacity: [0.8],
          borderRadius: 2,
        }}
      >
      
        <Typography>Medley is an interactive online music collection that allows users to showcase their taste to others in a quick and engaging manner.</Typography>

        <br></br>

        <Typography> As a Medley user, you can search for an artist, add an artist’s album to your Medley, curate a top four of your favorite albums, and even react to other users' Medleys.</Typography>

      </Box>

    </Box>
  )
}

export default About;