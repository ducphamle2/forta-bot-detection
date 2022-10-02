import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("Forta", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFortaERC20Token() {
        const Forta = await ethers.getContractFactory("FortaToken");
        const initialSupply = 10000000;
        const forta = await Forta.deploy(initialSupply); // ERC20 token

        await forta.deployed();

        const fortaContract = await ethers.getContractAt("FortaToken", forta.address);

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        return { fortaContract, initialSupply, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right initial supply", async function () {
            const { initialSupply, fortaContract } = await loadFixture(deployFortaERC20Token);

            expect(await fortaContract.totalSupply()).to.equal(BigNumber.from(initialSupply));
        });

        it("Should set the symbol", async function () {
            const { fortaContract } = await loadFixture(deployFortaERC20Token);

            expect(await fortaContract.symbol()).to.equal("FT");

            expect(await fortaContract.name(), "Forta")
        });

    });
});
