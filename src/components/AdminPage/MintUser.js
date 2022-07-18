import React, { useState } from "react";
import { useSelector } from 'react-redux';

import styled from "styled-components";
// import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAddress } from "@thirdweb-dev/react";
// import { NFTStorage, File } from 'nft.storage';

// import { ProfileDetails, ProfileInnerDetail } from "./AdminProfile";
// import PreviewBadge from "./PreviewBadge";

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
  const [value3, setValue3] = useState('');

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
    if (value1 !== "" && value2 !== "" && value3 !== ""){
      let metadata = [value1, value2, value3]
      console.log('start minting to:', address);
      // const result = await contract.call("mintNFT", address, metadata);
      const result = await contract.call("mintNFT", metadata);
      console.log("Reciept: ",result.receipt.transactionHash);
      setMintedTransaction(result.receipt.transactionHash);
      window.alert("Minting Complete!");
      setLoading(false);
    }
  }

  return (
    <MintUserWrapper>
      <div></div>
      <CertPreview>
        <H2Title>Dynamic NFTs</H2Title>
        <TextField sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          label="IPFS of Box"
          // label="IPFS Level 1"
          onChange={e => setValue1(e.target.value)}
        />
        <TextField sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          label="IPFS of UnBox"
          // label="IPFS Level 2"
          onChange={e => setValue2(e.target.value)}
        />
        <TextField sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          label="IPFS of Skull"
          // label="IPFS Level 3"
          onChange={e => setValue3(e.target.value)}
        />

        {!loading && (
            <Button style={{backgroundColor:"#5463b8", marginBottom: "1rem"}} variant="contained" onClick={mintNFT}>Mint</Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        )}
        {mintedTransaction && (
          <Button style={{backgroundColor:"#5463b8", textAlign: "center"}} variant="contained" href={`https://rinkeby.etherscan.io/tx/${mintedTransaction}`} target="_blank">
            See on Etherscan
          </Button>
        )}
      </CertPreview>

    </MintUserWrapper>
  );
}
