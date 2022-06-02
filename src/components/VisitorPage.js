import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';


const VisitorPage = () => {
    const [data,setData]=useState([]);

    const getData = () => {
      fetch('users.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson)
        });
    }
    useEffect(()=>{
      getData()
    },[])

    console.log(data)
    
    return (
        <Box p={2} width="full" alignItems="center">
            <Paper elevation={3} padding={5}>
                <Stack direction='column' spacing={4} padding={5}>
                <div className="App">
                {
                data && data.length > 0 && data.map((item)=><p key={item.id}>{item.name}</p>)
                }
                </div>
                </Stack>
            </Paper>
      </Box>     
    )
}
export default VisitorPage;