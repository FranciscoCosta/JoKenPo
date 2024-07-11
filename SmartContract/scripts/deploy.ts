import { ethers } from "hardhat";

async function main() {
    const contract = await ethers.getContractFactory("JoKenPo");

    await contract.waitForDeployment();

    const address = await contract.getAddress();

    console.log("JoKenPo deployed to:", address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });