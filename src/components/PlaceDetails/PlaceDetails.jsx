import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box, Chip } from "@mui/material";
import Rating from "@mui/material/Rating";
import { PhoneAndroidOutlined, LocationOnOutlined } from "@mui/icons-material/";

export default function PlaceDetails({
  place,
  markerRefs,
  selected,
  setSelected,
  distance
}) {
  // console.log('mera nam')
  if (selected) {
    markerRefs?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelected(false);
  }

  const imgUrl = place.photo
    ? place.photo.images.large.url
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSKVVZG-RdhvhVKnfAGBSj2r0034dhY6YBqL8DoHn1fg&s";
  return (
    <Card elevation={7} sx={{ maxWidth: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={imgUrl}
          alt={place.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={1}>
            <Rating
              name="read-only"
              size="small"
              value={Number(place?.rating)}
              readOnly
            />
            <Typography component="legend">
              {place.num_reviews} review{place.num_reviews > 1 && "s"}
            </Typography>
          </Box>

          {/* <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price}
          </Typography>
        </Box> */}

          <Box display="flex" justifyContent="space-between">
            <Typography component="legend" variant="subtitle2">
              Ranking
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {place.ranking}
            </Typography>
          </Box>

          



          {place?.cuisine?.map(({ name }) => (
            <Chip
              gutterBottom
              justifyContent="space-between"
              style={{ marginRight: "4px", marginBottom: "4px" }}
              key={name}
              size="small"
              label={name}
            />
          ))}

          {place.address && (
            <Box display="flex" justifyContent="space-between" my={1}>
              <LocationOnOutlined variant="body2" />

              <Typography gutterBottom justifyContent="right" variant="body2">
                {place.address}
              </Typography>
            </Box>
          )}
          
          <Box display="flex" justifyContent="center" my={1}>
          <Typography variant="subtitle2">Distance : {distance} Kms. </Typography>
          </Box>

          {place.phone && (
            <Box display="flex" justifyContent="left" my={0}>
              <PhoneAndroidOutlined variant="body2" />

              <Typography gutterBottom variant="body2">
                {place.phone}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions my={0}>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}>
          Trip Advisor
        </Button>
        {place.website ? (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}>
            Website
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

