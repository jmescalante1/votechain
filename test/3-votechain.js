const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain", async(accounts) => {
  let votechainInstance;
  const adminAccount = "0x0C8D9A6BBB5B79289bD93739E04366c6c27A2f05";
  const adminName = "JM";

  beforeEach(async () => {
    votechainInstance = await Votechain.new(adminAccount, adminName);
  });

  it("should allow a voter to cast a vote.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    // add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "CEO";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // add a candidate
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, {from: adminAccount});

    // verify if the candidate was successfully recorded
    let expectedCandidateKey = new BigNumber(1);
    let isCandidateAtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateAtPosition, "The candidate should be added.").to.be.true;

    // add a voter
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedVoterStudentNo = "2015-09899";
    let expectedVoterName = "Alley";
    await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

    // verify if the voter was successfully recorded.
    let isVoterAtElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoterAtElection, "The voter should be added in the election.").to.be.true;

    // cast a vote
    await votechainInstance.vote.sendTransaction(expectedCandidateKey, {from: expectedVoterKey});

    // verify if the vote was successfully casted
    let expectedVoteKey = new BigNumber(1);
    let isVote = await votechainInstance.isVote.call(expectedVoteKey);
    expect(isVote, "The vote was not casted successfully.").to.be.true;

    // verify if the vote has correct fields
    let expectedKeyIndex = new BigNumber(0);
    let vote = await votechainInstance.voteList.call(expectedVoteKey);
    let actualVoteElectionKey = vote["electionKey"];
    let actualVotePositionKey = vote["positionKey"];
    let actualVoteCandidateKey = vote["candidateKey"];
    let actualVoteVoterKey = vote["voterKey"];
    let actualVoteKeyIndex = vote["keyIndex"];

    expect(actualVoteElectionKey.toString(), "The election key of the casted vote should be " + expectedElectionKey.toString() + ".").to.be.deep.equal(expectedElectionKey.toString());
    expect(actualVotePositionKey.toString(), "The position key of the casted vote should be " + expectedPositionKey.toString() + ".").to.be.deep.equal(expectedPositionKey.toString());
    expect(actualVoteCandidateKey.toString(), "The candidate key of the casted vote should be " + expectedCandidateKey.toString() + ".").to.be.deep.equal(expectedCandidateKey.toString());
    expect(actualVoteVoterKey.toString(), "The voter key of the casted vote should be " + expectedVoterKey.toString() + ".").to.be.deep.equal(expectedVoterKey.toString());
    expect(actualVoteKeyIndex.toString(), "The key index of the casted vote should be " + expectedKeyIndex.toString() + ".").to.be.deep.equal(expectedKeyIndex.toString());
    
    // verify if the key was also added in the list of vote keys of the candidate
    let isVoteAtCandidate = await votechainInstance.isVoteAtCandidate.call(expectedCandidateKey, expectedVoteKey);
    // expect(isVoteAtCandidate, "The key of the casted vote should be added in the list of votekeys of the candidate.").to.be.true;

    // verify if the key was also added in the list of vote keys of the voter
    let isVoteAtVoter = await votechainInstance.isVoteAtVoter.call(expectedVoterKey, expectedVoteKey);
    expect(isVoteAtVoter, "The key of the casted vote should be added in the list of votekeys of the voter.").to.be.true;
    
  }); 

});
