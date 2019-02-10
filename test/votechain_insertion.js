const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

let votechainInstance;

contract("Votechain - data insertion", async(accounts) => {
  beforeEach(async () => {
    votechainInstance = await Votechain.new();
  });

  it("should add a new election.", async () => {
    await votechainInstance.addElection.sendTransaction("Election1");
    
    let election = await votechainInstance.electionList.call(new BigNumber(1));
    expect(election["name"], "Election1 should be the name of the added election.").to.be.deep.equal("Election1");
    expect(election["keyIndex"].toString(), "The added election should have a keyIndex of 0").to.be.deep.equal(new BigNumber(0).toString());

    let electionKey = await votechainInstance.electionKeyList.call(0);
    expect(electionKey.toString(), "The key of the added election should be 1").to.be.deep.equal(new BigNumber(1).toString());
  });

  it("should add a new position.", async() => {
    await votechainInstance.addElection.sendTransaction("CASSC");
    
    let expectedElectionKey = new BigNumber(1); 
    let positionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);

    await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionName, maxNoOfCandidatesThatCanBeSelected);

    // it should be added in the positionList with key 1 as it is the first element
    let expectedPositionKey = new BigNumber(1);
    let position = await votechainInstance.positionList.call(expectedPositionKey);
    
    // should have a right name, electionKey, keyIndex, and other fields
    expect(position["name"], "President should be the name of the added position").to.be.deep.equal("President");
    expect(position["electionKey"].toString(), "1 should be the election key of the added position").to.be.deep.equal(new BigNumber(1).toString());
    expect(position["keyIndex"].toString(), "0 should be the key index of the added position").to.be.deep.equal(new BigNumber(0).toString());
    expect(position["maxNoOfCandidatesThatCanBeSelected"].toString(), "2 should be the max no of candidates that can be selected").to.be.deep.equal(new BigNumber(2).toString());
    
    // it should exist as a position in the election it belongs to
    let isPositionInElection = await votechainInstance.isPositionAt.call(expectedElectionKey, expectedPositionKey);
    expect(isPositionInElection, "The added position should exist as a position in the election where it belongs to.").to.be.true;
  });

  it("should add a new candidate", async () => {
    // add first an election then position before adding a candidate
    await votechainInstance.addElection.sendTransaction("CAS");

    let expectedElectionKey = new BigNumber(1);
    let positionTitle = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);

    // add a position
    await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionTitle, maxNoOfCandidatesThatCanBeSelected);

    // add a candidate
    let expectedPositionKey = new BigNumber(1);
    await votechainInstance.addCandidate.sendTransaction(expectedPositionKey, "JM");

    // it should be added in the candidateList with key 1 as it is the first Candidate instance
    let expectedCandidateKey = new BigNumber(1);
    let expectedCandidateKeyIndex = new BigNumber(0);
    let candidate = await votechainInstance.candidateList.call(expectedCandidateKey);

    // it should have correct fields - keyIndex, name, positionKey
    expect(candidate["name"], "JM should be the name of the added candidate").to.be.deep.equal("JM");
    expect(candidate["positionKey"].toString(), "1 should be the position key of the added candidate").to.be.deep.equal(expectedPositionKey.toString());
    expect(candidate["keyIndex"].toString(), "0 should be the key index of the added candidate").to.be.deep.equal(expectedCandidateKeyIndex.toString());

    // the added candidate should also exist as a candidate in the position where it belongs to
    let isCandidateInPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateInPosition, "The added candidate should also exist as a candidate in the position where it belongs to").to.be.true;
  });

  it("should add a new voter", async() => {
    // add first an election 
    await votechainInstance.addElection.sendTransaction("CAS");
    
    // add a new voter for the added election
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedStudentNo = "2015-08795";
    let expectedName = "JM";
    await votechainInstance.addVoter.sendTransaction(expectedVoterKey, expectedElectionKey, expectedStudentNo, expectedName);

    // verify if the voter has been successfully added to the voter's list
    let voter = await votechainInstance.voterList.call(expectedVoterKey);
    
    let actualElectionKey = voter["electionKey"];
    let actualStudentNo = voter["studentNo"];
    let actualName = voter["name"];
    let actualKeyIndex = voter["keyIndex"];

    let expectedKeyIndex = new BigNumber(0);

    expect(actualElectionKey.toString(), expectedElectionKey + " should be the election key of the added voter").to.be.deep.equal(expectedElectionKey.toString());
    expect(actualStudentNo.toString(), expectedStudentNo + "should be the studentNo of the added voter").to.be.deep.equal(expectedStudentNo.toString());
    expect(actualName.toString(), expectedName + " should be the name of the added voter").to.be.deep.equal(expectedName.toString());
    expect(actualKeyIndex.toString(), expectedKeyIndex + " should be the key index of the added voter").to.be.deep.equal(expectedKeyIndex.toString());

    // verify if the voter has been successfully added to the voter's list of the election where it belongs to
    let isVoterInElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoterInElection, "The added voter should exist as a voter in the election where it belongs to").to.be.true;
  }); 

  it("should add an abstain option in an election position", async() => {
    // add first an election
    await votechainInstance.addElection.sendTransaction("CAS");
  
    // then add position
    let expectedElectionKey = new BigNumber(1);
    let positionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionName, maxNoOfCandidatesThatCanBeSelected);

    // add an abstain option in the added election position
    let expectedPositionKey = new BigNumber(1);
    await votechainInstance.addAbstain.sendTransaction(expectedPositionKey);

    // verify if the abstain option was added in the list of all abstain
    // and the fields are correct
    let expectedAbstainKey = new BigNumber(1);
    let abstain = await votechainInstance.abstainList.call(expectedAbstainKey);
    
    let actualAbstainPositionKey = abstain["positionKey"];
    let actualAbstainKeyIndex = abstain["keyIndex"];

    let expectedAbstainPositionKey = expectedPositionKey;
    let expectedAbstainKeyIndex = new BigNumber(0);

    expect(actualAbstainPositionKey.toString(), expectedAbstainPositionKey + " should be the position key of the added abstain.").to.be.deep.equal(expectedAbstainPositionKey.toString());
    expect(actualAbstainKeyIndex.toString(), expectedAbstainKeyIndex + " should be the key index of the added abstain.").to.be.deep.equal(expectedAbstainKeyIndex.toString());

    // verify if the abstain option was also added in the position where it belongs to
    let isAbstainInPosition = await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey);
    expect(isAbstainInPosition, "The added abstain should also exist as an abstain in the position where it belongs to.").to.be.true;
  });
})