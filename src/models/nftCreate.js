import mongoose from 'mongoose';

const createSchema = new mongoose.Schema({
    imghash: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    supply: {
        type: String
    },
    royalPrice: {
        type: String
    },
    address: {
        type: String
    },
    tokenId: {
        type: String
    },
    royalOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

})


export default mongoose.model("nftCreate", createSchema);