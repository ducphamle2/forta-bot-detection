import { ethers } from "hardhat";

async function main() {

    const fortaToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // need to deploy token first locally
    const fortaContract = await ethers.getContractAt("FortaToken", fortaToken);

    const result = await fortaContract.transfer(fortaToken, 2);
    console.log(`transfer result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
