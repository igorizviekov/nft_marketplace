// 1. start hardhat - npx hardhat node
// 2. deploy smart contract - npx hardhat run scripts/deploy.ts --network localhost
// 3. import 2 accounts from hardhat into your wallet
// 4. create NFT :)

import { ethers } from 'hardhat';

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketPlace = await NFTMarketplace.deploy();
  await nftMarketPlace.deployed();
  console.log(`NFTMarketPlace deployed to ${nftMarketPlace.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
