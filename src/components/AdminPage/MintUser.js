import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { NFTStorage, File } from 'nft.storage';

import { ProfileDetails, ProfileInnerDetail } from "./AdminProfile";
import PreviewBadge from "./PreviewBadge";

import {
  getContract,
} from '../../features/contractSlice';

const MintUserWrapper = styled.div`
  width: 85%;
  justify-content: space-around;
  padding-left: 5rem;
`;


const CertPreview = styled.div`
  display: flex;
  flex-direction: column;
`;

const H2Title = styled.h2`
  font-weight: 500;
`;

export default function MintUser() {
  const [loading, setLoading] = useState(false);
  const [mintedTransaction, setMintedTransaction] = useState(false);
  const contract = useSelector(getContract);
  const address = useAddress();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  // const getData = () => {
  //   fetch("assets.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((myJson) => {
  //     setBadges(myJson);
  //   });
  // };

  // const uploadMetaData = async () => {
  //   setLoading(true)
  //   setMintedTransaction(false)
  //   const nftStorageAPIKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;
  //   const badge = mintBadge.replace(/\s/g, '').toLowerCase().concat('.png')
  //   const image = `/assets/${badge}`
  //   const imageData = await fetch(image);
  //   const imageBlob = await imageData.blob();

  //   const client = new NFTStorage({ token: nftStorageAPIKey });

  //   const nft = {
  //     image: new File(
  //       [imageBlob],
  //       badge,
  //       { type: 'image/png' }
  //     ),
  //     name: userTitle,
  //     description: userDescription,
  //     attributes: [{  "trait_type": "Type", "value": badge.split("0")[0] }]
  //   }

  //   const metadata = await client.store(nft);
  //   console.log(metadata);

  //   return metadata.url;
  // }

  async function mintNFT() {
    setLoading(true)
    setMintedTransaction(false)
    if (value1 != "" && value2 != ""){
      let metadata = [value1, value2]
      console.log('start minting to:', address);
      console.log(metadata)
      // const result = await contract.call("mintNFT", address, metadata);
      const result = await contract.call("mintNFT", metadata);
      console.log(result);
      setLoading(false);
      console.log(result.receipt.transactionHash);
      setMintedTransaction(result.receipt.transactionHash);
    }
  }

  return (
    <MintUserWrapper>
      <div></div>
      <CertPreview>
        <H2Title>Dynamic NFTs</H2Title>
        <TextField sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          label="IPFS of Box"
          onChange={e => setValue1(e.target.value)}
        />
        <TextField sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          label="IPFS of UnBox"
          onChange={e => setValue2(e.target.value)}
        />

        {!loading && !mintedTransaction && (
            <Button style={{backgroundColor:"#5463b8"}} variant="contained" onClick={mintNFT}>Mint</Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        )}
        {mintedTransaction && (
          <Button style={{backgroundColor:"#5463b8", margin:"0rem 2rem 1rem ", textAlign: "center"}} variant="contained" href={`https://rinkeby.etherscan.io/tx/${mintedTransaction}`} target="_blank">
            See on Etherscan
          </Button>
        )}
      </CertPreview>

    </MintUserWrapper>
  );
}
