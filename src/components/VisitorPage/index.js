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
    const [nfts, setNFTs] = useState([]);
    const [nfts1, setNFTs1] = useState([]);
    const { wallet } = useParams();
    const contract = useSelector(getContract);
    const contractAddress = "0x4ed7aAf8bD9c5bDC713B72329Cc7E249996453E4";


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // async function testGetNFTS () {
    //     const result = await fetch(`https://testnets-api.opensea.io/api/v1/assets?offset=0&limit=20&asset_contract_address=${contractAddress}`)
    //     const nft_array = await result.json();
    //     setNFTs(nft_array.assets)
    // }

    async function unboxNFT(id_num) {
        try {
            setLoading(true)
            setId(id_num)
            const current_url = (await contract.call("tokenURI", id_num))
            if (id_num > 0) {
                let seed = Math.round(Math.random()) + 2
                console.log('Unboxing Token:', id_num);
                const result = await contract.call("changeNFT", id_num, seed);
                console.log(result.receipt.transactionHash);
                // const nftResult = await fetch(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${id_num}/?force_update=true`)
                // const nft_array = await nftResult.json();
                // testGetNFTS()
                setId(0)             
            }
            showMe();
            
        } catch (error) {
            // setLoading(false)
            setId(0)
        }
    }

    // async function refreshNFT(id_num) {
    //     console.log(id_num)
    //     const nftResult = await fetch(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${id_num}/?force_update=true`)
    //     const nft_array = await nftResult.json();
    //     // testGetNFTS()
    // }


    async function showMe() {
        console.log(nfts1)
        // let myArray = []
        // const supply = await contract.call("totalSupply");
        // for (let i = 1; i <= supply; i++) {
        //     const resultNFT = (await contract.call("tokenURI", i)).replace("ipfs://", "https://ipfs.io/ipfs/");
        //     fetch(resultNFT)
        //     .then(res => res.json())
        //     .then(data => {
        //         myArray.push(data)
        //         console.log("ShowMe: ", data)
        //         if (i === supply) {setLoading(false);}
        //     }).catch(err => {
        //         console.error('Error: ', err);
        //     });
        // }
        // setNFTs1(myArray)
        // console.log(myArray)
        // // setLoading(false);
    }


    useEffect(() => {
        let mounted = true;
        if (contract) {
            (async () => {
                try {
                    let myArray = []
                    const supply = await contract.call("totalSupply");
                    setNFTs1([]);
                    for (let i = 1; i <= parseInt(supply); i++) {
                        const resultNFT = (await contract.call("tokenURI", i)).replace("ipfs://", "https://ipfs.io/ipfs/");
                        fetch(resultNFT)
                        .then(res => res.json())
                        .then(data => {
                            myArray.push(data)
                            // setNFTs1(nfts1 => [...nfts1, data])
                            
                        }).catch(err => {
                            console.error('Error: ', err);
                        });
                    }
                    setNFTs1(myArray)
                    console.log(myArray)
                } catch (error) {
                    console.error(error);
                }
            })();
        }
        return () => {
            mounted = false;
        }
    }, []);

    // useEffect(()=>{
    //     const getData = () => {
    //         fetch('/users.json', {
    //             headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //             }
    //         })
    //         .then(function(response){
    //             return response.json();
    //         })
    //         .then(function(myJson) {
    //             for (let i = 0; i < myJson.length; i++) {
    //                 if (myJson[i].wallet.toLowerCase() === wallet.toLowerCase()) {
    //                     setData(myJson[i]);
    //                 }
    //             }
    //         })
    //     }
    //     getData()
    //     testGetNFTS()
    // }, [data, wallet])


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
                                <Tab label="Boxes using Opensea" value="1" />
                                <Tab label="Boxes using ThirdWeb" value="2" />
                                <Tab label="Boxes using ThirdWeb Contract" value="3" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    Empty
                                </Grid>
                                {/* <Grid container spacing={2}>
                                {nfts.length > 0 ? (nfts.map((item, key) => {
                                    if (item.owner.address === data.wallet.toLowerCase()) {
                                        return (
                                        <Grid item xs={3} p={1} key={key}>
                                            <Item sx={{ width: '100%', typography: 'body2' }}>
                                                {id !== item.token_id && ( <img src={item.image_original_url} width="200" alt="Logo"/> )}
                                                {loading && id === item.token_id && ( <img src="../assets/flames.gif" width="200" alt="Logo"/> )}
                                                <br/>
                                                {item.name} Number: {item.token_id}<br/>
                                                {item.description}
                                            </Item>
                                            {id !== item.token_id && item.name === "Box Item" &&(
                                                <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => unboxNFT(item.token_id)}>UnBox</Button>
                                            )}

                                            {loading && id === item.token_id &&(
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                <CircularProgress />
                                            </Box>
                                            )}
                                            <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => refreshNFT(item.token_id)}>Refresh</Button>
                                        </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })) : ''}
                                </Grid> */}
                            </TabPanel>
                            <TabPanel value="2">
                                <Grid container spacing={2}>
                                    {nfts1.length > 0 ? (nfts1.map((item, key) => {
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
                                })) : ''}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3">
                                <Grid container spacing={2}>
                                    Empty
                                </Grid>
                            </TabPanel>
                        </TabContext>
                        <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => showMe()}>ShowMe</Button>
                    </Box>
                </Fragment>
                </Stack>
            </Paper>
        </Box>     
    )
}