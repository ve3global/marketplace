import userModel from '../models/user.js';

const createUser = async (req, res) => {
    const { address } = req.body;
    if (!address) {
       return res.status(500).json({
            status: "error",
            message: "incomplete data"
        })
    }
    const user = await userModel.findOne({ address: address })
    if (user) {
        return res.status(500).json({
            message: "Already created"
        })
    } else {
        const newUser = await userModel.create({ address });
       return  res.status(200).json({
            status: "success",
            message: "User created",
            data: newUser
        })
    }
}
export default createUser