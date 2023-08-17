import React, { useRef, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Typography, Paper, Rating, useMediaQuery } from "@mui/material";
import {LocationOnOutlined} from "@mui/icons-material"

const Map = ({
  setMarkerId,
  isLoading,
  setIsLoading,
  bounds,
  setBounds,
  filteredPlaces: places,
  setViewState,
  viewState,
  flyto,
  setPlaces
}) => {
  const mapRef = useRef();

  const isDesktop = useMediaQuery('(min-width:600px)');


  // const MAPBOX_TOKEN =
  //   "pk.eyJ1IjoidmlzaGFsMDkwMiIsImEiOiJjbGwzazI3c3cwbDN5M2VvNWgxdml0YmpqIn0.dBApM58ZU2qFgFs4P_ejdw";

  // useEffect(() => {
  //   if (bounds) {
  //     const { _ne, _sw } = mapRef.current.getMap().getBounds();
  //     setBounds({ ne: _ne, sw: _sw });
  //   }
  // }, [viewState]);


  useEffect(() => {
    if (bounds) {
    // console.log({flyto})
    // setIsLoading(true)
      mapRef.current.flyTo({center:[flyto[1], flyto[0]], speed:0.8, curve:1, essential: true})
      // setTimeout(()=>{
      //   const { _ne, _sw } = mapRef.current.getMap().getBounds();
      //   setBounds({ ne: _ne, sw: _sw });
      // },100)
      
      // setTimeout(()=>{
      //   setIsLoading(false)
      // },500)


    }
  }, [flyto]);


  return (
    <div style={{ width: "100%", height:'85vh' }}>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewState}
        
        
        mapStyle="mapbox://styles/mapbox/streets-v9"
        
        onLoad={(evt) => {
          setViewState(evt.viewState);
          const { _ne, _sw } = mapRef.current.getMap().getBounds();
          setBounds({ ne: _ne, sw: _sw });
          console.log('onload')
        }}
        
        onMoveEnd={(evt) => {
          // setViewState(evt.viewState);
          const { _ne, _sw } = mapRef.current.getMap().getBounds();
          setBounds({ ne: _ne, sw: _sw });
          console.log('onMoveEnd')

        }}

        

        // onDragEnd={(evt) => {
        //   setViewState(evt.viewState);
        //   const { _ne, _sw } = mapRef.current.getMap().getBounds();
        //   setBounds({ ne: _ne, sw: _sw });
        // }}

        ref={mapRef}>
        
        {!isLoading &&
          places?.map((place, index) => (
            <Marker
              key={index}
              latitude={place.latitude}
              longitude={place.longitude}
              onClick={() => {
                setMarkerId(index);
                console.log(index);
              }}>
              {
                !isDesktop ? <LocationOnOutlined /> : <Paper
                elevation={5}
                style={{
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "120px",
                }}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  style={{ cursor: "pointer" }}
                  alt={place.name}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://i.pinimg.com/736x/23/75/72/237572284635fd45ef5dc45b8b7559e5.jpg"
                  }
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
              }
              
            </Marker>
            
            

          ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
