// SPDX-LICENSE-Identifier: MIT

pragma solidity ^0.8.24;

import "./IJoKenPo.sol";
import "./JKPLibrary.sol";

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

    function getAddress() external view upgraded returns (address) {
        return address(joKenPo);
    }

    function getResult() external view upgraded returns (string memory)  {
        return joKenPo.getResult();
    }

    function play(JKPLibrary.Options newChoice) external upgraded payable{
        return joKenPo.play{value: msg.value}(newChoice);
    }

    modifier upgraded() {
        require(address(joKenPo) != address(0), "You must upgrade the implementation first");
        _;
    }
}