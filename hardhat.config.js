require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();

let { NETWORK_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

if (!NETWORK_API_URL.includes('polygon')) {
  PRIVATE_KEY = `0x${PRIVATE_KEY}`
}

module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'all',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    all: {
      url: NETWORK_API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
