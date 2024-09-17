//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    constructor() Ownable(msg.sender) {}

    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount <= 100000000000000000, "Should 0.1 ETH");
        payable(msg.sender).transfer(_amount);
    }

    // fallback function
    receive() external payable {}
}
