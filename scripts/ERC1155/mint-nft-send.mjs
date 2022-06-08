import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const CONTRACT_NAME = process.env.CONTRACT_NAME
const MINT_TO_WALLET = process.env.MINT_TO_WALLET
const TOKEN_NAME = 'Resources';
const AMOUNT = 20;
const DATA = [];

async function mintNFT(to, tokenName, amount, data) {
      const contractFactory = await ethers.getContractFactory(CONTRACT_NAME)
      const contract = await contractFactory.attach(CONTRACT_ADDRESS)

      await contract.mint(to, tokenName, amount, data);

      console.log(`Token minted for ${tokenName} to ${to}, amount ${amount}`)

}

mintNFT(MINT_TO_WALLET, TOKEN_NAME, AMOUNT, DATA)
.catch((error) => {
      console.error(error);
      process.exit(1);
});