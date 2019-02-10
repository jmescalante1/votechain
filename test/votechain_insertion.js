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
    
    // the added candidate should have a correct candidateKeyIndex inside the position (positionKey = 1) where it belongs to
    let expectedCandidateKeyIndexInsidePosition = new BigNumber(0);
    let actualCandidateKeyIndexInsidePosition = await votechainInstance.getCandidateKeyIndexAt(expectedPositionKey, expectedCandidateKey);
    expect(actualCandidateKeyIndexInsidePosition.toString(), "0 should be the candidate key index of the added candidate inside the position where it belongs to.").to.be.deep.equal(expectedCandidateKeyIndexInsidePosition.toString());

    // the length of the candidateKeyList of the position where the added candidate belongs to should be 1
    let expectedCandidateKeyListLength = new BigNumber(1);
    let actualCandidateKeyListLength = await votechainInstance.getCandidateKeyListLengthOf(expectedPositionKey);
    expect(actualCandidateKeyListLength.toString(), "1 should be the length of the candidate key list of position where the added candidate belongs to.").to.be.deep.equal(expectedCandidateKeyListLength.toString());
    
    // the candidate key of the added candidate should also be added in the candidate key list of the position where the added candidate belongs to
    let actualCandidateKeyInsidePosition = await votechainInstance.getCandidateKeyAt(expectedPositionKey, expectedCandidateKeyIndexInsidePosition);
    let expectedCandidateKeyInsidePosition = new BigNumber(1);
    expect(actualCandidateKeyInsidePosition.toString(), "1 should be the candidate key of the added candidate inside the position where it belongs to.").to.be.deep.equal(expectedCandidateKeyInsidePosition.toString());

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



})