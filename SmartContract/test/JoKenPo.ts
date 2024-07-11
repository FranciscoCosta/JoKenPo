import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("JoKenPo", function () {
  async function deployFixture() {
 
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const JoKenPo = await hre.ethers.getContractFactory("JoKenPo");
    const joKenPo = await JoKenPo.deploy();

    return { joKenPo, owner, otherAccount };
  }

  describe("JoKenPo", function () {
    it("Should test", async function () {
      const { joKenPo, owner, otherAccount } = await loadFixture(deployFixture);

      expect(true).to.equal(true);
    });
  });
});
