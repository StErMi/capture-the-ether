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

  const factory = await ethers.getContractFactory('GuessTheNewNumberChallenge');

  contract = factory.attach(`0x4C3B329095EF4D1a0DB803D2c0f6F750043A4361`);
});

it('Guess the number', async function () {
  // Develop the challenge here!
  const attackerFactory = await ethers.getContractFactory('GuessTheNewNumberChallengeAttacker');
  const attacker = await attackerFactory.deploy(contract.address, {});

  const tx = await attacker.attack({value: ethers.utils.parseEther('1')});

  if (tx && tx.hash) {
    console.log(formatEtherscanTx(tx.hash));
  }

  // Check the challenge result here!
  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
