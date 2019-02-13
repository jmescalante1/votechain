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

  it("should delete a candidate", async () => {
    let accountToUse = "0x281a1316FC1e113C8Dc8542D4E281412a28490be"

    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName);

    // then add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    await votechainInstance.addPosition.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected);

    // finally, add a candidate 
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidate.sendTransaction(expectedPositionKey, expectedCandidateName);

    // verify if the candidate was indeed recorded.
    let expectedCandidateKey = new BigNumber(1);
    let isCandidate = await votechainInstance.isCandidate.call(expectedCandidateKey);
    expect(isCandidate, "The candidate should be added first.").to.be.true;

    // verify if the candidate was also added in the position where it belongs to
    let isCandidateInPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateInPosition, "The candidate should also be added in the position with key " + expectedPositionKey.toString()).to.be.true;

    // delete the candidate
    await votechainInstance.deleteCandidate.sendTransaction(expectedCandidateKey, {from: accountToUse});
    let isDeletedCandidate = !(await votechainInstance.isCandidate.call(expectedCandidateKey));
    expect(isDeletedCandidate, "The candidate should be deleted.").to.be.true;

    // verify if the candidate was also deleted in the position where it belongs to
    let isDeletedCandidateInPosition = !(await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey));
    expect(isDeletedCandidateInPosition, "The candidate should also be deleted in the position with key " + expectedPositionKey.toString()).to.be.true;

  });

  it("should delete a position", async () => {
    let accountToUse = "0x281a1316FC1e113C8Dc8542D4E281412a28490be"

    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName);

    // then add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    await votechainInstance.addPosition.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected);

    // add a candidate 
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidate.sendTransaction(expectedPositionKey, expectedCandidateName);

    // and anotther candidate
    let expectedCandidateName2 = "Alley";
    await votechainInstance.addCandidate.sendTransaction(expectedPositionKey, expectedCandidateName2);

    // verify if the position was indeed recorded
    let isPosition = await votechainInstance.isPosition.call(expectedPositionKey);
    expect(isPosition, "The position should be added first.").to.be.true;

    // delete the position
    await votechainInstance.deletePosition.sendTransaction(expectedPositionKey);
    let isDeletedPosition = !(await votechainInstance.isPosition.call(expectedPositionKey));
    expect(isDeletedPosition, "The added position should be deleted.").to.be.true;

    // the position should also be deleted inside the election where it belongs to
    let isDeletedPositionInElection = !(await votechainInstance.isPositionAt.call(expectedElectionKey, expectedPositionKey));
    expect(isDeletedPositionInElection, "The added position should be deleted in the election where it belongs to.").to.be.true;

    // all the candidates inside the position should also be deleted
    let expectedCandidateKey = new BigNumber(1);
    let isDeletedCandidate = !(await votechainInstance.isCandidate(expectedCandidateKey));
    expect(isDeletedCandidate, "The candidate 1 in this position should be deleted.").to.be.true;

    let expectedCandidateKey2 = new BigNumber(2);
    let isDeletedCandidate2 = !(await votechainInstance.isCandidate(expectedCandidateKey2));
    expect(isDeletedCandidate2, "The candidate 2 in this position should be deleted.").to.be.true;
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