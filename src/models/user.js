import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    address: {
        type: String
    }

})


export default mongoose.model("userModel", userSchema);