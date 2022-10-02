import "@nomicfoundation/hardhat-toolbox";
import "hardhat-forta";

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