# Capture the Ether

In this repo I'm going to solve every [Capture the Ether](https://capturetheether.com/) challenges.

## Credits

I would like to thanks [Christoph Michel](https://cmichel.io/), I've forked his own [capture-the-ether repository](https://github.com/MrToph/capture-the-ether) to setup mine.

## Setup

### Create an .env file

Rename the `.env.template` file into `.env`.

### Get an Alchemy Ropsten key

Ahead over [Alchemy](https://www.alchemy.com/), create an account and get a Ropsten key. We need a key in order to allow hardhat to fork the Ropsten network and fork it but also to run our test directly on the Ropsten network after we have tested them offline!

Now add the API key you have obtained it replace the it into the `.env` variable `ARCHIVE_URL`

### Generate a burn wallet

Create a burn wallet that will use it to fund with a Ropsten faucet.
One possible solution is to generate a burn wallet here: [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/)

Generate a random mnemonic phrase and replace it into the `.env` variable `MNEMONIC`

Pick the first address that you see in `Derived Addresses` section of the page. That will be your `EOA` that you need to fund with a faucet on Ropsten!

### Fund your wallet

Use a Ropsten faucet to fund your wallet

- https://faucet.ropsten.be/
- https://faucet.paradigm.xyz/

### Setup Hardhat

Head over `hardhat.config.ts` and configure `blockNumber` to which you want your fork to be pinned. This will allow Hardhat to chache the network fork and speed up things.

If you want to learn more head over to their documentation about [Mainnet forking](https://hardhat.org/hardhat-network/guides/mainnet-forking.html#mainnet-forking).

## Implement the solution

### Copy the challenge code locally

For each challenge you need to grab the contract's code from the challenge page and create a local contract into `/contracts`. This will allow us to create locally the contract factory with `const factory = await ethers.getContractFactory('THE_CONTRACT_NAME');` and than attach the factory's contract via `contract = factory.attach('CTE_CONTRACT_ADDRESS_ON_ROPSTEN')`

### Create the test

Now it's time to create the test file to pass the challenge. Use `/test/template.ts` as a template and create a new test file for the challenge you are developing.

Follow the comments in order to setup the test and add your code into the `it` function

### Test the challenge locally

In order to test the challenge on the local Ropsten fork you can execute it with this command

`npx hardhat test test/challenge-test-file.ts`

if the test pass we are ready to test it directly on the Ropsten network!

### Test it on Ropsten

To test it on the Ropsten network execute this command

`npx hardhat test test/challenge-test-file.ts --network ropsten`
