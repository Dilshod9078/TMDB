import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import {ENV_KEY, ENV_URL, ENV_TOKEN} from '../hook/useRequest'
import axios from 'axios';

export default function Navbar() {

const [searchData , setSearchData] = React.useState([{label:"", year:""}])
const navigate = useNavigate()

  const handleSearch = (e) => {
    axios.get(`${ENV_URL}/search/movie?query=${e.target.value}&include_adult=false&api_key=${ENV_KEY}`, {
      headers: {
        Authorization: `Bearer ${ENV_TOKEN}`
      }
    }).then(res => {
      setSearchData(res.data.results.map(item =>{
       return {label:item.title, year:item.id}
      }));
    })
  }

   const handleSearchChange = (e, v) => {
      navigate(`/singlepage/${v.year}`)
   }

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static">
        <Toolbar className='flex items-center space-x-[200px]' >
            <div className='flex items-center space-x-1'>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Films
          </Typography>
            </div>
            <ul className='flex items-center justify-center ml-[200px] space-x-5'>
                  <li>
                    <NavLink to={"/"} className="font-bold text-[19px]">Now playing</NavLink>
                    </li>
                    <NavLink to={"/popular"} className="font-bold text-[19px]">Popular</NavLink>
                    <li>
                    <NavLink to={"/top-rated"} className="font-bold text-[19px]">Top rated</NavLink>
                    </li>
                    <li>
                    <NavLink to={"/upcoming"} className="font-bold text-[19px]">Upcoming</NavLink>
                    </li>
               
            </ul>
           <div>
           <Autocomplete
           onChange={handleSearchChange}
           onKeyUp={handleSearch}
              disablePortal
              id="combo-box-demo"
              options={searchData}
              sx={{ width: 300, backgroundColor:"white", borderRadius:"7px" }}
              size='small'
              renderInput={(params) => <TextField {...params} label="Movie" />}
/>
           </div>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
