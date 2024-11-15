// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract TallyToken is ERC20, ERC20Permit {
    constructor() ERC20("TallyToken", "MTK") ERC20Permit("MyToken") {}
}