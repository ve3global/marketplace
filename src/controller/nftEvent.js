import {nftContract} from '../helper/blockchain.js';
import {connectDb} from '../db/connectDb.js';
import nftCreate from '../models/nftCreate.js';
import userModel from '../models/user.js';
import { ipfsGet } from '../helper/ipfs.js';

const mint = async () => {
    await connectDb();
    await nftContract.on("minted", async (supply, royalPrice, address, royalOwner, tokenId, uri) => {
        const user = await userModel.findOne({ address: royalOwner })
        await nftCreate.create({
            supply: supply,
            royalPrice: royalPrice,
            address:address,
            royalOwner: user._id,
            tokenId: tokenId,
            uri: uri
        })
        const ipfsHashResult=await ipfsGet(`${uri.split('//')[1]}`)
        console.log(ipfsHashResult)
        console.log(supply.toString());
    })

}
export default mint