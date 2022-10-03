import { ethers } from "hardhat";
import { contractName, contractAddress } from './utils';

async function main() {

    // need to deploy token first locally
    const fortaContract = await ethers.getContractAt(contractName, contractAddress);

    const result = await fortaContract.balanceOf(contractAddress)
    console.log(`query result: `, result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
