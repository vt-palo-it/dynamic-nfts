import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


import { NFTStorage, File } from 'nft.storage';

import { ProfileDetails, ProfileInnerDetail } from "./AdminProfile";
import PreviewBadge from "./PreviewBadge";

import {
  getContract,
} from '../../features/contractSlice';

const MintUserWrapper = styled.div`
  width: 80%;
  justify-content: space-around;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 4fr 4fr 1fr;
  gap: 2rem;
`;

const CertDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CertPreview = styled.div`
  display: flex;
  flex-direction: column;
`;

const H2Title = styled.h2`
  font-weight: 500;
`;

export default function MintUser({ userToMint }) {
  const [badges, setBadges] = useState(undefined);
  const [mintBadge, setMintBadge] = useState(undefined);
  const [userTitle, setUserTitle] = useState(undefined);
  const [userDescription, setUserDescription] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const contract = useSelector(getContract);
  

  const getData = () => {
    fetch("badges.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setBadges(myJson);
      });
  };

  const uploadMetaData = async () => {
    setLoading(true)
    const nftStorageAPIKey = process.env.REACT_APP_NFT_STORAGE_API_KEY;
    const badge = mintBadge.replace(/\s/g, '').toLowerCase().concat('.png')
    const image = `/assets/${badge}`
    const imageData = await fetch(image);
    const imageBlob = await imageData.blob();

    const client = new NFTStorage({ token: nftStorageAPIKey });

    const nft = {
      image: new File(
        [imageBlob],
        badge,
        { type: 'image/png' }
      ),
      name: userTitle,
      description: userDescription,
      attributes: [{  "trait_type": "Type", "value": badge.split("0")[0] }]
    }

    const metadata = await client.store(nft);
    console.log(metadata);

    return metadata.url;
  }

  useEffect(() => {
    getData();
  }, []);

  async function mintNFT() {
    const metadata = await uploadMetaData();
    const mintToWallet = process.env.REACT_APP_MINT_TO_WALLET;
    console.log('start minting');
    const result = await contract.call("safeMint", mintToWallet, metadata, mintToWallet, 0);
    console.log(result);
    setLoading(false)
  }

  return (
    <MintUserWrapper>
      <div></div>
      <CertDetails>
        <H2Title>Certification details</H2Title>
        <h4>{userToMint.name}</h4>
        <ProfileDetails>
          <ProfileInnerDetail>
            <p>Role:</p>
            <p>{userToMint?.role}</p>
          </ProfileInnerDetail>
          <ProfileInnerDetail>
            <p>User Wallet:</p>
            <p>{userToMint?.wallet.substring(0,6)}...{userToMint?.wallet.slice(-4)}</p>
          </ProfileInnerDetail>
          <Autocomplete
            style={{ width: "100%", paddingTop: "1rem" }}
            disablePortal
            onChange={(event, newValue) => {
              setMintBadge(newValue);
            }}
            id="combo-box-demo"
            options={badges?.badgesList.map((option) => option)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Badges" />}
          />
          <TextField
            style={{ width: "100%", marginTop: "3rem" }}
            onChange={(e) => setUserTitle(e.target.value)}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            placeholder="Description"
            style={{ width: "100%", marginTop: "3rem" }}
            onChange={(e) => setUserDescription(e.target.value)}
            multiline
            rows={10}
          />
        </ProfileDetails>
      </CertDetails>
      <CertPreview>
        <h3>Preview</h3>
        <PreviewBadge
          userToMintName={userToMint.name}
          mintBadge={mintBadge}
          userTitle={userTitle}
          userDescription={userDescription}
        />
        {!loading && (
          <div>
            <Button style={{backgroundColor:"#5463b8",margin:"2rem"}} variant="contained" onClick={mintNFT}>Certify</Button>
            <Button color="secondary" style={{margin:"0rem 2rem"}} variant="outlined">Discard</Button>
          </div>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        )}

      </CertPreview>
      <div></div>
    </MintUserWrapper>
  );
}
