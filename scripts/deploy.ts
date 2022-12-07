// npx hardhat run scripts/deploy.ts --network localhost

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
