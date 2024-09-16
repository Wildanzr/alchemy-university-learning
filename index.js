require("dotenv").config();
const { Alchemy, Network, Utils } = require("alchemy-sdk");

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const main = async () => {
  // Wallet address whose balance you want to query
  const walletAddress = "0xef0dcc839c1490cebc7209baa11f46cfe83805ab";

  // USDT contract address
  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const numDecimals = 6;
  // You can find out how many decimal places any currency has by reading the decimals value from the contract's page on Etherscan.

  // ABI -- defining the functions in the ABI that we want to call using the eth_call method.
  let abi = ["function balanceOf(address account)", "function symbol()"];

  // Create function call data for getting the symbol and balance -- eth_call
  let iface = new Utils.Interface(abi);
  let symbolData = iface.encodeFunctionData("symbol");
  let balanceData = iface.encodeFunctionData("balanceOf", [walletAddress]);

  console.log("Symbol Data:", symbolData);


  // Get symbol of the token in hex format -- usage of eth_call
  let symbolInHex = await alchemy.core.call({
    to: contractAddress,
    data: symbolData,
  });

  // Get balance for the wallet address in hex format -- usage of eth_call
  let balanceInHex = await alchemy.core.call({
    to: contractAddress,
    data: balanceData,
  });

  // Using parseInt we convert the hex value into decimal and then dividing it by number of decimals of the token.
  // .toFixed(2) means that we are only intersted in the first two decimal places.
  balance = (parseInt(balanceInHex) / 10 ** numDecimals).toFixed(2);
  console.log("Decoded Balance:", balance, "USDT");

  console.log("Symbol:", symbolInHex);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();