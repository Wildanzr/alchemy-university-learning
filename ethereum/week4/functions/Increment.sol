// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint256 public x;

    constructor(uint256 _x) {
        x = _x;
    }

    function increment() external {
        x++;
    }
}
