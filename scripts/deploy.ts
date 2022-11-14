import { ethers } from "hardhat";

async function main() {

    const Forta = await ethers.getContractFactory("FortaToken");
    const forta = await Forta.deploy(10000000); // ERC20 token
    await forta.deployed();

    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy(forta.address); // ERC20 token

    await forta.deployed();

    console.log("forta token deployed to: ", forta.address);
    console.log(`staking deployed to ${staking.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
