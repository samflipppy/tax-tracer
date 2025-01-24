import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28", // Set to match your contract's pragma
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for gas efficiency
      },
    },
  },
  networks: {
    baseGoerli: {
      url: "https://goerli.base.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
