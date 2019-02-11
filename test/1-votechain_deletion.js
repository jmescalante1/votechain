const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

let votechainInstance;

contract("Votechain - data deletion", async(accounts) => {
  beforeEach(async () => {
    votechainInstance = await Votechain.new();
  });

  it("should delete an admin.", async () => {
    // add first an admin
    let expectedAdminKey = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45"; 
    let expectedAdminName= "JM";
    await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName);

    // verify if the new admin was successfully recorded
    let isAdmin = await votechainInstance.isAdmin.call(expectedAdminKey);
    expect(isAdmin, "A new admin should be added first.").to.be.true;

    // delete the admin
    await votechainInstance.deleteAdmin.sendTransaction(expectedAdminKey);
    let isDeletedAdmin = !(await votechainInstance.isAdmin.call(expectedAdminKey));
    expect(isDeletedAdmin, "The new admin should be deleted.").to.be.true;    

  });

  it("should delete an official.", async () => {
    // add first an official
    let expectedOfficialKey = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45"; 
    let expectedOfficialName= "JM";
    await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName);

    // verify if the new official was successfully recorded
    let isOfficial = await votechainInstance.isOfficial.call(expectedOfficialKey);
    expect(isOfficial, "A new official should be added first.").to.be.true;

    // delete the official
    await votechainInstance.deleteOfficial.sendTransaction(expectedOfficialKey);
    let isDeletedOfficial = !(await votechainInstance.isOfficial.call(expectedOfficialKey));
    expect(isDeletedOfficial, "The new official should be deleted.").to.be.true;    

  });

  // it("should delete an election.", async () => {
  //   // add first an election 
  //   let expectedElectionName = "CAS";
  //   await votechainInstance.addElection.sendTransaction(expectedElectionName);

  //   // verify if the new election was successfully recorded
  //   let expectedElectionKey = new BigNumber(1);
  //   let isElection = await votechainInstance.isElection.call(expectedElectionKey);
  //   expect(isElection, "The new election should be added.").to.be.true;

  //   // delete the election
  //   await votechainInstance.deleteElection.sendTransaction(expectedElectionKey);
  //   let isDeletedElection = !(await votechainInstance.isElection.call(expectedElectionKey));
  //   expect(isDeletedElection, "The new election should be deleted.").to.be.true;    

  // });
});