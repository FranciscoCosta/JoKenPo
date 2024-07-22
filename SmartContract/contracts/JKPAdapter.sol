// SPDX-LICENSE-Identifier: MIT

pragma solidity ^0.8.24;

import "./IJoKenPo.sol";

contract JKPAdapter{

    IJoKenPo private joKenPo;

    address public immutable owner;

    constructor(){
        owner = msg.sender;
    }

    function upgrade(address newImplementation) external {
        require(msg.sender == owner, "Only the owner can upgrade the implementation");
        require(newImplementation != address(0), "Invalid address");
        joKenPo = IJoKenPo(newImplementation);
    }
}