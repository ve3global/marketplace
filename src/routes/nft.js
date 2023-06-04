import express from "express";
import { listItemsOnSale, listItemsOnSaleSingle, getSingleNftDetails, getNftDetails } from "../controller/nft.js";
const nft = express.Router();

nft.get("/", listItemsOnSale); // list all items on sale
nft.post("/:id", listItemsOnSaleSingle); // give detail of single nft on sale
nft.post("/:id", getSingleNftDetails); // give details of my single nft
nft.get("/collections", getNftDetails);// listing nft on my dashboard



export default nft