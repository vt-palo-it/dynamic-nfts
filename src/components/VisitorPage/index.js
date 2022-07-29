import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
// import { useContract, useOwnedNFTs, useNFTs } from '@thirdweb-dev/react'
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import {
    getContract,
  } from '../../features/contractSlice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function VisitorPage()  {
    const [loading, setLoading] = useState(false);
    const [data,setData]=useState([]);
    const [id,setId]=useState(0);
    const [value, setValue] = useState('1');
    // const [nfts, setNFTs] = useState([]);
    const [nfts1, setNFTs1] = useState([]);
    const { wallet } = useParams();
    const contract = useSelector(getContract);
    // const contractAddress = "0x4ed7aAf8bD9c5bDC713B72329Cc7E249996453E4";


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    async function unboxNFT(id_num) {
        try {
            setLoading(true)
            setId(id_num)
            if (id_num > 0) {
                let seed = Math.round(Math.random()) + 2
                console.log('Unboxing Token:', id_num);
                const result = await contract.call("changeNFT", id_num, seed);
                console.log(result.receipt.transactionHash);
                setId(0)             
            }
            showMe();
            
        } catch (error) {
            setLoading(false)
            setId(0)
        }
    }


    async function levelUp(id_num, level) {
        try {
            setLoading(true)
            setId(id_num)
            if (id_num > 0) {
                let seed = 1
                if (level === "Level 1 Mage") {
                    seed = 2
                    console.log('Leveling Up Token:', id_num);
                    const result = await contract.call("changeNFT", id_num, seed);
                    console.log(result.receipt.transactionHash);
                } else if (level === "Level 2 Mage") {
                    seed = 3
                    console.log('Leveling Up Token:', id_num);
                    const result = await contract.call("changeNFT", id_num, seed);
                    console.log(result.receipt.transactionHash);
                } else {
                    window.alert("Wizard is Max Level");
                }
                setId(0)             
            }
            showMe();
            
        } catch (error) {
            setLoading(false)
            setId(0)
        }
    }


    async function showMe() {
        try {
            const supply = await contract.call("totalSupply");
            setNFTs1([]);
            for (let i = 1; i <= parseInt(supply); i++) {
                const resultNFT = (await contract.call("tokenURI", i)).replace("ipfs://", "https://ipfs.io/ipfs/");
                fetch(resultNFT)
                .then(res => res.json())
                .then(data => {
                    setNFTs1(nfts1 => [...nfts1, data])
                }).catch(err => {
                    console.error('Error: ', err);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        let mounted = true;
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
                for (let i = 0; i < myJson.length; i++) {
                    if (myJson[i].wallet.toLowerCase() === wallet.toLowerCase()) {
                        setData(myJson[i]);
                    }
                }
            })
        }
        if (contract) {
            (async () => {
                try {
                    const supply = await contract.call("totalSupply");
                    setNFTs1([]);
                    for (let i = 1; i <= parseInt(supply); i++) {
                        const resultNFT = (await contract.call("tokenURI", i)).replace("ipfs://", "https://ipfs.io/ipfs/")
                        console.log(supply, resultNFT)
                        fetch(resultNFT)
                        .then(res => res.json())
                        .then(data => {
                            setNFTs1(nfts1 => [...nfts1, data])
                        }).catch(err => {
                            console.error('Error: ', err);
                        });
                        console.log(nfts1)
                    }
                } catch (error) {
                    console.error(error);
                }
                
            })();
        }
        getData()
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <Box p={2} width="full">
            <Paper elevation={3}>
                <Stack direction='column' spacing={1} paddingLeft={5} paddingRight={5} paddingBottom={5}>
                <Fragment>
                    <br/>
                    <h1>{data.name}</h1>
                    <Typography variant="body1">
                        <b>Wallet:</b> {data.wallet}<br/>
                        <b>Role:</b> {data.role}<br/>
                        <b>{data.tag}</b>
                    </Typography>
                    <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>
                        {data.profile}
                    </Typography>
                    <Box sx={{ width: '100%', typography: 'body1' }} paddingTop={2}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Leviathans" value="1" />
                                <Tab label="Boxes using ThirdWeb" value="2" />
                                <Tab label="Other" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    {nfts1.length > 0 && contract.interceptor.contractWrapper.readContract.address === "0xfcEE8c419DC169201104d31CB987d55BA0333e8f" ? (nfts1.map((item, key) => {
                                        return (
                                        <Grid item xs={3} p={1} key={key}>
                                            <Item sx={{ width: '100%', typography: 'body2' }}>
                                                {id !== key+1 && ( <img src={item.image.replace("ipfs://", "https://ipfs.io/ipfs/")} width="200" alt="Logo"/> )}
                                                {loading && id === key+1 && ( <img src="../assets/flames.gif" width="200" alt="Logo"/> )}
                                                <br/>
                                                {item.name} Number: {key+1}<br/>
                                                {item.description}
                                            </Item>
                                            {id !== key+1 && (item.name === "Level 1 Mage" || item.name === "Level 2 Mage") &&(
                                                <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => levelUp(key+1, item.name)}>Level Up</Button>
                                            )}

                                            {loading && id === key+1 &&(
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                <CircularProgress />
                                            </Box>
                                            )}
                                        </Grid>
                                        )
                                })) : 'No NFTs'}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Grid container spacing={2}>
                                    {nfts1.length > 0 && contract.interceptor.contractWrapper.readContract.address === "0x6fbC28Db927116E54a51f39b78e098023529Fb02" ? (nfts1.map((item, key) => {
                                        return (
                                        <Grid item xs={3} p={1} key={key}>
                                            <Item sx={{ width: '100%', typography: 'body2' }}>
                                                {id !== key+1 && ( <img src={item.image.replace("ipfs://", "https://ipfs.io/ipfs/")} width="200" alt="Logo"/> )}
                                                {loading && id === key+1 && ( <img src="../assets/flames.gif" width="200" alt="Logo"/> )}
                                                <br/>
                                                {item.name} Number: {key+1}<br/>
                                                {item.description}
                                            </Item>
                                            {id !== key+1 && item.name === "Box Item" &&(
                                                <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => unboxNFT(key+1)}>UnBox</Button>
                                            )}

                                            {loading && id === key+1 &&(
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                <CircularProgress />
                                            </Box>
                                            )}
                                        </Grid>
                                        )
                                })) : 'No NFTs'}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3">
                                <Grid container spacing={2}>
                                    Empty
                                </Grid>
                            </TabPanel>
                        </TabContext>
                        {/* <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => showMe()}>ShowMe</Button> */}
                    </Box>
                </Fragment>
                </Stack>
            </Paper>
        </Box>     
    )
}