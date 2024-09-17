// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint256 _number) public pure returns (uint256 doubled) {
        doubled = _number * 2;
    }

    function double(uint256 _number1, uint256 _number2) external pure returns (uint256, uint256) {
        uint256 res1 = double(_number1);
        uint256 res2 = double(_number2);

        return (res1, res2);
    }
}
