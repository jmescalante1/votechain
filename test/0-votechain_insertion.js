// const Votechain = artifacts.require("../contracts/Votechain.sol");

// const BigNumber = web3.utils.BN;

// const chai = require("chai")
//   .use(require("chai-as-promised"))
//   .use(require("chai-bignumber")(BigNumber));
  
// const expect = chai.expect;

// let votechainInstance;

// contract("Votechain - data insertion", async(accounts) => {
//   beforeEach(async () => {
//     // let adminKey = "0x2504A6681F1EB33E96c643c6B66c4dDD3399Ce45"
//     votechainInstance = await Votechain.new();
//   });

//   it("should add a new admin.", async () => {
//     // add an admin
//     let expectedAdminKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
//     let expectedAdminName = "Eric";
//     await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName);

//     // verify if the new admin was successfully recorded
//     let isAdmin = await votechainInstance.isAdmin.call(expectedAdminKey);
//     expect(isAdmin, "The new admin should be added").to.be.true;

//     // verify if the fields are correct
//     let admin = await votechainInstance.adminList.call(expectedAdminKey);
//     let actualAdminName = admin["name"];
//     let actualAdminKeyIndex = admin["keyIndex"];
//     let expectedAdminKeyIndex = new BigNumber(0);

//     expect(actualAdminKeyIndex.toString(), expectedAdminKeyIndex.toString() + " should be the key index of the added admin.").to.be.deep.equal(expectedAdminKeyIndex.toString());
//     expect(actualAdminName, expectedAdminName + " should be the name of the added admin.").to.be.deep.equal(expectedAdminName);
//   });

//   it("should add a new official.", async () => {
//     // add an admin
//     let expectedOfficialKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
//     let expectedOfficialName = "Eric";
//     await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName);

//     // verify if the new admin was successfully recorded
//     let isOfficial = await votechainInstance.isOfficial.call(expectedOfficialKey);
//     expect(isOfficial, "The new official should be added").to.be.true;

//     // verify if the fields are correct
//     let official = await votechainInstance.officialList.call(expectedOfficialKey);
//     let actualOfficialName = official["name"];
//     let actualOfficialKeyIndex = official["keyIndex"];
//     let expectedOfficialKeyIndex = new BigNumber(0);

//     expect(actualOfficialKeyIndex.toString(), expectedOfficialKeyIndex.toString() + " should be the key index of the added admin.").to.be.deep.equal(expectedOfficialKeyIndex.toString());
//     expect(actualOfficialName, expectedOfficialName + " should be the name of the added admin.").to.be.deep.equal("Eric");

//   });

//   it("should add a new election.", async () => {
//     let expectedElectionName = "CAS";
//     await votechainInstance.addElection.sendTransaction(expectedElectionName);
    
//     // verify if the new election was successfully recorded
//     let expectedElectionKey = new BigNumber(1);
//     let isElection = await votechainInstance.isElection.call(expectedElectionKey);
//     expect(isElection, "The new election should be added.").to.be.true;

//     // verify if it has correct fields
//     let election = await votechainInstance.electionList.call(expectedElectionKey);
//     let actualElectionName = election["name"];
//     let actualElectionKeyIndex = election["keyIndex"];
//     let expectedElectionKeyIndex = new BigNumber(0);

//     expect(actualElectionName, expectedElectionName + " should be the name of the added election.").to.be.deep.equal(expectedElectionName);
//     expect(actualElectionKeyIndex.toString(), expectedElectionKeyIndex + " should be the key index of the added election.").to.be.deep.equal(expectedElectionKeyIndex.toString());
//   });

//   it("should add a new position.", async() => {
//     // add an election
//     await votechainInstance.addElection.sendTransaction("CASSC");
    
//     // add a position 
//     let expectedElectionKey = new BigNumber(1); 
//     let positionName = "President";
//     let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);

//     await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionName, maxNoOfCandidatesThatCanBeSelected);

//     // verify if the position was successfully recorded
//     let expectedPositionKey = new BigNumber(1);
//     let isPosition = await votechainInstance.isPosition.call(expectedPositionKey);
//     expect(isPosition, "The new position should be added").to.be.true;

//     // verify if it has correct fields
//     let position = await votechainInstance.positionList.call(expectedPositionKey);

//     expect(position["name"], "President should be the name of the added position").to.be.deep.equal("President");
//     expect(position["electionKey"].toString(), "1 should be the election key of the added position").to.be.deep.equal(new BigNumber(1).toString());
//     expect(position["keyIndex"].toString(), "0 should be the key index of the added position").to.be.deep.equal(new BigNumber(0).toString());
//     expect(position["maxNoOfCandidatesThatCanBeSelected"].toString(), "2 should be the max no of candidates that can be selected").to.be.deep.equal(new BigNumber(2).toString());
    
//     // it should exist as a position in the election it belongs to
//     let isPositionInElection = await votechainInstance.isPositionAt.call(expectedElectionKey, expectedPositionKey);
//     expect(isPositionInElection, "The added position should exist as a position in the election where it belongs to.").to.be.true;
//   });

//   it("should add a new candidate.", async () => {
//     // add an election
//     await votechainInstance.addElection.sendTransaction("CAS");

//     let expectedElectionKey = new BigNumber(1);
//     let positionTitle = "President";
//     let maxNoOfCandidatesThatCanBeSelected = new BigNumber(1);

