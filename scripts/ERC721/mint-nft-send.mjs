import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

let rawdata_meta = fs.readFileSync('./meta_uri.json');
let rawdata_royalty = fs.readFileSync('./assets_contract.json');
let meta = JSON.parse(rawdata_meta);
let royalty = JSON.parse(rawdata_royalty);

const CONTRACT_ADDRESS = 0x6bd39075afc532fb6df0f4a2d2311705571a4b0d
const CONTRACT_NAME = NFTBadges
const MINT_TO_WALLET = 0xd131203FE07fC235D9A23746b16deE57906d53D6
const META_DATA_URL = 'https://ipfs.io/ipfs/bafyreifqfqv4s65z6p2pl6ct5idcknj36n4mg6p5marb2azyztc4v66q2a/metadata.json'

async function mintNFT(contractAddress, metaDataURL) {
      const ContractSend = await ethers.getContractFactory(CONTRACT_NAME)
      await ContractSend.attach(contractAddress).safeMint(MINT_TO_WALLET, metaDataURL, royalty.fee_recipient, royalty.seller_fee_basis_points)
      meta.shift();
      fs.writeFile ("meta_uri.json", JSON.stringify(meta), function(err) {
            if (err) throw err;
      })
      console.log("NFT minted!", meta.length, "NFTs left to mint.")
}


mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
.catch((error) => {
      console.error(error);
      process.exit(1);
});