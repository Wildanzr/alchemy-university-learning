/* eslint-disable @typescript-eslint/no-require-imports */
const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    // TODO: donate to charity!
    const wallet = new Wallet(privateKey, provider);
    for (const addr of charities) {
        await wallet.sendTransaction({
            value: utils.parseUnits('1', 'ether'),
            to: addr,
            gasLimit: 21000
        })
    }
}

module.exports = donate;