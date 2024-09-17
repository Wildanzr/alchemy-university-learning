// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint256 _number) external pure returns (uint256 doubled) {
        doubled = _number * 2;
    }
}
