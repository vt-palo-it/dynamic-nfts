require('dotenv').config();

const CONTRACT_NAME = 'DynamicNFT002';

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
