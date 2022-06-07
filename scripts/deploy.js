require('dotenv').config();

const CONTRACT_NAME = process.env.CONTRACT_NAME;
const TOKEN_NAME = process.env.TOKEN_NAME;
const TOKEN_SYMBOL = process.env.TOKEN_SYMBOL;

async function main() {
    const MyToken = await ethers.getContractFactory(CONTRACT_NAME)
    
    // Start deployment, returning a promise that resolves to a contract object
    const nft = await MyToken.deploy()
    await nft.deployed()
    console.log(nft.address)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
