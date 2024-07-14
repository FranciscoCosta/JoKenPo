import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

describe("JoKenPo", function () {
  async function deployFixture() {
    const [owner, player1, player2] = await hre.ethers.getSigners();
    const JoKenPo = await hre.ethers.getContractFactory("JoKenPo");
    const joKenPo = await JoKenPo.deploy();

    return { joKenPo, owner, player1, player2 };
  }

  const Options = { NONE: 0, Rock: 1, Paper: 2, Scissors: 3 }; // 0, 1, 2, 3
  const DEFAULT_BID = ethers.parseEther("0.1");

  it("Should get the leaderboard", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    const player2Instance = joKenPo.connect(player2);
    await player2Instance.play(Options.Rock, { value: DEFAULT_BID });

    const leaderboard = await joKenPo.getLeaderboard();

    expect(leaderboard[0].wallet).to.equal(player1.address);
    expect(leaderboard[0].wins).to.equal(1);
    expect(leaderboard.length).to.equal(1);
  });
  
  it("Should set the bid", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    await joKenPo.setBid(ethers.parseEther("0.2"));
    const updatedBid = await joKenPo.getBid();
    expect(updatedBid).to.equal(ethers.parseEther("0.2"));
  });

  it("Should not set the bid if not owner", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await expect(player1Instance.setBid(ethers.parseEther("0.2"))).to.be.revertedWith("Only the owner can set the bid");
  }
  );

  it("Should not change the bid if game is ongoing", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    await expect(joKenPo.setBid(ethers.parseEther("0.2"))).to.be.revertedWith("Cannot change bid while a game is in progress");
  })

  it("Should set comission fee", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const newComission = 11;
    await joKenPo.setComission(newComission);
    const updatedFee = await joKenPo.getComission();
    expect(updatedFee).to.equal(11);
  })

  it("Should not set comission fee if not owner", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await expect(player1Instance.setComission(11)).to.be.revertedWith("Only the owner can set the comission");
  })

  it("Should not set comission fee if game is ongoing", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    await expect(joKenPo.setComission(11)).to.be.revertedWith("Cannot change comission while a game is in progress");
  })

  it("Should not set comission fee if it is greater than 100", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    await expect(joKenPo.setComission(101)).to.be.revertedWith("Comission must be between 0 and 100");
  }
  );

  it("Should play alone", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    const result = await joKenPo.getResult();

    expect(result).to.equal('Waiting for the other player');
  });

  it("Should play with another player", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    const player2Instance = joKenPo.connect(player2);
    await player2Instance.play(Options.Rock, { value: DEFAULT_BID });

    const result = await joKenPo.getResult();

    expect(result).to.equal('Player 1 wins');
  });

  it("Should play with another player and draw", async function () {
    const { joKenPo, owner, player1, player2 } = await loadFixture(deployFixture);

    const player1Instance = joKenPo.connect(player1);
    await player1Instance.play(Options.Paper, { value: DEFAULT_BID });

    const player2Instance = joKenPo.connect(player2);
    await player2Instance.play(Options.Paper, { value: DEFAULT_BID });

    const result = await joKenPo.getResult();

    expect(result).to.equal('It is a tie, play again');
  });

});