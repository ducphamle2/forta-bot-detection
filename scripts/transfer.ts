import { ethers } from "hardhat";
import { fortaContract } from './utils';

async function main() {

    // need to deploy token first locally
    const forta = await ethers.getContractAt("FortaToken", fortaContract);

    const result = await forta.transfer('0xE05cCbcbCb088D8Ae063401249366348cf0eD6C4', 100);
    console.log(`transfer result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
