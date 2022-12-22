import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
require('dotenv').config({ path: __dirname + '/.env.local' });

// const config: HardhatUserConfig = {
//   networks: {
//     hardhat: {
//       chainId: 1337,
//     },
//   },
//   solidity: '0.8.4',
// };

//production
const config: HardhatUserConfig = {
  defaultNetwork: 'matic',
  networks: {
    hardhat: {},
    matic: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_API_URL,
      accounts: [process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as string],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
