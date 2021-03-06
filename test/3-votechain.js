const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain", async(accounts) => {
  let votechainInstance;
  const adminAccount = accounts[0];
  const adminName = "JM";

  beforeEach(async () => {
    votechainInstance = await Votechain.new(adminAccount, adminName);
  });

  // it("should allow a voter to cast a vote.", async () => {
  //   // add first an election 
  //   let expectedElectionName = "CAS";
  //   await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

  //   // add a position
  //   let expectedElectionKey = new BigNumber(1);
  //   let expectedPositionName = "CEO";
  //   let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
  //   await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

  //   // add a candidate
  //   let expectedPositionKey = new BigNumber(1);
  //   let expectedCandidateName = "JM";
  //   await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, {from: adminAccount});
    
  //   // verify if the candidate was successfully recorded
  //   let expectedCandidateKey = new BigNumber(1);
  //   let isCandidateAtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
  //   expect(isCandidateAtPosition, "The candidate should be added.").to.be.true;

  //   // add a voter
  //   let expectedVoterKey = "0xc09972BaE6E393b4C3f22D81DB3AC55554c1b975";
  //   let expectedVoterStudentNo = "2015-09899";
  //   let expectedVoterName = "Alley";
  //   await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

  //   // verify if the voter was successfully recorded.
  //   let isVoterAtElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
  //   expect(isVoterAtElection, "The voter should be added in the election.").to.be.true;

  //   // start the election
  //   await votechainInstance.startElection.sendTransaction(expectedElectionKey, {from: adminAccount});

  //   // cast a vote
  //   await votechainInstance.castVote.sendTransaction(expectedCandidateKey, {from: expectedVoterKey});

  //   // verify if the vote was successfully casted
  //   let expectedVoteKey = new BigNumber(1);
  //   let isVote = await votechainInstance.isVote.call(expectedVoteKey);
  //   expect(isVote, "The vote was not casted successfully.").to.be.true;

  //   // verify if the vote has correct fields
  //   let expectedKeyIndex = new BigNumber(0);
  //   let vote = await votechainInstance.voteList.call(expectedVoteKey);
  //   let actualVoteElectionKey = vote["electionKey"];
  //   let actualVotePositionKey = vote["positionKey"];
  //   let actualVoteCandidateKey = vote["candidateKey"];
  //   let actualVoteVoterKey = vote["voterKey"];
  //   let actualVoteKeyIndex = vote["keyIndex"];

  //   expect(actualVoteElectionKey.toString(), "The election key of the casted vote should be " + expectedElectionKey.toString() + ".").to.be.deep.equal(expectedElectionKey.toString());
  //   expect(actualVotePositionKey.toString(), "The position key of the casted vote should be " + expectedPositionKey.toString() + ".").to.be.deep.equal(expectedPositionKey.toString());
  //   expect(actualVoteCandidateKey.toString(), "The candidate key of the casted vote should be " + expectedCandidateKey.toString() + ".").to.be.deep.equal(expectedCandidateKey.toString());
  //   expect(actualVoteVoterKey.toString(), "The voter key of the casted vote should be " + expectedVoterKey.toString() + ".").to.be.deep.equal(expectedVoterKey.toString());
  //   expect(actualVoteKeyIndex.toString(), "The key index of the casted vote should be " + expectedKeyIndex.toString() + ".").to.be.deep.equal(expectedKeyIndex.toString());
    
  //   // verify if the key was also added in the list of vote keys of the candidate
  //   let isVoteAtCandidate = await votechainInstance.isVoteAtCandidate.call(expectedCandidateKey, expectedVoteKey);
  //   expect(isVoteAtCandidate, "The key of the casted vote should be added in the list of votekeys of the candidate.").to.be.true;

  //   // verify if the key was also added in the list of vote keys of the voter
  //   let isVoteAtVoter = await votechainInstance.isVoteAtVoter.call(expectedVoterKey, expectedVoteKey);
  //   expect(isVoteAtVoter, "The key of the casted vote should be added in the list of votekeys of the voter.").to.be.true;
  // });
  
  
  it("should allow a voter to cast a bulk vote.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "CEO";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // add a candidate
    let noPartyKey = new BigNumber(0);
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, noPartyKey, {from: adminAccount});

    // add another candidate
    let expectedCandidateName2 = "Alley";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName2, noPartyKey, {from: adminAccount});
    
    // verify if the first candidate was successfully recorded
    let expectedCandidateKey = new BigNumber(1);
    let isCandidateAtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateAtPosition, "The first candidate should be added.").to.be.true;

    // verify if the second candidate was successfully recorded
    let expectedCandidateKey2 = new BigNumber(2);
    let isCandidate2AtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey2);
    expect(isCandidate2AtPosition, "The second candidate should be added.").to.be.true;

    // add a voter
    let expectedVoterKey = "0xF2311fDf9494A76399A68Bf172cF0E9a95a7CC62";
    let expectedVoterStudentNo = "2015-09899";
    let expectedVoterName = "Alley";
    await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

    // verify if the voter was successfully recorded.
    let isVoterAtElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoterAtElection, "The voter should be added in the election.").to.be.true;

    // start the election
    await votechainInstance.startElection.sendTransaction(expectedElectionKey, {from: adminAccount});

    // cast bulk vote
    await votechainInstance.bulkVote.sendTransaction([expectedCandidateKey, expectedCandidateKey2], [], {from: expectedVoterKey});

    // verify if the votes were successfully casted
    let expectedVoteKey = new BigNumber(1);
    let isVote = await votechainInstance.isVote.call(expectedVoteKey);
    expect(isVote, "The first vote was not casted successfully.").to.be.true;

    let expectedVoteKey2 = new BigNumber(2);
    let isVote2 = await votechainInstance.isVote.call(expectedVoteKey2);
    expect(isVote2, "The second vote was not casted successfully.").to.be.true;
  }); 

  it("should allow the voter to cast an abstain vote.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a voter
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterKey = "0xF2311fDf9494A76399A68Bf172cF0E9a95a7CC62";
    let expectedVoterStudentNo = "2015-09899";
    let expectedVoterName = "Alley";
    await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

    // add a position
    let expectedPositionName = "CEO";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    let hasAbstain = true;

    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, hasAbstain, {from: adminAccount});

    // start the election
    await votechainInstance.startElection.sendTransaction(expectedElectionKey, {from: adminAccount});

    // get the added position
    let expectedPositionKey = new BigNumber(1);
    let position = await votechainInstance.positionList.call(expectedPositionKey);
    
    // check if the abstain is successfully added
    let isAbstainActive = position['isAbstainActive'];
    expect(isAbstainActive, 'The abstain option in the position should be active.').to.be.true;

    let expectedAbstainKey = position['abstainKey'];
    let isAbstain = await votechainInstance.isAbstain.call(expectedAbstainKey);
    expect(isAbstain, 'An abstain option is expected to be added in the position.').to.be.true;

    // cast an abstain vote
    await votechainInstance.castAbstain.sendTransaction(expectedAbstainKey, {from: expectedVoterKey});

    // check if the voter successfully casted a vote
    let expectedVoteKey = new BigNumber(1);

    let isVote = await votechainInstance.isVote.call(expectedVoteKey);
    expect(isVote, 'The vote should be casted.').to.be.true;

    // check if the vote is an abstain vote
    let vote = await votechainInstance.voteList.call(expectedVoteKey);
    let actualAbstainKey = vote['abstainKey'];
    expect(actualAbstainKey.toString(), 'The vote has wrong abstain key.').to.be.deep.equal(expectedAbstainKey.toString());
  });
});
