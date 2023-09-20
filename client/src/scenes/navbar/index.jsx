import React from 'react'
import navbarCss from './navbar.module.css';
import {
  InputBase,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from 'state';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch =useDispatch()
  const {firstName,lastName}=useSelector(state=>state.user)
  const navigate=useNavigate()
  return (
    <>
      <nav>
        <div className='workspace'>
        <div className={navbarCss.workspace}>
        
          <div className={navbarCss.heading_bar}>
            <h1>Socially</h1>
          </div>
          <div className={navbarCss.nav_links}>
          <FormControl variant="standard" value={"fullName"}>
            <Select
              value={`${firstName} ${lastName}`}
              sx={{
                backgroundColor: "#636262",
                color:'white',
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                  color:"white"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: '#636262',
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={`${firstName} ${lastName}`}>
                <h1>{`${firstName} ${lastName}`}</h1>
              </MenuItem>
              <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
              <MenuItem onClick={()=>navigate('/friendList')}>Friends List</MenuItem>
            </Select>
          </FormControl>
          </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;