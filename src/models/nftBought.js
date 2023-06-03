import mongoose from "mongoose";
const buySchema = new mongoose.Schema({
    itemId: {
        type: String
    },
    tokenId: {
        type: String
    },
    owner: {
        type: String
    },
    royalOwner: {
        type: String
    },
    amount: {
        type: String
    },
    uri: {
        type: String
    }

})


export default mongoose.model("nftBought", buySchema);