import { marketplaceContract } from '../helper/blockchain.js';
import nftOnSale from '../models/nftOnSale.js';
import userModel from '../models/user.js';
import nftBought from '../models/nftBought.js';
const tokenOnSale = async () => {
    marketplaceContract.on("tokenOnSale", async (itemId, tokenId, nftContract, owner, seller, royalOwner, price, amount) => {
        const userRoyalOwner = await userModel.findOne({ address: royalOwner })
        const userSeller = await userModel.findOne({ address: seller })
        const userOwner = await userModel.findOne({ address: owner });
        await nftOnSale.create({
            itemId: itemId,
            tokenId: tokenId,
            nftContract: nftContract,
            owner: userOwner._id,
            seller: userSeller._id,
            royalOwner: userRoyalOwner._id,
            price: price,
            amount: amount
        })
    })
}
const tokenBought = async () => {
    marketplaceContract.on("tokenBought", async (itemId, tokenId, owner, royalOwner, amount) => {
        const userRoyalOwner = await userModel.findOne({ address: royalOwner })
        const userOwner = await userModel.findOne({ address: owner });
        await nftBought.create({
            itemId: itemId,
            tokenId: tokenId,
            owner: userOwner._id,
            royalOwner: userRoyalOwner._id,
            amount: amount

        })
    })

}


export {
    tokenOnSale,
    tokenBought
}