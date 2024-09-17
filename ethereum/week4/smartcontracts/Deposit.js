/* eslint-disable @typescript-eslint/no-require-imports */
const ethers = require('ethers');

/**
 * Deposit at least 1 ether into the contract 
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of the deposit transaction 
 */
async function deposit(contract) {
    return await contract.deposit({
        value: ethers.utils.parseEther("10")
    });
}

module.exports = deposit;