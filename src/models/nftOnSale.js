import mongoose from 'mongoose';

const onSaleSchema = new mongoose.Schema({
    itemId: {
        type: String
    },
    tokenId: {
        type: String
    },
    contract: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    royalOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    price: {
        type: String
    },
    amount: {
        type: String
    },
    uri: {
        type: String
    }

})


export default mongoose.model("nftOnSale", onSaleSchema);