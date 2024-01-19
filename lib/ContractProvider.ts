import { VendingMachine as ContractType } from '../typechain/index';

import { ethers } from 'hardhat';
import Config from '../config/Config';

export default class ContractProvider {
  public static async getContract(): Promise<ContractType> {
    // Check configuration
    if (null === Config.contractAddress) {
      throw '\x1b[31merror\x1b[0m ' + 'Please add the contract address to the configuration before running this command.';
    }

    if (await ethers.provider.getCode(Config.contractAddress) === '0x') {
      throw '\x1b[31merror\x1b[0m ' + `Can't find a contract deployed to the target address: ${Config.contractAddress}`;
    }

    return await ethers.getContractAt(Config.contractName, Config.contractAddress) as ContractType;
  }
};

export type VendingMachineContractType = ContractType;
