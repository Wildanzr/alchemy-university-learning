import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:withdrawfaucet", "Withdraw all funds from Faucet Contract")
  .addOptionalParam("address", "Specify the Faucet contract address")
  .addParam("amount", "Amount to withdraw (max 0.1 ETH) per tx")
  .addParam("repeat", "Repeat the amount to withdraw")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers } = hre;

    const signers = await ethers.getSigners();
    const { address, amount, repeat } = taskArguments;

    const lock = await ethers.getContractAt("Faucet", address);

    for (let i = 0; i < repeat; i++) {
      console.log(`Withdrawing ${amount} ETH`);
      const tx = await lock.connect(signers[0]).withdraw(amount, {
        gasLimit: 100000,
      });
      console.log("Tx Hash: ", tx.hash);
    }

    console.log("Lock Withdraw Success");
  });
