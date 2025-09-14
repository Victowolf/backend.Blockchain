import { ethers } from "ethers";

async function main() {
  // Connect to local Hardhat node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // Accounts from Hardhat node
  const accounts = [
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
    "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a"
  ];

  console.log("Accounts:");
  accounts.forEach((pk, i) => console.log(`Account ${i}: ${new ethers.Wallet(pk).address}`));

  // Block number before mining
  const beforeBlock = await provider.getBlockNumber();
  console.log("\nBlock number before mining:", beforeBlock);

  // Send 3 transactions
  console.log("\n--- Sending sample transactions ---");
  for (let i = 0; i < 3; i++) {
    const wallet = new ethers.Wallet(accounts[i], provider);
    const tx = await wallet.sendTransaction({
      to: new ethers.Wallet(accounts[i + 1]).address,
      value: ethers.parseEther("1.0")
    });
    await tx.wait();
    console.log(`Tx ${i + 1}: ${wallet.address} -> ${new ethers.Wallet(accounts[i + 1]).address} | Hash: ${tx.hash}`);
  }

  // Mine 5 empty blocks
  await provider.send("hardhat_mine", ["0x5"]);

  // Block number after mining
  const afterBlock = await provider.getBlockNumber();
  console.log("\nBlock number after mining:", afterBlock);

  // Print transactions in last 5 blocks
  console.log("\n--- Transaction history for last 5 blocks ---");
  for (let i = afterBlock - 4; i <= afterBlock; i++) {
    const block = await provider.getBlockWithTransactions(i);
    console.log(`\nBlock #${i} | ${block.transactions.length} tx(s)`);
    block.transactions.forEach((tx) => {
      console.log(`  ${tx.from} -> ${tx.to} | Value: ${ethers.formatEther(tx.value)} ETH | Hash: ${tx.hash}`);
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
