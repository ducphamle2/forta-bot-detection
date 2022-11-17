import { ethers } from "hardhat";
import { stakingContract, fortaContract } from './utils';

async function main() {

    // need to deploy token first locally
    const forta = await ethers.getContractAt("FortaToken", fortaContract);

    const result = await forta.approve(stakingContract, 1000000000000000);
    console.log(`approve result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


