pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Account is Ownable{
    using SafeMath for uint256;


    constructor() public {
    }

    function getOwner () public view returns(address) {
        return owner;
    }
}
