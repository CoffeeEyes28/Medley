import React from "react";
import { useState, useEffect } from "react";

import Results from "./Results";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

import search from "../utils/API";

const Searchbar = () => {
  const color = grey[300];

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
        image: artist.image[3],
      }));

      
      setResults(artistData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
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

      <Results props={results} />
    </Box>
  );
};

export default Searchbar;
