import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import {Autocomplete} from '@react-google-maps/api'

import SearchIcon from '@mui/icons-material/Search';
import {LocationOnOutlined} from '@mui/icons-material';
import { useState } from 'react';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header({setViewState, setRating, setFlyto}) {
  
 
  const [autoComplete, setAutoComplete] = useState(null)

  const onPlaceChanged = () => {
    const lat = autoComplete?.getPlace().geometry.location.lat();
    const lng = autoComplete?.getPlace().geometry.location.lng();
    console.log(lat,lng);
    setRating("0");
    
    setFlyto((oldValue)=>[lat,lng])
    
    // setViewState((previewState)=>({
    //   ...previewState,
    //   latitude:lat,
    //   longitude:lng,
    // }))
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         <LocationOnOutlined style={{height:'50px', width:'50px', marginRight:'10px'}} />
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Travo
          </Typography>
          
          <Typography variant='h5'>
            Explore new places
          </Typography>
          
          <Search style={{width:'20%'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          <Autocomplete onLoad={(autocomplete)=>setAutoComplete(autocomplete)} onPlaceChanged={onPlaceChanged}>
          
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search'}}
              onClick={(e)=>e.target.value=""}
            />
          </Autocomplete>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
