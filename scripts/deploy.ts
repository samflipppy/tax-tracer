import WalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import TaxAllocationABI from "../artifacts/contracts/TaxAllocation.sol/TaxAllocation.json";

// Load environment variables
dotenv.config();

const APP_NAME = "Tax Transparency App";
const DEFAULT_ETH_JSONRPC_URL = "https://goerli.base.org";

async function main() {
  // Initialize Coinbase Wallet SDK
  const wallet = new WalletSDK({
    appName: APP_NAME,
  });

  // Create a provider using Coinbase Wallet
  // Create a provider using Coinbase Wallet
  const ethereum = wallet.makeWeb3Provider({
    rpc: DEFAULT_ETH_JSONRPC_URL,
    chainId: 84531, // Base Goerli chain ID
    options: "all", // Allow all wallet types
  });
 
  const provider = new ethers.BrowserProvider(ethereum as any);

  // Get the signer from Coinbase Wallet
  const signer = await provider.getSigner();

  // Deploy the contract
  const contractFactory = new ethers.ContractFactory(
    TaxAllocationABI.abi,
    TaxAllocationABI.bytecode,
    signer
  );

  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();

  // Wait for the deployment transaction to be mined
  await contract.waitForDeployment();

  // Get the deployed contract's address
  console.log("Contract deployed at:", contract.target); // Use `target` for the address
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exit(1);
});