pragma solidity ^0.5.0;

contract SetValue {
    uint256 public value = 0;
    address public sender;

    function set(uint256 _value) 
        public
        returns (uint256)
    {
        sender = msg.sender;
        return value = _value;
    }
}