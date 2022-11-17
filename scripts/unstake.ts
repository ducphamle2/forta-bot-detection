import { ethers } from "hardhat";
import { stakingContract } from './utils';

async function main() {

    const signers = await ethers.getSigners();

    // need to deploy token first locally
    const staking = await ethers.getContractAt("Staking", stakingContract, signers[1]);

    const result = await staking.unstake(1);
    console.log(`stake result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


