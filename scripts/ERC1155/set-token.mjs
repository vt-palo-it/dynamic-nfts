import dotenv from 'dotenv';
dotenv.config();

const CONTRACT_NAME = process.env.CONTRACT_NAME
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const TOKEN_NAME = 'testing';
const TOKEN_URI = 'ipfs://bafyreidclrebgurnsko36q3vnoeox5rhlolr3crnw5z2jqxac6oksozuwm/metadata.json';

async function setToken(tokenName, tokenUri) {
    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME)
    const contract = await contractFactory.attach(CONTRACT_ADDRESS)

    await contract.setToken(tokenName, tokenUri)
    console.log(`Token with name ${tokenName} is set, URI : ${tokenUri}`)
}

setToken(TOKEN_NAME, TOKEN_URI)
.catch((error) => {
    console.error(error);
    process.exit(1);
});