# Forta Detection Bot with Hardhat

Steps: 

0. Install node modules for root & agents/ dir

1. config `hardhat.config.ts` hardhat localhost to have fixed private keys for easy testing & debugging

```js
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
    },
    hardhat: {
      accounts: [{
        privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", balance: "10000000000000000000000"
      },
      {
        privateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", balance: "10000000000000000000000"
      }]
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
    runOnCompile: true,
  },
  gasReporter: {
    enabled: true,
  },
};
```

2. Start localhost Hardhat node: `yarn hardhat node`

3. Change jsonRpcUrl field in `~/.forta/forta.config.json` to change the RPC URL of the node that the bot listens to. 

4. Config `agents/agent-config.json` file with an addition field: `event` (TOOD: come up with better struct to filter)

5. Run Forta bot listener in root directory (not in `agents/` dir): `yarn hardhat forta:run`

6. Deploy the contract: `yarn hardhat run scripts/deploy-forta.ts  --network localhost`

7. Deploy the contract: `yarn hardhat run scripts/deploy-staking.ts  --network localhost`

8. Try sending some tokens: `yarn hardhat run scripts/transfer.ts  --network localhost`