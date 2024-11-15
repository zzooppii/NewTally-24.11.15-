import { ethers } from "hardhat";

import dotenv from "dotenv" ;

dotenv.config();

async function main() {
    // const accounts = await ethers.getSigners();
    const deployer = new ethers.Wallet(`${process.env.SEPOLIA_PRIVATE_KEY}`);
    console.log("deployer >>", deployer.address);

    const minDelay = 60;
    let proposers: any[];
    let executors: any[];
    proposers = [];
    executors = [];

    const TestToken = await ethers.deployContract("TallyToken");
    await TestToken.waitForDeployment();
    console.log("TallyToken contract deployed to:", await TestToken.getAddress());
    const TestTokenAddress = await TestToken.getAddress();


    const TestTimelock = await ethers.deployContract("TallyTimeLock",
        [
            minDelay,
            [deployer.address],
            [deployer.address],
            deployer.address
        ]
    );
    const testTimelockAddress = await TestTimelock.getAddress();
    console.log("timelockControllerAddress contract deployed to:", testTimelockAddress);


    const TestGovernance = await ethers.deployContract("TallyGovernance",
        [
            TestTokenAddress,
            testTimelockAddress
        ]
    );
    await TestGovernance.waitForDeployment();
    console.log("TestGovernance contract deployed to:", await TestGovernance.getAddress());
    const GovernanceAddr =  await TestGovernance.getAddress()

    console.log("Deployer :", deployer.address)
    console.log("TestToken deployed :", TestTokenAddress);
    console.log("TestTimelock deployed :", testTimelockAddress);
    console.log("TestGovernance deployed :", GovernanceAddr);

    const grantAllRoleToDaoTx = await TestTimelock.grantAllRole(await TestGovernance.getAddress());
    await grantAllRoleToDaoTx.wait();
    console.log("grantAllRoleToDaoTx tx:", grantAllRoleToDaoTx.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
