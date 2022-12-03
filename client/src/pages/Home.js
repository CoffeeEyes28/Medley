import { Divider } from '@mui/material';
import React from 'react'
import banner from "../Assets/Images/banner.jpg";
import Searchbar from '../components/Searchbar';
import Aside from '../components/Aside';
import Container from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <Container>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Searchbar />

        <aside style={{ float: "right" }}>
          <Aside />

        </aside>

      </Grid>

    </Container>
  )
}
export default Home;