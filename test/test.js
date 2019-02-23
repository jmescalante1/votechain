const Test = artifacts.require("../contracts/Test.sol");
const SetValue = artifacts.require("../contracts/SetValue.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Test", async(accounts) => {
  let testInstance;
  let svInstance;

  
  beforeEach(async () => {
    svInstance = await SetValue.new({from: "0xCF3759B52fEB18Dc8952ba04586B4f49F4f9A54E"});
    testInstance = await Test.new(svInstance.address, {from: "0xa2Cd6a68E72AEEf037Cc0Ec7B060E5337ddE6914"});
    console.log("test instance address: " + testInstance.address);
  });

  it("should set a value.", async () => {
    let expectedValue = new BigNumber(10);
    await testInstance.set.sendTransaction(expectedValue, {from: "0xa8F49fF61ec7eeBB335F3ceF51b8b126Dafd2a0f"});
    let actualValue = await svInstance.value.call();
    let sender = await svInstance.sender.call();
    console.log("Actual Value: " + actualValue.toString());
    console.log("Sender: " +  sender);
  })
});