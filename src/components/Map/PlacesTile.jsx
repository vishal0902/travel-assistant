import React from 'react'
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Chip } from '@mui/material';
import Rating from '@mui/material/Rating';

import Paper from '@mui/material/Paper';

function PlacesTile({places}) {
  return (
    <div>
    
    {places.length && places.map((place, i) => (
          <div
           
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
           
               (
                <Paper elevation={3} >
                  <Typography  variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    alt ={place.name}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
          </div>
        ))}
    
    </div>
  )
}

export default PlacesTile

