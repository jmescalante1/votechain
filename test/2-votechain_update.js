const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain - data update", async(accounts) => { 
  let votechainInstance;
  const adminAccount = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
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
});