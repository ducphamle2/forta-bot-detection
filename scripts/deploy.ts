import { ethers } from "hardhat";

async function main() {
    const Forta = await ethers.getContractFactory("FortaToken");
    const forta = await Forta.deploy(10000000); // ERC20 token

    await forta.deployed();

    console.log(`Forta deployed to ${forta.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
