import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NFTStorage, File } from 'nft.storage';
import { ethers } from "ethers";
import { useAddress, useMetamask, useContract, useContractAbi, useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import contractABI from '../../artifacts/contracts/ERC721NFTBadgesContract.sol/NFTBadgesERC721.json'

import { ProfileDetails, ProfileInnerDetail } from "./AdminProfile";
import PreviewBadge from "./PreviewBadge";
import { SubjectRounded } from "@mui/icons-material";
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
  useEffect(() => {
    initContract();
    getData();
  }, []);

  async function mintNFT() {
    // const [account] = await provider.listAccounts();
    // console.log(account)
    // const badge = mintBadge.replace(/\s/g, '').toLowerCase().concat('.png')
    // const image = `/assets/${badge}`
  
    // const imageData = await fetch(image);
    // const imageBlob = await imageData.blob();
    // const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE2QWVmMzNFNjA1ODRGOURDZThGQkZlQ0Q2OWUxNThCQjJkNDU5MDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDE3NTU1MjkyNywibmFtZSI6Ik5GVEJhZGdlc0hhY2thdGhvbiJ9.sAYpf7ydVVFsWH4-KDtIH4R8_1Do6Lcem00SaW71Vh0"  })

    // const nft = {
    //   image: new File(
    //     [imageBlob],
    //     badge,
    //     { type: 'image/png' }
    //   ),
    //   name: userTitle,
    //   description: userDescription,
    //   attributes: [{ "type": badge.split("0")[0] }]
    // }


    //const metadata = await client.store(nft);


   // contract.contractWrapper.writeContract.safeMint('0x8Dca8Ce9c271079B64F4367d5A906c4B0CfDbC52', metadata.url, 0, 0);
    //await contract.mintTo(account, "");
   //const tx = await contract.call("safeMint", '0x8Dca8Ce9c271079B64F4367d5A906c4B0CfDbC52','', "0xE80d262a880659143Ee1fA79023820C1380245e2", 0);
   //const result = await contract.call("owner");

  // console.log(result);
   //console.log(tx);
  }

  async function initContract() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sdk = new ThirdwebSDK(provider);
    sdk.updateSignerOrProvider(signer)

    console.log(provider.getSigner())

    const contract = sdk.getContractFromAbi('0xC1245D4952544f0578EA69E5b9656863CA9F790f', contractABI.abi);
    // contract.call("safeMint", '0x8Dca8Ce9c271079B64F4367d5A906c4B0CfDbC52','', "0xE80d262a880659143Ee1fA79023820C1380245e2", 0).then((res) => {
    //   console.log(res)
    // }).catch((e) => {
    //   console.log(e)
    // })
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
        <Button style={{backgroundColor:"#5463b8",margin:"2rem"}} variant="contained" onClick={mintNFT}>Certify</Button>
        <Button color="secondary" style={{margin:"0rem 2rem"}} variant="outlined">Discard</Button>
      </CertPreview>
      <div></div>
    </MintUserWrapper>
  );
}
