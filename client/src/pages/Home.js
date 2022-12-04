// import { Divider } from '@mui/material';
import React from 'react'
// import banner from "../Assets/Images/banner.jpg";
import Searchbar from '../components/Searchbar';
import Aside from '../components/Aside';
// import Container from '@mui/material/Box';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    // <Container>
    <Grid container direction='row' justifyContent='space-evenly' alignItems='baseline'
      sx={{
        my:4
      }}>
      <Grid item sx={{
        width: 900
      }}>
        <Searchbar />
      </Grid>
      <Grid item sx={{
        width: 1000
      }}>
        <Aside />
      </Grid>
    </Grid>

    // </Container>
  )
}
export default Home;