//     // add a position
//     await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionTitle, maxNoOfCandidatesThatCanBeSelected);

//     // add a candidate
//     let expectedPositionKey = new BigNumber(1);
//     await votechainInstance.addCandidate.sendTransaction(expectedPositionKey, "JM");

//     // verify if the new candidate was successfully recorded     
//     let expectedCandidateKey = new BigNumber(1);
//     let isCandidate = await votechainInstance.isCandidate.call(expectedCandidateKey);
//     expect(isCandidate, "The new candidate should be added.").to.be.true;

//     // verify if it has correct fields
//     let candidate = await votechainInstance.candidateList.call(expectedCandidateKey);
//     let expectedCandidateKeyIndex = new BigNumber(0);

//     expect(candidate["name"], "JM should be the name of the added candidate").to.be.deep.equal("JM");
//     expect(candidate["positionKey"].toString(), "1 should be the position key of the added candidate").to.be.deep.equal(expectedPositionKey.toString());
//     expect(candidate["keyIndex"].toString(), "0 should be the key index of the added candidate").to.be.deep.equal(expectedCandidateKeyIndex.toString());

//     // the added candidate should also exist as a candidate in the position where it belongs to
//     let isCandidateInPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
//     expect(isCandidateInPosition, "The added candidate should also exist as a candidate in the position where it belongs to").to.be.true;
//   });

//   it("should add a new voter.", async() => {
//     // add first an election 
//     await votechainInstance.addElection.sendTransaction("CAS");
    
//     // add a new voter for the added election
//     let expectedElectionKey = new BigNumber(1);
//     let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
//     let expectedStudentNo = "2015-08795";
//     let expectedName = "JM";
//     await votechainInstance.addVoter.sendTransaction(expectedVoterKey, expectedElectionKey, expectedStudentNo, expectedName);

//     // verify if the new voter was successfully recorded
//     let isVoter = await votechainInstance.isVoter.call(expectedVoterKey);
//     expect(isVoter, "The new voter should be added.").to.be.true;

//     // verify if it has correct fields
//     let voter = await votechainInstance.voterList.call(expectedVoterKey);
//     let expectedElectionKeyIndexInVoter = new BigNumber(0);

//     let actualElectionKey = await votechainInstance.getVoterElectionKeyAt(expectedVoterKey, expectedElectionKeyIndexInVoter);
//     let actualStudentNo = voter["studentNo"];
//     let actualName = voter["name"];
//     let actualKeyIndex = voter["keyIndex"];

//     let expectedKeyIndex = new BigNumber(0);

//     expect(actualElectionKey.toString(), expectedElectionKey + " should be the election key of the added voter").to.be.deep.equal(expectedElectionKey.toString());
//     expect(actualStudentNo.toString(), expectedStudentNo + "should be the studentNo of the added voter").to.be.deep.equal(expectedStudentNo.toString());
//     expect(actualName.toString(), expectedName + " should be the name of the added voter").to.be.deep.equal(expectedName.toString());
//     expect(actualKeyIndex.toString(), expectedKeyIndex + " should be the key index of the added voter").to.be.deep.equal(expectedKeyIndex.toString());

//     // verify if the voter has been successfully added to the voter's list of the election where it belongs to
//     let isVoterInElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
//     expect(isVoterInElection, "The added voter should exist as a voter in the election where it belongs to").to.be.true;
//   }); 

//   it("should add an abstain option in an election position.", async() => {
//     // add first an election
//     await votechainInstance.addElection.sendTransaction("CAS");
  
//     // then add a position
//     let expectedElectionKey = new BigNumber(1);
//     let positionName = "President";
//     let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
//     await votechainInstance.addPosition.sendTransaction(expectedElectionKey, positionName, maxNoOfCandidatesThatCanBeSelected);

//     // then add an abstain option in the added election position
//     let expectedPositionKey = new BigNumber(1);
//     await votechainInstance.addAbstain.sendTransaction(expectedPositionKey);

//     // verify if the new abstain was successfully recorded
//     let expectedAbstainKey = new BigNumber(1);
//     let isAbstain = await votechainInstance.isAbstain.call(expectedAbstainKey);
//     expect(isAbstain, "The new abstain should be added.").to.be.true;

//     // verify if it has correct fields
//     let abstain = await votechainInstance.abstainList.call(expectedAbstainKey);
    
//     let actualAbstainPositionKey = abstain["positionKey"];
//     let actualAbstainKeyIndex = abstain["keyIndex"];

//     let expectedAbstainPositionKey = expectedPositionKey;
//     let expectedAbstainKeyIndex = new BigNumber(0);

//     expect(actualAbstainPositionKey.toString(), expectedAbstainPositionKey + " should be the position key of the added abstain.").to.be.deep.equal(expectedAbstainPositionKey.toString());
//     expect(actualAbstainKeyIndex.toString(), expectedAbstainKeyIndex + " should be the key index of the added abstain.").to.be.deep.equal(expectedAbstainKeyIndex.toString());

//     // verify if the abstain option was also added in the position where it belongs to
//     let isAbstainInPosition = await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey);
//     expect(isAbstainInPosition, "The added abstain should also exist as an abstain in the position where it belongs to.").to.be.true;
//   });
// });