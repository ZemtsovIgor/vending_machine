// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract VendingMachine {

    address public owner;
    uint[] internal _productsBalances;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    event ProductReceived(address sender, uint productIndex, uint value);
    event Refilled(uint chocolatesAmount, uint watersAmount, uint chipsAmount);

    constructor(
        uint _chocolatesAmount,
        uint _watersAmount,
        uint _chipsAmount
    ) {
        owner = msg.sender;
        _productsBalances.push(_chocolatesAmount);
        _productsBalances.push(_watersAmount);
        _productsBalances.push(_chipsAmount);
    }

    /**
     * @notice Returns numbers of items of each kind in the machine
     *
     */
    function ItemsCount() external view returns(uint, uint, uint) {
        return (_productsBalances[0], _productsBalances[1], _productsBalances[2]);
    }

    /**
     * @notice requires type of item and reduces the number of items of that type by 1
     *
     * @param _productIndex: blocked days count
     *
     */
    function GetItem(uint _productIndex) external {
        require(_productsBalances[_productIndex] >= 1, "Not enough this product in stock");
        _productsBalances[_productIndex] -= 1;
        emit ProductReceived(msg.sender, _productIndex, 1);
    }

    /**
     * @notice requires the amounts of refill -> increases the number if items by amount
     *
     * @param _chocolatesAmount: how many chocolates
     * @param _watersAmount: how many water bottles
     * @param _chipsAmount: how many chips
     *
     * @dev Callable by owner
     *
     */
    function Refill(
        uint _chocolatesAmount,
        uint _watersAmount,
        uint _chipsAmount
    ) public onlyOwner {
        _productsBalances[0] += _chocolatesAmount;
        _productsBalances[1] += _watersAmount;
        _productsBalances[2] += _chipsAmount;

        emit Refilled(_chocolatesAmount, _watersAmount, _chipsAmount);
    }
}
