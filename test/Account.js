const Account = artifacts.require("../contracts/Account.sol");

const should = require('chai')
  .use(require('chai-as-promised'))
  .should();

let accountInstance;

contract("Account", async(accounts) => {
  beforeEach(async () => {
    accountInstance = await Account.new();
  });

  

  it("...has correct owner.", async () => {
    let owner = await accountInstance.owner();
   
    owner.should.equal('0x0C8D9A6BBB5B79289bD93739E04366c6c27A2f05');
    
  });
});