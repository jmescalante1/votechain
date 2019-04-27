pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
