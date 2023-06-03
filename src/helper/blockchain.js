import dotenv from 'dotenv';
dotenv.config();
import ethers from 'ethers';
import nftAbi from '../../artifacts/contracts/VE3NFT.sol/VE3NFT.json' assert { type: "json" };
import marketplaceAbi from '../../artifacts/contracts/Marketplace.sol/Marketplace.json' assert { type: "json" };
const wsurl = process.env.WS_URL
const wsProvider = new ethers.providers.WebSocketProvider(wsurl);
const nftContractAddress =process.env.nftContractAddress;
const marketplaceContractAddress = process.env.marketplaceContractAddress;
const nftContract = new ethers.Contract(nftContractAddress, nftAbi.abi, wsProvider);
const marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi.abi, wsProvider);

export {
    nftContract,
    marketplaceContract
}