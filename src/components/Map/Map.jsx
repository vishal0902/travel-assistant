import React, { useRef, useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";

// import { Typography, useMediaQuery } from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material";
// import LocationOnSharp from "@mui/icons-material/LocationOnSharp";
// import Rating from "@mui/material/Rating";
// import Paper from "@mui/material/Paper";

// import mapStyles from '../../mapStyles';
// import useStyles from './styles.js';

// import mapboxgl from "mapbox-gl/dist/mapbox-gl";

// const Map = ({
//   coords,
//   setCoords,
//   currentLocation,
//   setBounds,
//   places,
//   childClicked,
//   setChildClicked,
// }) => {
  
//   const mapRef = useRef();

//   const Marker = ({ children }) => children;

//   return (
//     <div style={{ height: "90%", width: "100%" }}>
//       <GoogleMapReact
        
//         ref={mapRef}
//         // onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
//         bootstrapURLKeys={{ key: "AIzaSyCaCHq3ds-8_s3urWXCuXaMsjR72vBuAKU" }}
       
//         defaultCenter={{ lat: 26.846695, lng: 80.946167 }}
//         center={{ lat: 26.846695, lng: 80.946167 }}
//         defaultZoom={14}
//         margin={[50, 50, 50, 50]}
//         // options={{ disableDefaultUI: true, zoomControl: true}
//         onChange={(e) => {
//           setCoords({ lat: e.center.lat, lng: e.center.lng });
//           setBounds({ ne: e.bounds.ne, sw: e.bounds.sw });
//         }}
//         // onChildClick={(child)=>setChildClicked(child)}
//       >
//         {places?.length && places?.map((place, i) => {
//           <Marker
//             lat={Number(place.latitude)}
//             lng={Number(place.longitude)}
//             key={i}>
//             <Paper style={{ width: "50px", height: "50px" }} elevation={3}>
//               <Typography variant="subtitle2" gutterBottom>
//                 {place.name}
//               </Typography>
//               <img src={place?.photo?.images.large.url} alt={place.name} />
//               <Rating
//                 name="read-only"
//                 size="small"
//                 value={Number(place.rating)}
//                 readOnly
//               />
//             </Paper>
//           </Marker>
//         })}
//       </GoogleMapReact>
//     </div>
//   );
// };



import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};


function MyMap({coords, currentLocation, setBounds}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCaCHq3ds-8_s3urWXCuXaMsjR72vBuAKU"
  })

  const center = {
    // lat:Number(currentLocation.lat),
    // lng:Number(currentLocation.lng)
    lat: -3.745,
    lng: -38.523
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    
    const bounds = new window.google.maps.LatLngBounds(map);
    
    console.log(bounds)
    // map.fitBounds(bounds);
    setBounds({ne:bounds.Ua, sw:bounds.Ga})
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}

        center={currentLocation}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}

      >
        { }
        <></>
      </GoogleMap>
  ) : <></>
}


export default MyMap;
