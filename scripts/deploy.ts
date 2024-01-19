import { ethers } from "hardhat";
import Config from '../config/Config';
import { VendingMachineContractType } from '../lib/ContractProvider';
import ContractArguments from './../config/ContractArguments';

async function main() {
  console.log('Deploying contract...');

  const Contract = await ethers.getContractFactory(Config.contractName);
  const contract = await Contract.deploy(...ContractArguments) as VendingMachineContractType;

  await contract.waitForDeployment();

  console.log('Contract deployed to:', await contract.getAddress());

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
