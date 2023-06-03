import express from 'express';
import user from './user.js';
import nft from './nft.js';
const router =express.Router();

router.use("/user",user);
router.use("/nft",nft);

export default router;