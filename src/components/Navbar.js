import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import { useAddress, useDisconnect, useMetamask } from 'react-router-dom';
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const navigate = useNavigate();

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
        { address ? <Button onClick={()=>navigate("/admin")} sx={{ mr: 2 }} variant="contained">Dashboard</Button> : null }
        <Button variant="contained" onClick={connectWithMetamask}>{walletAddress}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;