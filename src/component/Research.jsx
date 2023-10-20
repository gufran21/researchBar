import { Box, Button, Container, MenuItem, Select } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import axios from 'axios';
import Cite from 'citation-js';
import "./research.css"
import Modal from '@mui/material/Modal';
function Research() {
    const [input,setInput]=useState("");
    const [result,setResult]=useState([]);
    const [bibtex,setBibtex]=useState("");
    const [citation,setCitation]=useState("ieee");
    const [open, setOpen] = React.useState(false);
    const handleOpen = (event,citationStyles) =>{ 
        setOpen(true);
        setBibtex(citationStyles.bibtex)
    }
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height:"400px",
        borderRadius:"20px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center"
      };
    const citationHandle=(e)=>{
        setCitation(e.target.value);
        const cite = new Cite(bibtex)
       const output = cite.format('bibliography', {
       format: 'html',
       template: e.target.value,
       lang: 'en-US'
        })
         document.getElementById("citedresult").innerHTML=output;
        
    }
    const search_handle=()=>{
        let data = JSON.stringify({

            "keyword": input,
          
            "limit": "10"
          
          });
          
          let config = {
          
            method: 'post',
          
            maxBodyLength: Infinity,
          
            url: 'https://api.gyanibooks.com/search_publication/',
          
            headers: { 
          
              'Content-Type': 'application/json'
          
            },
          
            data : data
          
          };
          
          
          axios.request(config)
          
          .then((response) => {
          
            setResult(response.data.data);
          })
          
          .catch((error) => {
          
            console.log(error);
          
          });
    }
  return (
    <>
    <Container maxWidth="sm" sx={{marginTop:"10px;"}}>
        <Box sx={{display:"flex",margin:"20px 0;",alignItems:"center"}}>
            <div className='search-wrapper'>
            <input placeholder='search here...' value={input} onChange={(e)=>setInput(e.target.value)}></input>
            </div>
            <Button variant="contained" onClick={search_handle}>
            <SearchIcon  />
            </Button>
        </Box>
        <Box>
         {
            result && result.map((item,key)=>{
                return(
                   <Box className="result" key={key} sx={{borderRadius:"10px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",margin:"10px 0", padding:"10px"}}>
                    <h3 style={{color:'black',margin:"10px 0",fontWeight:"500"}}>{item.title}</h3>
                    <p className='abstract'>{item.abstract}</p>
                    <p className='author'><b>Authors:</b>{
                        item.authors.map((auther)=>{
                            return auther.name+","
                        })

                        }</p>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span>Cited by {item.citationCount}</span>
                        <div>
                        <Button onClick={(event)=>handleOpen(event,item.citationStyles)}  variant="outlined" color='success' sx={{margin:"10px",borderRadius:"20px"}}>Cite</Button>
                        <Button href={item.url} variant="contained" color="success" sx={{margin:"10px",borderRadius:"20px"}}>Explore</Button>
                        </div>
                        </div>
                   </Box> 
                )
         })
        }
        </Box>
    </Container>

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <Select
          sx={{margin:"10px"}}
          value={citation}
          onChange={citationHandle}
        >
          <MenuItem value={"ieee"}>IEEE</MenuItem>
          <MenuItem value={"apa"}>APA 7</MenuItem>
          <MenuItem value={"mla"}>MLA 9</MenuItem>
          <MenuItem value={"harvard1"}>Harvard</MenuItem>
        </Select>
        <div id="citedresult"></div>
    </Box>
  </Modal>
  </>
  )
}

export default Research