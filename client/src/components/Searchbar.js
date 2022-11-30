import React from "react";
import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { SAVE_RECORD } from '../utils/mutations';



import Results from "./Results";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

import search from "../utils/API";
import Auth from '../utils/auth';

const Searchbar = () => {
  const color = grey[300];

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

const [saveRecord] = useMutation(SAVE_RECORD);





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

  const addToMedley = async (album_name) => {
    const recordToSave = results.find((record) => record.album_name === album_name);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if(!token) {
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
    <Box
      sx={{
        width: 400,
        height: 400,
        backgroundColor: color,
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="outlined-basic"
          label="Artist Name"
          variant="outlined"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <br></br>
        <Button
          onClick={handleFormSubmit}
          size="small"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Box>

      <Results props={results}  />
    </Box>
  );
};

export default Searchbar;
