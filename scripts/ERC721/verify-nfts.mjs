import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const NETWORK_API_URL = process.env.NETWORK_API_URL
const MINT_TO_WALLET = process.env.MINT_TO_WALLET
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const web3 = createAlchemyWeb3(NETWORK_API_URL);

const nfts = await web3.alchemy.getNfts({owner: MINT_TO_WALLET})

let rawdata = fs.readFileSync('./meta_uri_copy.json');
let assets = JSON.parse(rawdata);

let contract_total = 0;
let minted = [];
let in_contract = [];

// Log Metrics using Alchemy API
function printContract() {
  for (let i = 0; i < nfts.totalCount; i++) {
    // Extract all the NFTs associated with the Destination address
    if (nfts.ownedNfts[i].contract.address === CONTRACT_ADDRESS.toLowerCase()) {
      in_contract.push([nfts.ownedNfts[i].title, nfts.ownedNfts[i].tokenUri.raw])
      contract_total++;
    }
    // Compare all the NFTs minted with the list of NFTs stored on nft.storage
    for (let j = 0; j < assets.length; j++) {
      if (assets[j].meta === nfts.ownedNfts[i].tokenUri.raw) {
        minted.push([nfts.ownedNfts[i].title, assets[j].meta])
      }
    }
  }
}

function printWallet() {
  setTimeout(function() { 
    console.log("NFTs in Contract:")
    for (let i = 0; i < in_contract.length; i++) {
      console.log("NFT:", in_contract[i][0], "-", in_contract[i][1]);
    }
    console.log("==================================================================================================")
    console.log("NFTs Minted in Wallet:");
    for (let i = 0; i < minted.length; i++) {
      console.log("Successfully Minted:", minted[i][0], "-", minted[i][1])
    }
    console.log("==================================================================================================")
    console.log("Total NFTs in wallet:", nfts.totalCount);
    console.log("Total NFTs in contract:", contract_total);
  }, 1000);
}


printContract()
printWallet()