import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
  
const Navbar = () => {
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const [walletAddress, setWalletAddress] = useState("Connect Wallet");

    useEffect(() => {
      if (address) {
          setWalletAddress(`${address.substring(0, 6)}...${address.slice(-4)}`)
      } else {
          setWalletAddress("Connect Wallet")
      }
    }, [address])

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
        <Button variant="contained">Request Account</Button>
        <Typography component="div" sx={{ flexGrow: 1 }} />
        { address ? <Button sx={{ mr: 2 }}variant="contained">Dashboard</Button> : '' }
        <Button variant="contained" onClick={connectWithMetamask}>{walletAddress}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;