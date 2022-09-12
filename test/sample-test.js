const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DefiCV", () => {
  it("Should store CID", async () => {
    const [owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("DefiCV");
    const contract = await Contract.deploy();
    await contract.deployed();
    const time = Date.now();
    const addTx = await contract.addCV("QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", `${time}`);
    await addTx.wait();
    expect((await contract.getUserAdresses())[0]).to.equal(owner.address);
    const res = await contract.getUser(owner.address);
    expect(res[0][0]).to.equal("QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR");
    expect(res[0][1]).to.equal(`${time}`);
  });
});
