import nftCreate from "../models/nftCreate.js";
import nftOnSale from "../models/nftOnSale.js";

const listItemsOnSale = async (req, res) => {
    const items = await nftOnSale.find();
    if (items.length > 0) {
        return res.status(200).json({
            success: true,
            items: items
        });
    }
    else {
        return res.status(500).send({
            success: false,
            message: "No listed items"
        });
    }

}
const listItemsOnSaleSingle = async (req, res) => {
    const { params: { id: userId } } = req

    const details = await nftOnSale.find({
        royalOwner: userId
    })
    if (details.length > 0) {
        return res.status(200).json({
            success: true,
            detail: details
        });
    }
    else {
        return res.status(500).send({
            success: false,
            message: "No Nft"
        });
    }

}


const getSingleNftDetails = async (req, res) => {
    const { params: { id: nftId } } = req
    const detail = await nftCreate.findOne({
        itemId: nftId
    })
    if (detail.length > 0) {
        return res.status(200).json({
            success: true,
            detail: detail
        });
    }
    else {
        return res.status(500).send({
            success: false,
            message: "NFT doesnot exists"
        });
    }

}
const getNftDetails = async (req, res) => {
    const detail = await nftCreate.findOne()
    if (detail.length > 0) {
        return res.status(200).json({
            success: true,
            detail: detail
        });
    }
    else {
        return res.status(500).send({
            success: false,
            message: "NFT doesnot exists"
        });
    }

}
export {
    listItemsOnSale,
    listItemsOnSaleSingle,
    getSingleNftDetails,
    getNftDetails
}