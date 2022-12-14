import { ethers } from "hardhat";
import { contractName, fortaContract, stakingContract } from './utils';

async function main() {

    // need to deploy token first locally
    const forta = await ethers.getContractAt("FortaToken", fortaContract);

    const result = await forta.balanceOf(fortaContract)
    console.log(`query result: `, result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
