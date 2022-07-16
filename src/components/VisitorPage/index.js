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
import { useContract, useOwnedNFTs, useNFTs } from '@thirdweb-dev/react'
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

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
    const [mintedTransaction, setMintedTransaction] = useState(false);
    const [data,setData]=useState([]);
    const [id,setId]=useState(0);
    const [value, setValue] = useState('1');
    const [nfts, setNFTs] = useState([]);
    const { wallet } = useParams();
    const contract = useSelector(getContract);
    const contractAddress = "0xE82EF42877F6f02EAf9072F4553F73b6B7326909";
    const sdk = new ThirdwebSDK("rinkeby");
    const contract1 = sdk.getNFTCollection("0x8367e19A9109d1d9356122853E37bE4cE18d58cC");



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    async function testGetNFTS () {
        const result = await fetch(`https://testnets-api.opensea.io/api/v1/assets?offset=0&limit=20&asset_contract_address=${contractAddress}`)
        const nft_array = await result.json();
        setNFTs(nft_array.assets)
    }

    async function unboxNFT(id_num) {
        try {
            setLoading(true)
            setMintedTransaction(false)
            setId(id_num)
            if (id_num > 0) {
                console.log('Unboxing Token:', id_num);
                const result = await contract.call("changeNFT", id_num, 2);
                console.log(result);
                setLoading(false);
                console.log(result.receipt.transactionHash);
                setMintedTransaction(result.receipt.transactionHash);
                const nftResult = await fetch(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${id_num}/?force_update=true`)
                const nft_array = await nftResult.json();
                // testGetNFTS()
            }
        } catch (error) {
            setLoading(false)
            setMintedTransaction(false)
            setId(0)
        }
        
    }

    async function refreshNFT(id_num) {
        console.log(id_num)
        const nftResult = await fetch(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${id_num}/?force_update=true`)
        const nft_array = await nftResult.json();
        // testGetNFTS()
    }


    async function showMe() {
        const resultNFT = (await contract.call("tokenURI", 1)).replace("ipfs://", "https://ipfs.io/ipfs/");
        console.log(resultNFT)
        fetch(resultNFT)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        }).catch(err => {
            console.error('Error: ', err);
        });
    }

    async function getMe() {
        console.log(contract1)
        const nfts = await contract1.getAll();
        console.log(nfts);
    }

    useEffect(()=>{
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
        getData()
        testGetNFTS()
    }, [data, wallet])


    return (
        <Box p={2} width="full">
            <Paper elevation={3}>
                <Stack direction='column' spacing={1} paddingLeft={5} paddingRight={5} paddingBottom={5}>
                <Fragment>
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
                                <Tab label="Boxes" value="1" />
                                <Tab label="???" value="2" />
                                <Tab label="???" value="3" />
                                <Tab label="???" value="4" />
                            </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    {nfts.length > 0 ? (nfts.map((item, key) => {
                                    if (item.owner.address === data.wallet.toLowerCase()) {
                                        let image = item.image_original_url
                                        return (
                                        <Grid item xs={3} p={1} key={key}>
                                            <Item sx={{ width: '100%', typography: 'body2' }}>
                                                <img src={image} width="200" alt="Logo"/><br/>
                                                {item.name} Number: {item.token_id}<br/>
                                                {item.description}
                                            </Item>
                                            {id !== item.token_id && !mintedTransaction && item.name === "Box" &&(
                                                <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => unboxNFT(item.token_id)}>UnBox</Button>
                                            )}

                                            {loading && id === item.token_id &&(
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                <CircularProgress />
                                            </Box>
                                            )}
                                            {mintedTransaction && id === item.token_id &&(
                                            <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" href={`https://rinkeby.etherscan.io/tx/${mintedTransaction}`} target="_blank">
                                                See on Etherscan
                                            </Button>
                                            )}
                                            <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => refreshNFT(item.token_id)}>Refresh</Button>
                                        </Grid>
                                        )
                                    } else {
                                        return null
                                    }
                                })) : ''}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Grid container spacing={2}>
                                    Empty
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3">
                                <Grid container spacing={2}>
                                    Empty
                                </Grid>
                            </TabPanel>
                            <TabPanel value="4">
                                <Grid container spacing={2}>
                                    Empty  
                                </Grid>
                            </TabPanel>
                        </TabContext>
                        <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => showMe()}>ShowMe</Button>
                        <Button style={{backgroundColor:"#5463b8", margin:"1rem 0rem 0rem 1rem", textAlign: "center", width:"95%"}} variant="contained" onClick={event => getMe()}>getMe</Button>
                    </Box>
                </Fragment>
                </Stack>
            </Paper>
        </Box>     
    )
}