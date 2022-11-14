import { ethers } from "hardhat";

async function main() {

    const fortaToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const stakingToken = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // need to deploy token first locally
    const fortaContract = await ethers.getContractAt("FortaToken", fortaToken);

    const result = await fortaContract.approve(stakingToken, 1000000000000000);
    console.log(`approve result: `, result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


