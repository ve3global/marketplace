// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const VE3NFT = await hre.ethers.getContractFactory("VE3NFT");
  const nft = await VE3NFT.deploy();

  await nft.deployed();
  console.log(nft.address);
  const Marketpalce = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketpalce.deploy(nft.address);

  await marketplace.deployed();
  console.log(marketplace.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0xa5cE41a16F34da6F06B1158f10F7311aF09838b4
// 0xF4575EaC15c147d74D2EF82f7dCcf10514Cac5CF