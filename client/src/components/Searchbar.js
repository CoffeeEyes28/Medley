import React from "react";
import { useState, useEffect } from "react";
import Results from "./Results";
import { grey } from "@mui/material/colors";
import search from "../utils/API";
import { Grid, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

const Searchbar = () => {

  const lightGrey = grey[300];
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
    <Grid container direction="row" justifyContent="center" alignItems="flex-start"
      sx={{
        p: 2,
        m: 1
      }}>
      <Grid item sx={{
        backgroundColor: lightGrey,
        opacity: [0.9],
        textAlign: 'center',
        width: 500,
        m: 6,
        p: 4,
        borderRadius: 6,
        display: 'flex-wrap',
      }}>
        <Typography variant="h5" color='black'
          sx={{
            m: 1
          }}>
          Search an Artist</Typography>
        <TextField id="filled-basic"
          label="Artist Name"
          variant="filled"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          sx={{
            width: '100%',
            borderRadius: 2
          }}
        />
        <Button sx={{
          width: '50%',
          m: 1
        }}
          onClick={handleFormSubmit}
          size="small"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Grid>
      <Results props={results} />
    </Grid >
  );
};

export default Searchbar;
