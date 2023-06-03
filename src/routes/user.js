import express from 'express';
import createUser from '../controller/user.js';
const user = express.Router();


user.post("/", createUser);



export default user;