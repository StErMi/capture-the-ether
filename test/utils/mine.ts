import {ethers} from 'hardhat';

const increaseWorldTimeInSeconds = async (seconds: number, mine = false) => {
  await ethers.provider.send('evm_increaseTime', [seconds]);
  if (mine) {
    await ethers.provider.send('evm_mine', []);
  }
};

export {increaseWorldTimeInSeconds};
