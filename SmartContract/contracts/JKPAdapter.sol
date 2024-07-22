// SPDX-LICENSE-Identifier: MIT

pragma solidity ^0.8.24;

import "./IJoKenPo.sol";
import "./JKPLibrary.sol";

contract JKPAdapter{

    IJoKenPo private joKenPo;

    address public immutable owner;

    constructor(){
        owner = tx.origin;
    }

    function upgrade(address newImplementation) external onlyOwner {
        require(newImplementation != address(0), "Invalid address");
        joKenPo = IJoKenPo(newImplementation);
    }

    function getAddress() external view upgraded returns (address) {
        return address(joKenPo);
    }

    function getResult() external view upgraded returns (string memory)  {
        return joKenPo.getResult();
    }

    function getBid() external view upgraded  returns (uint256) {
        return joKenPo.getBid();
    }

    function getComission() external view upgraded returns (uint8) {
        return joKenPo.getComission();
    }

    function getBalance() external view upgraded returns (uint256) {
        return joKenPo.getBalance();
    }

    function getLeaderboard() external view upgraded returns (JKPLibrary.Player[] memory) {
        return joKenPo.getLeaderboard();
    }

    function setComission(uint8 newComission) external upgraded onlyOwner {
        return joKenPo.setComission(newComission);
    }

    function setBid(uint256 newBid) external upgraded onlyOwner {
        return joKenPo.setBid(newBid);
    }

    // This function is payable because the play function in JoKenPo is payable
    function play(JKPLibrary.Options newChoice) external  payable upgraded{
        return joKenPo.play{value: msg.value}(newChoice);
    }

    modifier upgraded() {
        require(address(joKenPo) != address(0), "You must upgrade the implementation first");
        _;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "Only the owner can call this function");
        _;
    }
}