import {ethers} from 'hardhat';
import {BigNumber, Contract, Signer} from 'ethers';
import {expect} from 'chai';
import {formatEtherscanTx} from '../utils/format';

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];

  const factory = await ethers.getContractFactory('GuessTheNumberChallenge');

  contract = factory.attach(`0xfA730aEBF582c5Be6DeDaFe12D37bfEEC69c9df0`);
});

it('Guess the number', async function () {
  // Develop the challenge here!
  const tx = await contract.guess(42, {value: ethers.utils.parseEther('1')});

  if (tx && tx.hash) {
    console.log(formatEtherscanTx(tx.hash));
  }

  // Check the challenge result here!
  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
