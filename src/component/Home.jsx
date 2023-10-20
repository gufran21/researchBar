import React from 'react'
import "./Home.css"
import {Container} from '@mui/material';
import Fab from '@mui/material/Fab';
import {LastPage} from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
function Home() {
  return (
    <Container maxWidth="sm" sx={{marginTop:"100px;"}}>
    <div className="top-head">
    <LastPage/>
    <Fab size='small' variant="extended" color="success">
    Originality score 0%
    <RefreshIcon/>
    </Fab>
    </div>
    <Box sx={{margin:"10px",display:"flex",justifyContent:"space-evenly", backgroundColor: "#e3f2fd", borderRadius:"10px"}}>
    <NavLink to="/summarise" className="nav-link">SUMMARISE</NavLink>
    <NavLink to="/elaborate"  className="nav-link">ELABORATE</NavLink>
    <NavLink to="/research" className="nav-link">RESEARCH</NavLink>
    <NavLink to="/chat-with-pdf" className="nav-link">CHAT WITH PDF</NavLink>
    </Box>
  </Container>
  )
}

export default Home