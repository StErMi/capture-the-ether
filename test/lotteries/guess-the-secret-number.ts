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

  const factory = await ethers.getContractFactory('GuessTheSecretNumberChallenge');

  contract = factory.attach(`0xb4c131621021a2e928B992d0A99cdf94b2dF2b4b`);
});

it('Guess the secret number', async function () {
  // Develop the challenge here!

  const secretNumberHash = '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';
  const maxNumbers = 2 ** 8;
  let secretNumber = undefined;

  for (let i = 0; i < maxNumbers; i++) {
    const calculatedKeccak256 = ethers.utils.keccak256([i]);
    if (calculatedKeccak256 === secretNumberHash) {
      secretNumber = i;
      console.log(`Secret number found: ${i}`);
      break;
    }
  }

  const tx = await contract.guess(secretNumber, {value: ethers.utils.parseEther('1')});

  if (tx && tx.hash) {
    console.log(formatEtherscanTx(tx.hash));
  }

  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
