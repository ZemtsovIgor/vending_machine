import { expect } from "chai";
import { ethers } from "hardhat";
import Config from "../config/Config";
import {VendingMachineContractType} from "../lib/ContractProvider";
import ContractArguments from "../config/ContractArguments";

describe(Config.contractName, function () {
  let vendingMachine: VendingMachineContractType;
  let ownerAddress: any;
  let userAddress: any;
  let result: any;

  before(async function () {
    const [owner, user] = await ethers.getSigners();

    const VendingMachine = await ethers.getContractFactory(Config.contractName);
    vendingMachine = await VendingMachine.deploy(...ContractArguments) as VendingMachineContractType;

    ownerAddress = owner;
    userAddress = user;
  });

  it('Check initial data', async function () {
    result = await vendingMachine.ItemsCount();

    expect(await vendingMachine.owner()).to.equal(ownerAddress.address);
    expect(result[0]).to.equal(Config.chocolatesAmount);
    expect(result[1]).to.equal(Config.watersAmount);
    expect(result[2]).to.equal(Config.chipsAmount);
  });

  it('Testing get item', async function () {
    // get item for testing user
    result = await vendingMachine.connect(userAddress).GetItem(0);

    await expect(result)
      .to.emit(vendingMachine, "ProductReceived")
      .withArgs(userAddress.address, 0, 1);

    // get vending machine items
    result = await vendingMachine.ItemsCount();

    expect(result[0]).to.equal(Config.chocolatesAmount - 1);
  });

  it('Testing Refill by User', async function () {
    // creating refill by testing user and getting error
    await expect(vendingMachine.connect(userAddress).Refill(
      10,
      0,
      1
    )).to.be.revertedWith(
      "Only owner"
    );
  });

  it('Testing Refill by Owner', async function () {
    // creating refill by owner and getting error
    result = await vendingMachine.connect(ownerAddress).Refill(
      10,
      0,
      1
    );

    await expect(result)
      .to.emit(vendingMachine, "Refilled")
      .withArgs(10, 0, 1);
  });

  it('Check last products amount', async function () {
    // get vending machine items
    result = await vendingMachine.ItemsCount();

    expect(result[0]).to.equal(Config.chocolatesAmount + 9);
  });
});
