pragma solidity ^0.5.0;

import "./SetValue.sol";

contract Test {
    SetValue sv;

    constructor(address _SetValueAddress) public {
        sv = SetValue(_SetValueAddress);
    }

    function set(uint256 value) 
        public 
    {
        sv.set(value);
    }
}