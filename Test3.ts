"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const TEST_RATIO = 1;
describe("NFT Shop", async () => {
    let tokenSaleContract;
    let paymentTokenContract;
    let erc20ContractFactory;
    let erc721ContractFactory;
    let tokenSaleContractFactory;
    beforeEach(async () => {
        const [accounts, erc20ContractFactory, erc721ContractFactory, tokenSaleContractFactory,] = await Promise.all([
            hardhat_1.ethers.getSigners(),
            hardhat_1.ethers.getContractFactory("MyERC20"),
            hardhat_1.ethers.getContractFactory("MyERC721"),
            hardhat_1.ethers.getContractFactory("TokenSale"),
        ]);
        paymentTokenContract = await erc20ContractFactory.deploy();
        await paymentTokenContract.deployed();
        tokenSaleContract = await tokenSaleContractFactory.deploy(TEST_RATIO, paymentTokenContract.address);
        await tokenSaleContract.deployed();
        const MINTER_ROLE = await paymentTokenContract.MINTER_ROLE();
        const roleTx = await paymentTokenContract.grantRole(MINTER_ROLE, paymentTokenContract.address);
        await roleTx.wait();
    });
    describe("When the Shop contract is deployed", async () => {
        it("defines the ratio as provided in parameters", async () => {
            const ratio = await tokenSaleContract.ratio();
            (0, chai_1.expect)(ratio).to.eq(TEST_RATIO);
        });
        it("uses a valid ERC20 as payment token", async () => {
            const paymentAddress = await tokenSaleContract.paymentToken();
            const paymentContract = erc20ContractFactory.attach(paymentAddress);
            await (0, chai_1.expect)(paymentContract.balanceOf(accounts[0].address)).not.to.be.reverted;
            await (0, chai_1.expect)(paymentContract.totalSupply()).not.to.be.reverted;
        });
    });
    describe("When a user purchase an ERC20 from the Token contract", async () => {
        const buyValue = hardhat_1.ethers.utils.parseEther("1");
        beforeEach(async () => {
            const tx = await tokenSaleContract
                .connect(accounts[1])
                .buyTokens({ value: buyValue });
            await tx.wait();
        });
        it("charges the correct amount of ETH", async () => {
            throw new Error("Not implemented");
        });
        it("gives the correct amount of tokens", async () => {
            throw new Error("Not implemented");
        });
    });
    describe("When a user burns an ERC20 at the Token contract", async () => {
        it("gives the correct amount of ETH", async () => {
            throw new Error("Not implemented");
        });
        it("burns the correct amount of tokens", async () => {
            throw new Error("Not implemented");
        });
    });
    describe("When a user purchase a NFT from the Shop contract", async () => {
        it("charges the correct amount of ETH", async () => {
            throw new Error("Not implemented");
        });
        it("updates the owner account correctly", async () => {
            throw new Error("Not implemented");
        });
        it("update the pool account correctly", async () => {
            throw new Error("Not implemented");
        });
        it("favors the pool with the rounding", async () => {
            throw new Error("Not implemented");
        });
    });
    describe("When a user burns their NFT at the Shop contract", async () => {
        it("gives the correct amount of ERC20 tokens", async () => {
            throw new Error("Not implemented");
        });
        it("updates the pool correctly", async () => {
            throw new Error("Not implemented");
        });
    });
    describe("When the owner withdraw from the Shop contract", async () => {
        it("recovers the right amount of ERC20 tokens", async () => {
            throw new Error("Not implemented");
        });
        it("updates the owner account correctly", async () => {
            throw new Error("Not implemented");
        });
    });
});
