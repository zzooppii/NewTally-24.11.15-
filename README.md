# Tally Sample

Previously, TallyContract registration was not working, so I updated to the latest version and tested it.

Try running some of the following tasks:

## how to install

```shell
npm install
```

## How to Compile

copy the .env.sample to .env
input the empty value

```shell
npx hardhat compile
```


## How to Deploy on Sepolia

```shell
npx hardhat run scripts/Tally_Deploy.ts --network sepolia
```


## How to Verify TallyTimeLock Contract

Modify arguments.js according to the distributed values.

```shell
npx hardhat verify  --constructor-args arguments.js "TallyTimeLockContractAddress" --network sepolia
```
