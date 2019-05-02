// const Votechain = artifacts.require("../contracts/Votechain.sol");

// const BigNumber = web3.utils.BN;

// const chai = require("chai")
//   .use(require("chai-as-promised"))
//   .use(require("chai-bignumber")(BigNumber));
  
// const expect = chai.expect;

// contract("Votechain - data update", async(accounts) => { 
//   let votechainInstance;
//   const adminAccount = accounts[0];
//   const adminName = "JM";

//   beforeEach(async () => {
//     votechainInstance = await Votechain.new(adminAccount, adminName);
//   });

//   it("should update an election.", async () => {
//     // add first an election 
//     let expectedElectionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

//     // update the election 
//     let expectedElectionKey = new BigNumber(1);
//     let expectedNewElectionName = "USC";
//     await votechainInstance.updateElection.sendTransaction(expectedElectionKey, expectedNewElectionName, {from: adminAccount});
    
//     // verify if the election was updated successfully
//     let election = await votechainInstance.electionList.call(expectedElectionKey);
//     let actualNewElectionName = election["name"];
//     expect(actualNewElectionName, "The election should be updated.").to.be.deep.equal(expectedNewElectionName);
//   });

//   it("should update a position.", async () => {
//     // add first an election 
//     let expectedElectionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

//     // then add a position
//     let expectedElectionKey = new BigNumber(1);
//     let expectedPositionName = "President";
//     let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
//     await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

//     // update the position
//     let expectedPositionKey = new BigNumber(1);
//     let expectedNewPositionName = "CEO";
//     let expectedNewMaxNoOfCandidatesThatCanBeSelected = new BigNumber(1);
//     await votechainInstance.updatePosition.sendTransaction(expectedPositionKey, expectedNewPositionName, expectedNewMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

//     // verify if the position was successfully updated
//     let position = await votechainInstance.positionList.call(expectedPositionKey);
//     let actualNewPositionName = position["name"];
//     let actualNewMaxNoOfCandidatesThatCanBeSelected = position["maxNoOfCandidatesThatCanBeSelected"];
    
//     expect(actualNewPositionName, "The position name should be updated.").to.be.deep.equal(expectedNewPositionName);
//     expect(actualNewMaxNoOfCandidatesThatCanBeSelected.toString(), "The max no of candidates that can be selected should be updated.").to.be.deep.equal(expectedNewMaxNoOfCandidatesThatCanBeSelected.toString());
//   });

//   it("should update a party.", async () => {
//      // add an election
//      let expectedElectionName = "CAS";
//      await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
 
//      // add a party
//      let expectedElectionKey = new BigNumber(1);
//      let expectedPartyName = 'Party';
//      await votechainInstance.addPartyAt.sendTransaction(expectedElectionKey, expectedPartyName, {from: adminAccount});
 
//      // verify if the party is successfully added 
//      let expectedPartyKey = new BigNumber(1);
//      let isParty = await votechainInstance.isParty.call(expectedPartyKey);
//      expect(isParty, 'The new party should be added.').to.be.true;

//      // update the party
//      let expectedUpdatedPartyName = 'Edited Party';
//      await votechainInstance.updateParty.sendTransaction(expectedPartyKey, expectedUpdatedPartyName, {from: adminAccount});

//      // verify if the party was successfully updated
//      let party = await votechainInstance.partyList.call(expectedPartyKey);
     
//      let actualPartyName = party['name'];
    
//      expect(actualPartyName, expectedUpdatedPartyName + ' should be the updated party name').to.be.deep.equal(expectedUpdatedPartyName);
//   })

//   it("should update a candidate.", async () => {
//     // add first an election
//     let expectedElectionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

//     // add a position 
//     let expectedElectionKey = new BigNumber(1);
//     let expectedPositionName = "President";
//     let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(1);

//     await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

//     // add a candidate
//     let noPartyKey = new BigNumber(0);
//     let expectedPositionKey = new BigNumber(1);
//     let expectedCandidateName = "MJ";
    
//     await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, noPartyKey, {from: adminAccount});

//     // update the candidate
//     let expectedCandidateKey = new BigNumber(1);
//     let expectedNewCandidateName = "JM";

//     await votechainInstance.updateCandidate.sendTransaction(expectedCandidateKey, expectedNewCandidateName, noPartyKey, {from: adminAccount});

//     // verify if the candidate was successfully updated
//     let candidate = await votechainInstance.candidateList.call(expectedCandidateKey);
//     let actualNewCandidateName = candidate["name"];

//     expect(actualNewCandidateName, "The candidate name should be updated.").to.be.deep.equal(expectedNewCandidateName);
//   });

//   it("should update an admin.", async () => {
//     // add first an admin
//     let expectedAdminKey = "0xF2311fDf9494A76399A68Bf172cF0E9a95a7CC62";
//     let expectedAdminName = "MJ";
//     await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName, {from: adminAccount});

//     // update the added admin
//     let expectedNewAdminName = "JM";
//     await votechainInstance.updateAdmin.sendTransaction(expectedAdminKey, expectedNewAdminName, {from: expectedAdminKey});
  
//     // verify if the admin was successfully updated
//     let admin = await votechainInstance.adminList.call(expectedAdminKey);
//     let actualNewAdminName = admin["name"];

//     expect(actualNewAdminName, "The admin name should be updated.").to.be.deep.equal(expectedNewAdminName);
//   });

//   it("should update an official.", async () => {
//     // add first an official
//     let expectedOfficialKey = "0xF2311fDf9494A76399A68Bf172cF0E9a95a7CC62";
//     let expectedOfficialName = "MJ";

//     await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName, {from: adminAccount});

//     // update the added official
//     let expectedNewOfficialName = "JM";
//     await votechainInstance.updateOfficial.sendTransaction(expectedOfficialKey, expectedNewOfficialName, {from: expectedOfficialKey});

//     // verify if the official was successfully updated
//     let official = await votechainInstance.officialList.call(expectedOfficialKey);
//     let actualNewOfficialName = official["name"];
    
//     expect(actualNewOfficialName, "The official name should be updated.").to.be.deep.equal(expectedNewOfficialName);

//   });

//   it("should update a voter.", async () => {
//     // add first an election 
//     let expectedElectionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

//     // add a voter
//     let expectedVoterKey = "0xF2311fDf9494A76399A68Bf172cF0E9a95a7CC62";
//     let expectedElectionKey = new BigNumber(1);
//     let expectedVoterName = "Yella";
//     let expectedVoterStudentNo = "2014-09899";

//     await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedVoterStudentNo, expectedVoterName, {from: adminAccount});

//     // update the voter
//     let expectedNewVoterName = "Alley";
//     let expectedNewVoterStudentNo = "2015-09899";

//     await votechainInstance.updateVoter.sendTransaction(expectedVoterKey, expectedNewVoterStudentNo, expectedNewVoterName, {from: expectedVoterKey});

//     // verify if the voter was successfully updated
//     let voter = await votechainInstance.voterList.call(expectedVoterKey);
//     let actualNewVoterName = voter["name"];
//     let actualNewVoterStudentNo = voter["studentNo"];

//     expect(actualNewVoterStudentNo, "The voter's student number should be updated.").to.be.deep.equal(expectedNewVoterStudentNo);
//     expect(actualNewVoterName, "The voter name should be updated.").to.be.deep.equal(expectedNewVoterName);
    
//   });
// });