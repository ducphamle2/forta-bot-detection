import { ethers } from "hardhat";

async function main() {

    const stakingToken = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const signers = await ethers.getSigners();

    // need to deploy token first locally
    const stakingContract = await ethers.getContractAt("Staking", stakingToken, signers[1]);

    const result = await stakingContract.unstake(1);
    console.log(`stake result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


