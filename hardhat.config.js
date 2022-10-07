require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.4",
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/c0c87d279cb240ff8036c2f999a0ce14",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
