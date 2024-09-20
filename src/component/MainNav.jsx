import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);


  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        sx={{ 
          backgroundColor: '#071f41',
          color: 'white',
          boxShadow:'0px 1px 5px rgba(0, 0, 0, 0.5)'
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to='/'
          style={{ color: 'white' }} 
          label="Trending"
          icon={<WhatshotIcon />}
        />
    
        
        <BottomNavigationAction component={Link} to='/movies'
          style={{ color: 'white' }} 
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction component={Link} to='/series'
          style={{ color: 'white' }}
          label="TvSeries"
          icon={<TvIcon />}
        />
        <BottomNavigationAction component={Link} to='/search'
          style={{ color: 'white' }}
          label="Search"
          icon={<SearchIcon />}
        />    
      </BottomNavigation>
    </Box>
  );
}
