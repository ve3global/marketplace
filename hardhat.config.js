require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// import('hardhat/config').HardhatUserConfig 

module.exports = {
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url:"https://sepolia.infura.io/v3/c60d4570d20a42bba0970f95afdcf092",
      accounts:[process.env.privateKey]
    }
  }
};
