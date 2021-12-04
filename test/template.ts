import {ethers} from 'hardhat';
import {BigNumber, Contract, Signer} from 'ethers';
import {expect} from 'chai';
import {formatEtherscanTx} from './utils/format';

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];

  // replace THE_CONTRACT_NAME with the name of the CTE contract
  const factory = await ethers.getContractFactory('THE_CONTRACT_NAME');

  // replace CTE_CONTRACT_ADDRESS_ON_ROPSTEN with the address
  // of the specific CTE contract deployed on Ropsten
  contract = factory.attach(`CTE_CONTRACT_ADDRESS_ON_ROPSTEN`);
});

// Reokace CHALLENGE_NAME with the name of the challenge
it('CHALLENGE_NAME', async function () {
  // Develop the challenge here!
});
