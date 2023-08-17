import * as React from "react";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header/Header";
import MyMap from "./components/Map/Map";
import { useState, useEffect, createRef } from "react";
import List from "./components/List/List";
import getPlacesData from "./ApiHandlers";





const App = () => {
 
  
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("0");

  const [bounds, setBounds] = useState(null);

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [markerId, setMarkerId] = useState(null)
  const [selected, setSelected]= useState(false)

  const [flyto, setFlyto] = useState([]);

  const [viewState, setViewState] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
    zoom: 13,
  });

  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setViewState((previewState) => ({
          ...previewState,
          latitude,
          longitude,
        }));
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlacesByRating = places?.filter(
      (place) => Number(place.rating) >= Number(rating)
    );
    setFilteredPlaces(filteredPlacesByRating);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    if(bounds){
      setPlaces(null)
      setFilteredPlaces(null)
      getPlacesData(bounds.ne, bounds.sw, type).then((data) => {
        setPlaces(data?.filter((d) => d.name));
        setFilteredPlaces(data?.filter((d) => d.name));
        setRating("0")
        setSelected(false)
        setIsLoading(false);
      });
    }
  }, [bounds, type]);


  const theme = createTheme({
    typography: {
      fontFamily: ['Montserrat', 'Roboto'].join(',')
    },
    palette: {
      type: 'light',
      primary: {
        main: '#0f4852',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  const [markerRefs, setMarkerRefs] = useState();

  useEffect(() => {
    setMarkerRefs((refs) => Array(places?.length).fill().map((_, i) => createRef()));
  }, [places]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2}  style={{}}>

        <Grid item xs={12} md={12} >
         <Header setFlyto={setFlyto} setViewState={setViewState} setRating={setRating}/>
        </Grid>

        <Grid item xs={12} md={4} >
          <List
            isLoading={isLoading}
            filteredPlaces={filteredPlaces}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            setMarkerRefs={setMarkerRefs}
            markerRefs={markerRefs}
            selected={selected}
            setSelected={setSelected}
            markerId= {markerId}

          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          >
          <MyMap
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            viewState={viewState}
            setViewState={setViewState}
            bounds={bounds}
            setBounds={setBounds}
            filteredPlaces={filteredPlaces}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            setSelected={setSelected}
            setMarkerId = {setMarkerId}
            flyto = {flyto}
            setPlaces= {setPlaces}

          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
