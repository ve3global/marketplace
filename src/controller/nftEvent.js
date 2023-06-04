import { nftContract } from '../helper/blockchain.js'
import { connectDb } from '../db/connectDb.js'
import nftCreate from '../models/nftCreate.js'
import userModel from '../models/user.js'
import { ipfsGet } from '../helper/ipfs.js'
import axios from 'axios'

const mint = async () => {
	await connectDb()
	await nftContract.on(
		'minted',
		async (supply, royalPrice, address, royalOwner, tokenId, uri) => {
			const user = await userModel.findOne({ address: royalOwner })
			const ipfsHashResult = uri.split('//')[1]
			console.log(ipfsHashResult)
			const metadata = await axios.get(
				'https://gateway.pinata.cloud/ipfs/' + ipfsHashResult
			)
			await nftCreate.create({
				imghash: metadata.data.img,
				name: metadata.data.name,
				description: metadata.data.description,
				supply: supply,
				royalPrice: royalPrice,
				address: address,
				royalOwner: user._id,
				tokenId: tokenId,
			})

			console.log(supply.toString())
		}
	)
}
export default mint
