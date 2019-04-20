const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain - data update", async(accounts) => { 
  let votechainInstance;
  const adminAccount = "0x3Ad34a4D3bc3e4443ac4659F9dF404FD38f1Ece4";
  const adminName = "JM";

  beforeEach(async () => {
    votechainInstance = await Votechain.new(adminAccount, adminName);
  });

  it("should update an election.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // update the election 
    let expectedElectionKey = new BigNumber(1);
    let expectedNewElectionName = "USC";
    await votechainInstance.updateElection.sendTransaction(expectedElectionKey, expectedNewElectionName, {from: adminAccount});
    
    // verify if the election was updated successfully
    let election = await votechainInstance.electionList.call(expectedElectionKey);
    let actualNewElectionName = election["name"];
    expect(actualNewElectionName, "The election should be updated.").to.be.deep.equal(expectedNewElectionName);
  });

  it("should update a position.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // then add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // update the position
    let expectedPositionKey = new BigNumber(1);
    let expectedNewPositionName = "CEO";
    let expectedNewMaxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    await votechainInstance.updatePosition.sendTransaction(expectedPositionKey, expectedNewPositionName, expectedNewMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // verify if the position was successfully updated
    let position = await votechainInstance.positionList.call(expectedPositionKey);
    let actualNewPositionName = position["name"];
    let actualNewMaxNoOfCandidatesThatCanBeSelected = position["maxNoOfCandidatesThatCanBeSelected"];
    
    expect(actualNewPositionName, "The position name should be updated.").to.be.deep.equal(expectedNewPositionName);
    expect(actualNewMaxNoOfCandidatesThatCanBeSelected.toString(), "The max no of candidates that can be selected should be updated.").to.be.deep.equal(expectedNewMaxNoOfCandidatesThatCanBeSelected.toString());
  });

  it("should update a candidate.", async () => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a position 
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(1);

    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // add a candidate
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "MJ";
    
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, {from: adminAccount});

    // update the candidate
    let expectedCandidateKey = new BigNumber(1);
    let expectedNewCandidateName = "JM";

    await votechainInstance.updateCandidate.sendTransaction(expectedCandidateKey, expectedNewCandidateName, {from: adminAccount});

    // verify if the candidate was successfully updated
    let candidate = await votechainInstance.candidateList.call(expectedCandidateKey);
    let actualNewCandidateName = candidate["name"];

    expect(actualNewCandidateName, "The candidate name should be updated.").to.be.deep.equal(expectedNewCandidateName);
  });

  it("should update an admin.", async () => {
    // add first an admin
    let expectedAdminKey = "0xc0254096f0b6fb30e22a5cc57fdd53313E28DD5E";
    let expectedAdminName = "MJ";
    await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName, {from: adminAccount});

    // update the added admin
    let expectedNewAdminName = "JM";
    await votechainInstance.updateAdmin.sendTransaction(expectedAdminKey, expectedNewAdminName, {from: expectedAdminKey});
  
    // verify if the admin was successfully updated
    let admin = await votechainInstance.adminList.call(expectedAdminKey);
    let actualNewAdminName = admin["name"];

    expect(actualNewAdminName, "The admin name should be updated.").to.be.deep.equal(expectedNewAdminName);
  });

  it("should update an official.", async () => {
    // add first an official
    let expectedOfficialKey = "0x3Ad34a4D3bc3e4443ac4659F9dF404FD38f1Ece4";
    let expectedOfficialName = "MJ";

    await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName, {from: adminAccount});

    // update the added official
    let expectedNewOfficialName = "JM";
    await votechainInstance.updateOfficial.sendTransaction(expectedOfficialKey, expectedNewOfficialName, {from: expectedOfficialKey});

    // verify if the official was successfully updated
    let official = await votechainInstance.officialList.call(expectedOfficialKey);
    let actualNewOfficialName = official["name"];
    
    expect(actualNewOfficialName, "The official name should be updated.").to.be.deep.equal(expectedNewOfficialName);

  });

  it("should update a voter.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a voter
    let expectedVoterKey = "0xefbE8Ec783D3815576622932e63594546769b5ea";
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterName = "Yella";
    let expectedVoterStudentNo = "2014-09899";

    await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

    // update the voter
    let expectedNewVoterName = "Alley";
    let expectedNewVoterStudentNo = "2015-09899";

    await votechainInstance.updateVoter.sendTransaction(expectedVoterKey, expectedNewVoterStudentNo, expectedNewVoterName, {from: expectedVoterKey});

    // verify if the voter was successfully updated
    let voter = await votechainInstance.voterList.call(expectedVoterKey);
    let actualNewVoterName = voter["name"];
    let actualNewVoterStudentNo = voter["studentNo"];

    expect(actualNewVoterStudentNo, "The voter's student number should be updated.").to.be.deep.equal(expectedNewVoterStudentNo);
    expect(actualNewVoterName, "The voter name should be updated.").to.be.deep.equal(expectedNewVoterName);
    
  });
});