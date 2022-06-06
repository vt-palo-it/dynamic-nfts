require('dotenv').config();
const { expect } = require("chai");
const { ethers } = require("hardhat");

const receiverWallet = process.env.WALLET_DEPLOYER_ADDRESS
const contractName = process.env.CONTRACT_NAME
const tokenName = "exp-1"
const metaDataBaseURI = "ipfs://bafybeiesxbiq7hlzlelsi5rsiknx5ln2vt36mia227icov44naqoeeztsu";
const suffix = `/${tokenName}.json`;
const uri = metaDataBaseURI + suffix;
const collectionsName = "NFT Cert"
const collectionsSymbol = "NFTCERT"
let contractFactory
let contract
let deployer


beforeEach(async () => {
  [deployer] = await ethers.getSigners();
  contractFactory = await ethers.getContractFactory(contractName);
  contract = await contractFactory.deploy(collectionsName, collectionsSymbol);
  await contract.deployed();
});

describe("NFTBadges -- Deployment", function () {
  it("Should set the right deployer/owner of contract", async function () {
    expect(await contract.owner()).to.equal(deployer.address);
  });
})

describe("NFTBadges -- tokens", function () {
  it("set a token id", async function () {
    const currentTokenId = await contract.getTokenCount();
    
    await contract.setTokenId(tokenName);
    const contractTokenId = await contract.getTokenId(tokenName);
    
    expect(contractTokenId).to.equal(currentTokenId);
  });

  it("make sure token id always unique", async function () {
    const currentTokenId = await contract.getTokenCount();
    const nextTokenId = parseInt(currentTokenId) + 1;
    
    await contract.setTokenId(tokenName);

    const contractNextTokenId = await contract.getTokenCount();
    expect(contractNextTokenId).to.equal(nextTokenId);
  });

  it("to revert if token don't exist", async function () {
    const tokenNameNotExist="tokendoNTEXISTS";
    
    const getTokenId = contract.getTokenId(tokenNameNotExist);

    await expect(getTokenId).to.be.revertedWith("No token exist with this name");
  });

  it("Token URI can't be set twice in contract", async function () {
    
    await contract.setTokenId(tokenName);
    const setTokenNameTwice = contract.setTokenId(tokenName);
    
    await expect(setTokenNameTwice).to.be.revertedWith('Cannot set token name twice');
  });
})

describe("NFTBadges -- URI", function () {

  it("Token URI set in contract", async function () {
    const tokenId = 0;
    const suffix = `/${tokenName}.json`;
    const uri = metaDataBaseURI + suffix;
    
    await contract.setTokenUriById(tokenId, uri);
    const uriFromContract = await contract.uri(tokenId);

    expect(uriFromContract).to.equal(uri);
  });

  it("Token URI can't be set twice in contract", async function () {
    const tokenId = 1;
    
    await contract.setTokenUriById(tokenId, uri);
    const setTokenUriTwice = contract.setTokenUriById(tokenId, uri);

    await expect(setTokenUriTwice).to.be.revertedWith('Cannot set uri twice');
  });

  it("Integration -- set token URI", async function () {  
    await contract.setToken(tokenName, uri);
    const uriFromContract = await contract.getTokenUri(tokenName);

    await expect(uriFromContract).to.equal(uri);
  });
});

describe("NFTBadges -- Minting", function () {
  it("Mint token -- expect balance to increase", async function () {
    await contract.setToken(tokenName, uri);
    const initialBalance = await contract.getBalance(receiverWallet, tokenName);
    const mintAmount = 1;
    const data = [];

    await contract.mint(receiverWallet, tokenName, mintAmount, data);

    const balanceAfterMint = await contract.getBalance(receiverWallet, tokenName);

    expect(balanceAfterMint).to.equal(initialBalance + mintAmount);
  });

  it("Mint token -- expect balance for different tokenType to stay the same", async function () {
    await contract.setToken(tokenName, uri);
    const mintAmount = 1;
    const data = [];
    
    const tokenNameSecond = 'exp-2';
    await contract.setToken(tokenNameSecond, uri);

    const initialBalance = await contract.getBalance(receiverWallet, tokenNameSecond);
  
    await contract.mint(receiverWallet, tokenName, mintAmount, data);

    const balanceAfterMint = await contract.getBalance(receiverWallet, tokenNameSecond);

    expect(balanceAfterMint).to.equal(initialBalance);
  });
});

describe("NFTBadges -- Batch Mint", function () {
  it("Mint token -- expect to return the correct array of balance", async function () {
    await contract.setToken(tokenName, uri);

    const tokenNameSecond = 'exp-2';
    await contract.setToken(tokenNameSecond, uri);
    
    const tokensToMint = [tokenName, tokenNameSecond];
    const mintAmount = [1,2];
    const data = [];

    await contract.mintBatch(receiverWallet, tokensToMint, mintAmount, data);

    const balanceAfterMint = await contract.getBalanceBatch([receiverWallet, receiverWallet], tokensToMint);
    
    const balanceAfterMintNumber = [];

    for(const balance of balanceAfterMint) {
      balanceAfterMintNumber.push(balance.toNumber())
    }

    expect(balanceAfterMintNumber).to.eql(mintAmount);
  });
});
