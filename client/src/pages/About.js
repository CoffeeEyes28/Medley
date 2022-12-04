import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
      <Card
        sx={{
          backgroundColor: colorGrey,
          opacity: [0.8],
        }}
        variant="outlined">
        {card}
      </Card>

      <Box
        sx={{
          mt: 15,
          mb: 30,
          ml: 50,
          mr: 50,
          p: 8,
          textAlign: 'center',
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