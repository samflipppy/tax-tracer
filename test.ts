import { connectWallet } from "./connectWallet";

async function main() {
  const account = await connectWallet();
  console.log("Connected to Base Wallet:", account);
}

main().catch(console.error);
