import React from "react";

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

function List({ setType, rating, type, places }) {
  

  return (
    <div container style={{ maxHeight: "90%", width:'100%', marginTop:'1rem', marginLeft:'2rem', paddingRight:'0.5rem' }}>
      <Typography variant="h5" >Restaurants, Hotels & Attractions around you</Typography>
      

     






        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="rating">Rating</InputLabel>
          <Select
            id="rating"
            value={rating}
            >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="3">Above 3.0</MenuItem>
            <MenuItem value="4">Above 4.0</MenuItem>
            <MenuItem value="4.5">Above 4.5</MenuItem>
          </Select>
        </FormControl>
      

      <Grid
        container
        spacing={3}
        style={{ maxHeight: "70vh", marginTop:'20px', overflow: "auto" }}>
        {places?.length ? places.map((place, i) => (
          <Grid key={i} item xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        )):null}
      </Grid>
    </div>
  );
}

export default List;
