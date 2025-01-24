import WalletSDK from "@coinbase/wallet-sdk";
import { JsonRpcProvider, parseEther } from "ethers";

// Base Wallet Configuration
const APP_NAME = "Tax Transparency App";
const APP_LOGO_URL = "https://your-logo-url.com"; // Optional, your app's logo
const DEFAULT_ETH_JSONRPC_URL = "https://goerli.base.org";

// Initialize Coinbase Wallet SDK
const wallet = new WalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});

// Create a WalletLink provider
const ethereum = wallet.makeWeb3Provider({
  options: "all", // Allow all wallet types
});

// Create an ethers.js provider
const provider = new JsonRpcProvider(ethereum as any);

// Request account access
export async function connectWallet() {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("Connected account:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
}

// Sign a transaction
export async function sendTransaction(to: string, value: string) {
  const signer = await provider.getSigner(); // Await the promise
  const tx = await signer.sendTransaction({
    to,
    value: parseEther(value),
  });
  console.log("Transaction hash:", tx.hash);
}
