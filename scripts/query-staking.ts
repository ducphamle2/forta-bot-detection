import { ethers } from "hardhat";
import { contractName, fortaContract, stakingContract } from './utils';

async function main() {

    // need to deploy token first locally
    const staking = await ethers.getContractAt("Staking", stakingContract);

    const funds = await staking.funds("0x16FF312A4d4171a68a7e06c12916015D30235251");
    console.log(`query result: `, funds.toString());

    // query owner
    const owner = await staking.owner();

    console.log("owner: ", owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
