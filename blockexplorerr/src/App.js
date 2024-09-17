import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    async function getBlockTxs() {
      const txns = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTxs(txns.transactions);
    }
    async function getBlockNumber() {
      const number = await alchemy.core.getBlockNumber();
      setBlockNumber(number);
      getBlockTxs();
    }

    getBlockNumber();
  });

  return (
    <div className="App">
        <p>
          Block number: {blockNumber}
        </p>
      <div>
        <h2>Transactions</h2>
          <ul>
        {txs.length > 0 && (
          txs.map((tx, index) => (
            <li key={index}>
              <p>From: {tx.from}</p>
              <p>To: {tx.to}</p>
              <p>Nonce: {tx.nonce}</p>
              <p>Hash: {tx.hash}</p>
            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  )
}

export default App;
