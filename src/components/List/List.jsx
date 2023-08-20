import React from "react";
import * as turf from '@turf/turf';
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Item,
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
  markerId,
  currentLocation
}) {


  const calculateDistance = (latitude, longitude)=> {
    const distance = turf.distance(
      turf.point([longitude, latitude]),
      turf.point([currentLocation.lng,currentLocation.lat]),
      {units:"kilometers"}
    )
    // console.log(typeof distance)
    return distance.toFixed(2);

  }



  return (
    <div>
      <Grid container spacing={2} direction="column" align="center">
        <Grid style={{maxHeight:'4vh'}} item xs={12} md={12}>
          <Typography variant="h6">
            Find Restaurants & Attractions Around
          </Typography>
        </Grid>

        <Grid style={{maxHeight:'10vh'}} item xs={12} md={12}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="">Hotels</MenuItem>
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
        </Grid>

        <Grid item xs={12} md={12} style={{marginTop:'2rem'}}>
            {isLoading ? (

                <CircularProgress
                  color="success"
                  style={{ width: "250px", height: "250px", marginTop:'3rem' }}
                />
            ) : (
              <Grid
                container
                spacing={3}
                style={{
                  maxHeight: "71vh",

                  overflow: "auto",
                }}>
                {places?.length
                  ? places.map((place, i) => (
                      <Grid item key={i} ref={markerRefs[i]} xs={12} md={12}>
                        <PlaceDetails
                          markerRefs={markerRefs[i]}
                          selected={markerId === i}
                          setSelected={setSelected}
                          place={place}
                          distance = {calculateDistance(place.latitude,place.longitude)}
                        />
                      </Grid>
                    ))
                  : null}
              </Grid>
            )}
        </Grid>
      
      </Grid>
    </div>
  );
}

export default List;
