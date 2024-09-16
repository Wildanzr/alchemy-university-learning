import {
  Alchemy,
  Network,
  Wallet,
  Utils,
  TransactionRequest,
} from 'alchemy-sdk';
import * as dotenv from 'dotenv';
import { toBigInt } from 'ethers';
dotenv.config();

const API_KEY = process.env.ALCHEMY_API_KEY!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const alchemy = new Alchemy({
  apiKey: API_KEY,
  network: Network.BASE_SEPOLIA,
});

const wallet = new Wallet(PRIVATE_KEY, alchemy);

const main = async () => {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest',
  );
  console.log('Nonce: ', nonce);

  const tx: TransactionRequest = {
    to: '0x20047D546F34DC8A58F8DA13fa22143B4fC5404a',
    value: Utils.parseEther('0.001').toBigInt(),
    gasLimit: toBigInt(21000),
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei').toBigInt(),
    maxFeePerGas: Utils.parseUnits('20', 'gwei').toBigInt(),
    nonce,
    chainId: 84532, // Base Sepolia
    type: 2,
  };
  console.log('Transaction: ', tx);

  const rawTx = await wallet.signTransaction(tx);
  console.log('Raw Transaction: ', rawTx);

  const resultTx = await alchemy.core.sendTransaction(rawTx);
  console.log('Transaction Hash: ', resultTx.hash);
};

main();
