/* eslint-disable no-restricted-syntax */
import * as IPFS from 'ipfs'

let IPFSNative
const ipfs = async () => {
    try {
        IPFSNative = await IPFS.create()
        return IPFSNative
    } catch (e) {
        console.log(e);
    }
}
const ipfsGet = async (ipfsHash) => {
    try {
        const stream =await IPFSNative.cat(ipfsHash)
        console.log(stream);
        let data = ''
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        console.log(JSON.parse(data))
        return JSON.parse(data)
    } catch (e) {
        console.log(e);
    }
}
export {
    ipfs, ipfsGet

}
    // eslint-disable-next-line no-unused-expressions
    ; async () => Promise.resolve(ipfs())()
