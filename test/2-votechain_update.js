// // TO DO: Update functionality unit test
// const Votechain = artifacts.require("../contracts/Votechain.sol");

// const BigNumber = web3.utils.BN;

// const chai = require("chai")
//   .use(require("chai-as-promised"))
//   .use(require("chai-bignumber")(BigNumber));
  
// const expect = chai.expect;

// let votechainInstance;

// contract("Votechain - data update", async(accounts) => {
//   before(async () => {
//     votechainInstance = await Votechian.new();
    
//     // add first an election 
//     let electionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(electionName);

//     // add a position
//     let electionKey = new BigNumber(1);
//     let positionName = "President";
//     let maxNoOfCandidatesThatCanBeSelected = 2;
//     await votechainInstance.addPositionAt.sendTransaction(electionKey, positionName, maxNoOfCandidatesThatCanBeSelected);

//     // add a candidate
//     let candidateName = ""

//   });


//   it("should update an election.", async () => {
    
//     // update the election 
//     let expectedElectionKey = new BigNumber(1);
//     let expectedNewElectionName = "USC";
//     await votechainInstance.updateElection.sendTransaction(expectedElectionKey, expectedNewElectionName);
    
//     // verify if the election was updated successfully
//     let election = votechainInstance.electionList.call(expectedElectionKey);
//     let actualNewElectionName = election["name"];
//     expect(actualNewElectionName, "The election should be updated.").to.be.deep.equal(expectedNewElectionName);
//   });
// });