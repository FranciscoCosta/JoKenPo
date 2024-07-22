// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IJoKenPo.sol";
import "./JKPLibrary.sol";

contract JoKenPo is IJoKenPo {
   
    JKPLibrary.Options private choice1 = JKPLibrary.Options.NONE;
    address private player1;
    string private result = "";
    uint256 private bid = 0.01 ether;
    uint8 private comission = 10;

    address payable private immutable owner;
    JKPLibrary.Player[] public players;


    constructor() {
        owner = payable(msg.sender);
    }

    function getBid() external view returns (uint256) {
        return bid;
    }

    function getComission() external view returns (uint8) {
        return comission;
    }

    function getResult() external view returns (string memory) {
        return result;
    }

    function setComission(uint8 newComission) external {
        require(msg.sender == owner, "Only the owner can set the comission");
        require(player1 == address(0), "Cannot change comission while a game is in progress");
        require(newComission >= 0 && newComission <= 100, "Comission must be between 0 and 100");
        comission = newComission;
    }

    function setBid(uint256 newBid) external {
        require(msg.sender == owner, "Only the owner can set the bid");
        require(newBid > 0, "Bid must be greater than 0");
        require(player1 == address(0), "Cannot change bid while a game is in progress");
        bid = newBid;
    }

    function updateWinner(address winner) private {
        for (uint i = 0; i < players.length; i++) {
            if (players[i].wallet == winner) {
                players[i].wins++;
                break;
            }
        }

        players.push(JKPLibrary.Player(winner, 1));
    }

    function finishGame(string memory newResult, address winner) private {
       address contractAddress = address(this);
       payable(winner).transfer((contractAddress.balance/100) * (100 - comission));
       owner.transfer(contractAddress.balance);

        updateWinner(winner);

        result = newResult;
        player1 = address(0);
        choice1 = JKPLibrary.Options.NONE;
    }

    function getBalance() external view returns (uint) {
        require(msg.sender == owner, "Only the owner can get the balance");
        return address(this).balance;
    }


    function play(JKPLibrary.Options newChoice) external payable {
        // require(msg.sender == owner, "Owner cannot play");
        require(newChoice != JKPLibrary.Options.NONE, "Invalid choice");
        require(player1 != msg.sender, "Wait for the other player to play");
        require(msg.value >= bid, "Invalid bid");

        if(choice1 == JKPLibrary.Options.NONE) {
            player1 = msg.sender;
            choice1 = newChoice;
            result = "Waiting for the other player";
        } else if (choice1 == JKPLibrary.Options.ROCK && newChoice == JKPLibrary.Options.PAPER) {
            finishGame("Player 2 wins", msg.sender);
        } else if (choice1 == JKPLibrary.Options.ROCK && newChoice == JKPLibrary.Options.SCISSORS) {
            finishGame("Player 1 wins", player1);
        } else if (choice1 == JKPLibrary.Options.PAPER && newChoice == JKPLibrary.Options.ROCK) {
            finishGame("Player 1 wins", player1);
        } else if (choice1 == JKPLibrary.Options.PAPER && newChoice == JKPLibrary.Options.SCISSORS) {
            finishGame("Player 2 wins", msg.sender);
        } else if (choice1 == JKPLibrary.Options.SCISSORS && newChoice == JKPLibrary.Options.ROCK) {
            finishGame("Player 2 wins", msg.sender);
        } else if (choice1 == JKPLibrary.Options.SCISSORS && newChoice == JKPLibrary.Options.PAPER) {
            finishGame("Player 1 wins", player1);
        } else {
            result = "It is a tie, play again";
            player1 = address(0);
            choice1 = JKPLibrary.Options.NONE;
        }
    }

    function getLeaderboard() external view returns (JKPLibrary.Player[] memory) {
        if(players.length < 2){
            return players;
        }
        JKPLibrary.Player[] memory arr = new JKPLibrary.Player[](players.length);
        for(uint256 i = 0; i < players.length; i++) arr[i] = players[i];

        for(uint256 i = 0; i < arr.length - 1; i++) {
            for(uint256 j = 0; j < arr.length - i - 1; j++) {
                if(arr[i].wins < arr[j].wins) {
                    JKPLibrary.Player memory change = arr[i];
                    arr[i] = arr[j];
                    arr[j] = change;
                }
            }
        }

        return arr;
    }
}

