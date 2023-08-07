import * as React from "react";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./components/Header/Header";
import MyMap from "./components/Map/Map";
import { useState, useEffect } from "react";
import List from "./components/List/List";
import getPlacesData from "./ApiHandlers";

const App = () => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [currentLocation, setCurrentLocation] = useState({})

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [places, setPlaces] = useState([]);


  const [childClicked, setChildClicked] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
        setCurrentLocation({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect( () => {
       bounds && getPlacesData(bounds.ne, bounds.sw)
      .then((data)=>{
        setPlaces(data?.filter((d)=>d.name))
      })
 
  }, [bounds]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ height: "90vh", width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} type={type} setType={setType} rating={rating} setRating={setRating}/>
          {/* <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          /> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <MyMap
            coords={coords}
            setCoords={setCoords}
            bounds={bounds}
            setBounds={setBounds}
            places={places} 
            currentLocation =  {currentLocation}
            childClicked= {childClicked}
            setChildClicked = {setChildClicked}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
