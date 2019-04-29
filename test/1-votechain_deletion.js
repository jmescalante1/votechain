const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain - data deletion", async(accounts) => {
  let votechainInstance;
  const adminAccount = accounts[0];
  const adminName = "JM";
  
  beforeEach(async () => {
    votechainInstance = await Votechain.new(adminAccount, adminName);
  });

  it("should delete an admin.", async () => {
    // add first an admin
    let expectedAdminKey = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45"; 
    let expectedAdminName= "JM";
    await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName, {from: adminAccount});

    // verify if the new admin was successfully recorded
    let isAdmin = await votechainInstance.isAdmin.call(expectedAdminKey);
    expect(isAdmin, "A new admin should be added first.").to.be.true;

    // delete the admin
    await votechainInstance.deleteAdmin.sendTransaction(expectedAdminKey, {from: adminAccount});

    // verify if the admin was successfully deleted
    let isDeletedAdmin = !(await votechainInstance.isAdmin.call(expectedAdminKey));
    expect(isDeletedAdmin, "The new admin should be deleted.").to.be.true;    
  });

  it("should delete an official.", async () => {
    // add first an official
    let expectedOfficialKey = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45"; 
    let expectedOfficialName= "JM";
    await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName, {from: adminAccount});

    // verify if the new official was successfully recorded
    let isOfficial = await votechainInstance.isOfficial.call(expectedOfficialKey);
    expect(isOfficial, "A new official should be added first.").to.be.true;

    // delete the official
    await votechainInstance.deleteOfficial.sendTransaction(expectedOfficialKey, {from: adminAccount});
    let isDeletedOfficial = !(await votechainInstance.isOfficial.call(expectedOfficialKey));
    expect(isDeletedOfficial, "The new official should be deleted.").to.be.true;    
  });

  it("should delete an election.", async () => {
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // verify if the election was indeed recorded
    let expectedElectionKey = new BigNumber(1);
    let isElection = await votechainInstance.isElection.call(expectedElectionKey);
    expect(isElection, "The election should be added first.").to.be.true;

    // add a position
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = 2;
    await votechainInstance.addPositionAt(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, {from: adminAccount});
    
    // verify if the position was indeed recorded
    let expectedPositionKey = new BigNumber(1);
    let isPosition = await votechainInstance.isPositionAt.call(expectedElectionKey,expectedPositionKey);
    expect(isPosition, "The position should be added first in the election.").to.be.true;

    // add a candidate 
    let noPartyKey = new BigNumber(0);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, noPartyKey, {from: adminAccount});

    // verify if the candidate was indeed recorded
    let expectedCandidateKey = new BigNumber(1);
    let isCandidate = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidate, "The candidate should be added first.").to.be.true;

    // add a voter
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedStudentNo = "2015-08795";
    let expectedVoterName = "JM";

    await votechainInstance.addVoterAt(expectedElectionKey, expectedVoterKey, expectedStudentNo, expectedVoterName, {from: adminAccount});

    // verify if the voter was indeed added to the election
    let isVoterAtElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoterAtElection, "The voter should be added first to the election.").to.be.true;

    // verify if the election key was indeed added to the list of election keys of its voter
    let isElectionAtVoter = await votechainInstance.isElectionAt.call(expectedVoterKey, expectedElectionKey);
    expect(isElectionAtVoter, "The election key should also be added to the list of the election keys of the added voter.").to.be.true;

    // delete the added election
    await votechainInstance.deleteElection.sendTransaction(expectedElectionKey, {from: adminAccount});
    
    // verify if the election was successfully deleted.
    let isDeletedElection = !(await votechainInstance.isElection.call(expectedElectionKey));
    expect(isDeletedElection, "The election should be deleted.").to.be.true;

    // verify if the election key has also been deleted in the list of election keys of its voters
    let isDeletedElectionAtVoter = !(await votechainInstance.isElectionAt.call(expectedVoterKey, expectedElectionKey));
    expect(isDeletedElectionAtVoter, "The election key should also be deleted in the list of election keys of its voters.").to.be.true; 
  
    // verify if the position under this election has been deleted too
    let isDeletedPositionAtElection = !(await votechainInstance.isPosition.call(expectedPositionKey));
    expect(isDeletedPositionAtElection, "The position under this election should also be deleted.").to.be.true;

    // verify if the candidate under the deleted position has been deleted too
    let isDeletedCandidateAtPosition = !(await votechainInstance.isCandidate.call(expectedCandidateKey));
    expect(isDeletedCandidateAtPosition, "The candidate under the deleted position should also be deleted.").to.be.true;
  });

  it("should delete a party", async () => {
    // add an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a party
    let expectedElectionKey = new BigNumber(1);
    let expectedPartyName = 'Party';
    await votechainInstance.addPartyAt.sendTransaction(expectedElectionKey, expectedPartyName, {from: adminAccount});

    // verify if the party is successfully added 
    let expectedPartyKey = new BigNumber(1);
    let isParty = await votechainInstance.isParty.call(expectedPartyKey);
    expect(isParty, 'The new party should be added.').to.be.true;

    // delete the party
    await votechainInstance.deleteParty.sendTransaction(expectedPartyKey, {from: adminAccount});

    // verify if the party is successfully deleted
    let isNotParty = !(await votechainInstance.isParty.call(expectedPartyKey));
    expect(isNotParty, 'The party should be deleted.').to.be.true;
  });

  it("should delete a candidate", async () => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a position at the election
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // finally, add a candidate at the position
    let noPartyKey = new BigNumber(0);
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, noPartyKey, {from: adminAccount});

    // verify if the candidate was indeed recorded
    let expectedCandidateKey = new BigNumber(1);
    let isCandidate = await votechainInstance.isCandidate.call(expectedCandidateKey);
    expect(isCandidate, "The candidate should be added first.").to.be.true;

    // verify if the candidate was also added in the position it belongs to
    let isCandidateAtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateAtPosition, "The candidate should also be added in the position with key " + expectedPositionKey.toString() + ".").to.be.true;

    // delete the candidate
    await votechainInstance.deleteCandidate.sendTransaction(expectedCandidateKey, {from: adminAccount});
    let isDeletedCandidate = !(await votechainInstance.isCandidate.call(expectedCandidateKey));
    expect(isDeletedCandidate, "The candidate should be deleted.").to.be.true;

    // verify if the candidate was also deleted in the position where it belongs to
    let isDeletedCandidateAtPosition = !(await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey));
    expect(isDeletedCandidateAtPosition, "The candidate should also be deleted in the position with key " + expectedPositionKey.toString() + ".").to.be.true;
  });

  it("should delete a position", async () => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // then add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    let hasAbstain = false;
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, hasAbstain, {from: adminAccount});

    // finally, add a candidate 
    let noPartyKey = new BigNumber(0);
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, noPartyKey, {from: adminAccount});

    // and another candidate
    let expectedCandidateName2 = "Alley";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName2, noPartyKey, {from: adminAccount});

    // verify if the position was indeed recorded
    let isPosition = await votechainInstance.isPosition.call(expectedPositionKey);
    expect(isPosition, "The position should be added first.").to.be.true;
    
    // add an abstain option
    await votechainInstance.addAbstainAt.sendTransaction(expectedPositionKey, {from: adminAccount});

    // verify if the abstain option was successfully added globally
    let expectedAbstainKey = new BigNumber(1);
    let isAbstain = await votechainInstance.isAbstain.call(expectedAbstainKey);
    expect(isAbstain, "The abstain option should be added.").to.be.true;

    // verify if the abstain option was added to the position
    let isAbstainAtPosition = await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey);
    expect(isAbstainAtPosition, "The position should have an abstain option.").to.be.true;
    
    // delete the position
    await votechainInstance.deletePosition.sendTransaction(expectedPositionKey, {from: adminAccount});
    
    // verify if the position was successfully deleted
    let isDeletedPosition = !(await votechainInstance.isPosition.call(expectedPositionKey));
    expect(isDeletedPosition, "The added position should be deleted.").to.be.true;

    // the position should also be deleted inside the election where it belongs to
    let isDeletedPositionAtElection = !(await votechainInstance.isPositionAt.call(expectedElectionKey, expectedPositionKey));
    expect(isDeletedPositionAtElection, "The added position should be deleted in the election where it belongs to.").to.be.true;

    // all the candidates inside the position should also be deleted
    let expectedCandidateKey = new BigNumber(1);
    let isDeletedCandidate = !(await votechainInstance.isCandidate(expectedCandidateKey));
    expect(isDeletedCandidate, "The candidate 1 in this position should be deleted.").to.be.true;

    let expectedCandidateKey2 = new BigNumber(2);
    let isDeletedCandidate2 = !(await votechainInstance.isCandidate(expectedCandidateKey2));
    expect(isDeletedCandidate2, "The candidate 2 in this position should be deleted.").to.be.true;
  
    // verify if the abstain option was also deleted
    let isDeletedAbstain = !(await votechainInstance.isAbstain.call(expectedAbstainKey));
    expect(isDeletedAbstain, "The abstain option should be deleted.").to.be.true;

    // verify if the abstain option in the position it belongs to was also deleted
    let isDeletedAbstainAtPosition = !(await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey));
    expect(isDeletedAbstainAtPosition, "The abstain option should be deleted in the position with key " + expectedPositionKey.toString() + ".").to.be.true;
  });

  it("should delete a voter in a specified election", async () => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // then add a voter
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedStudentNo = "2015-08795";
    let expectedVoterName = "JM";

    await votechainInstance.addVoterAt(expectedElectionKey, expectedVoterKey, expectedStudentNo, expectedVoterName, {from: adminAccount});

    // verify if the voter is successfully recorded
    let isVoter = await votechainInstance.isVoter(expectedVoterKey);
    expect(isVoter, "A voter should be added first.").to.be.true;

    // delete the added voter at the specified election
    await votechainInstance.deleteVoterAt(expectedElectionKey, expectedVoterKey, {from: adminAccount});
    
    // verify if the voter was successfully deleted at the specified election
    let isDeletedVoterAtElection = !(await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey));
    expect(isDeletedVoterAtElection, "The voter should be deleted at the election with key " + expectedElectionKey).to.be.true;

  });  

  it("should delete an abstain", async () => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    let hasAbstain = false;
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, hasAbstain, {from: adminAccount});

    // add an abstain option
    let expectedPositionKey = new BigNumber(1);
    await votechainInstance.addAbstainAt(expectedPositionKey, {from: adminAccount});

    // verify if the abstain option is successfully added in the position it belongs to.
    let expectedAbstainKey = new BigNumber(1);
    let isAbstainAtPosition = await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey);
    expect(isAbstainAtPosition, "The abstain key should be added in the position with key " + expectedPositionKey.toString() + ".").to.be.true;

    // delete the abstain option
    await votechainInstance.deleteAbstain.sendTransaction(expectedAbstainKey, {from: adminAccount});

    // verify if the abstain option is successfully deleted globally
    let isDeletedAbstain = !(await votechainInstance.isAbstain.call(expectedAbstainKey));
    expect(isDeletedAbstain, "The abstain option should be deleted.").to.be.true;

    // verify if the abstain option is deleted in the position it belongs to
    let isDeletedAbstainAtPosition = !(await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey));
    expect(isDeletedAbstainAtPosition, "The abstain position should be deleted at the position with key " + expectedPositionKey.toString() + ".").to.be.true;
  });
});