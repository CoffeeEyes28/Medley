import React from "react";
import { useState, useEffect } from "react";
// import { useQuery, useMutation } from '@apollo/client';
// import { SAVE_RECORD } from '../utils/mutations';
import Results from "./Results";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
// import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import search from "../utils/API";
// import Auth from '../utils/auth';

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
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'baseline',
    }}>
      <Box
        sx={{
          pt: 2,
          ml: '6%',
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
      <Results props={results} />
    </Box>
  );
};

export default Searchbar;
