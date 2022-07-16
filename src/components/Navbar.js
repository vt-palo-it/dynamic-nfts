import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useAddress, useMetamask } from "@thirdweb-dev/react";

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {
  initContractAsync,
  getContract,
} from '../features/contractSlice';

const Navbar = () => {
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const contract = useSelector(getContract);

    const [walletAddress, setWalletAddress] = useState("Connect Wallet");
    const [data,setData]=useState([]);
    const [admin,setAdmin]=useState(false);

    const getData = () => {
        fetch('/users.json', {
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            setData(myJson)
        });
    }

    
    
    useEffect(()=>{
      getData()
    }, [])

    useEffect(() => {

      const initContract = () => {
        if(contract === null) {
          dispatch(initContractAsync())
        }
      }

      if (address) {
          setWalletAddress(`${address.substring(0, 6)}...${address.slice(-4)}`);
          initContract();
          for (let i = 0; i < data.length; i++) {
            if (data[i].admin === true && data[i].wallet === address) {
              setAdmin(true);
            }
          }
      } else {
          setWalletAddress("Connect Wallet")
          setAdmin(false);
      }
    }, [address, data, contract, dispatch])

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Link to='/'>
            <img src="/assets/BlocSkillz.png" alt="Logo"/>
          </Link>
        <Typography component="div" sx={{ flexGrow: 1 }} />
        { admin ? <Button onClick={()=>navigate("/admin")} sx={{ mr: 2 }} variant="contained">Dashboard</Button> : '' }
        <Button variant="contained" onClick={connectWithMetamask}>{walletAddress}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;