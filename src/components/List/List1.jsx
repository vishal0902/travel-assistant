import React from "react";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";


function List({
  isLoading,
  setType,
  rating,
  type,
  filteredPlaces: places,
  setRating,
  markerRefs,
  setSelected,
  markerId
}) {



  return (
    <div
      container
      style={{
        height: "80%",
        width: "100%",
        marginTop: "0rem",
        marginLeft: "2rem",
        paddingRight: "0.5rem",
      }}>
      <Typography variant="h6">
        Find Restaurants, Hotels & Attractions Around  
      </Typography>

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
          onChange={(e) => setRating(Number(e.target.value))}>
          <MenuItem value="0">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <div style={{marginLeft:'2.5rem'}}>
      {isLoading ? (
        <div style={{marginTop:'5rem', width:'75%', justifyItems:'center',justifyContent:'center' }}>
          {/* <LinearProgress style={{marginTop:'3rem', height:'20px', borderRadius:'5px'}}  color="secondary" />
          <LinearProgress style={{marginTop:'3rem', height:'20px', borderRadius:'5px'}} color="success" />
          <LinearProgress style={{marginTop:'3rem', height:'20px', borderRadius:'5px'}}  color="secondary" /> */}
          <CircularProgress color="success" style={{width:'250px', height:'250px'}} />
        </div>
      ) : (
        <Grid
          container
          spacing={5}
          style={{ maxHeight:'55vh', justifyContent:'center', justifyItems:'center', marginTop: "30px", overflow: "auto" }}>
          
          {places?.length
            ? places.map((place, i) => (
                <Grid key={i} ref={markerRefs[i]} item xs={12}>
                  <PlaceDetails markerRefs= {markerRefs[i]} selected={markerId===i} setSelected={setSelected} place={place} />
                </Grid>
              ))
            : null}
        </Grid>
      )}
      </div>
    </div>
  );
}

export default List;
