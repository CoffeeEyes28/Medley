import React from "react";
import { useState, useEffect } from "react";
import Results from "./Results";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import search from "../utils/API";
import Grid from '@mui/material/Grid';

const Searchbar = () => {
  const colorGrey = grey[100];
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await search(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
     console.log(searchInput, ' ', data)
      const artistData = data.topalbums.album.map((artist) => ({
        artist: artist.artist.name,
        album_name: artist.name,
        image: artist.image[3]["#text"],
      }));


      setResults(artistData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{
      pt: 10,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'baseline',
    }}>
      <Grid sx={{
      ml: 10,
      }}>
      <Box
        sx={{
          pt: 2,
          minWidth: 380,
          minHeight: 200,
          backgroundColor: colorGrey,
          opacity: [0.8],
          borderRadius: 2,
        }}
      >
        <Box
          component="form"
          sx={{
            

          }}
        >

          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',

          }}>

            <h2>Search an Artist </h2>


            <TextField

              id="outlined-basic"
              label="Artist Name"
              variant="outlined"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />

            <br></br>
            <Button
              sx={{ 
              width: '10ch'
             }}
              onClick={handleFormSubmit}
              size="small"
              variant="contained"
              type="submit"
              

            >
              Submit
            </Button>

          </Container>
        </Box>


      </Box>
      </Grid>
      <Results props={results} />
    </Box>
  );
};

export default Searchbar;
