// import { ipfs } from '../helper/ipfs.js';
import  mint  from './nftEvent.js';
import { tokenOnSale, tokenBought } from './marketplaceEvent.js';


mint();
tokenOnSale();
tokenBought();
// ipfs();