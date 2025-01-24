import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"; // Ethers.js integration
import * as dotenv from "dotenv"; // For loading environment variables

dotenv.config(); // Load variables from .env file

const config: HardhatUserConfig = {
  solidity: "0.8.18", // Ensure this matches your Solidity version
  networks: {
    baseGoerli: {
      url: "https://goerli.base.org", // Base testnet RPC URL
      chainId: 84531, // Base Goerli Chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Your Metamask private key
    },
  },
};

export default config;
