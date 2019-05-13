const Votechain = artifacts.require("../contracts/Votechain.sol");

const BigNumber = web3.utils.BN;

const chai = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber));
  
const expect = chai.expect;

contract("Votechain - data insertion", async(accounts) => {
  let votechainInstance;
  const adminAccount = accounts[0];
  const adminName = "JM";

  beforeEach(async () => {
    votechainInstance = await Votechain.new(adminAccount, adminName);
  });

  it("should add a new admin.", async () => {
    // add an admin
    let expectedAdminKey = "0x26E54a83d8DC1B1E00cb9fFEA7834Bb3294eECDC";
    let expectedAdminName = "JM";
    await votechainInstance.addAdmin.sendTransaction(expectedAdminKey, expectedAdminName, {from: adminAccount});

    // verify if the new admin was successfully recorded
    let isAdmin = await votechainInstance.isAdmin.call(expectedAdminKey);
    expect(isAdmin, "The new admin should be added").to.be.true;

    // verify if the fields are correct
    let admin = await votechainInstance.adminList.call(expectedAdminKey);
    let actualAdminName = admin["name"];
    let actualAdminKeyIndex = admin["keyIndex"];
    let expectedAdminKeyIndex = new BigNumber(1);

    expect(actualAdminKeyIndex.toString(), expectedAdminKeyIndex.toString() + " should be the key index of the added admin.").to.be.deep.equal(expectedAdminKeyIndex.toString());
    expect(actualAdminName, expectedAdminName + " should be the name of the added admin.").to.be.deep.equal(expectedAdminName);
  });

  it("should add a new official.", async () => {
    // add an official
    let expectedOfficialKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedOfficialName = "Eric";
    await votechainInstance.addOfficial.sendTransaction(expectedOfficialKey, expectedOfficialName, {from: adminAccount});

    // verify if the new official was successfully recorded
    let isOfficial = await votechainInstance.isOfficial.call(expectedOfficialKey);
    expect(isOfficial, "The new official should be added").to.be.true;

    // verify if the fields are correct
    let official = await votechainInstance.officialList.call(expectedOfficialKey);
    let actualOfficialName = official["name"];
    let actualOfficialKeyIndex = official["keyIndex"];
    let expectedOfficialKeyIndex = new BigNumber(0);

    expect(actualOfficialKeyIndex.toString(), expectedOfficialKeyIndex.toString() + " should be the key index of the added admin.").to.be.deep.equal(expectedOfficialKeyIndex.toString());
    expect(actualOfficialName, expectedOfficialName + " should be the name of the added admin.").to.be.deep.equal("Eric");
  });

  it("should add a new election.", async () => {
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
    
    // verify if the new election was successfully recorded
    let expectedElectionKey = new BigNumber(1);
    let isElection = await votechainInstance.isElection.call(expectedElectionKey);
    expect(isElection, "The new election should be added.").to.be.true;

    // verify if it has correct fields
    let election = await votechainInstance.electionList.call(expectedElectionKey);
    let actualElectionName = election["name"];
    let actualElectionKeyIndex = election["keyIndex"];
    let expectedElectionKeyIndex = new BigNumber(0);

    expect(actualElectionName, expectedElectionName + " should be the name of the added election.").to.be.deep.equal(expectedElectionName);
    expect(actualElectionKeyIndex.toString(), expectedElectionKeyIndex + " should be the key index of the added election.").to.be.deep.equal(expectedElectionKeyIndex.toString());
  });

  it("should add a new position.", async() => {
    // add an election
    let expectedElectionName = "CASSC";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
    
    // add a position 
    let expectedElectionKey = new BigNumber(1); 
    let expectedPositionName = "President";
    let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(2);

    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // verify if the position was successfully recorded
    let expectedPositionKey = new BigNumber(1);
    let isPosition = await votechainInstance.isPosition.call(expectedPositionKey);
    expect(isPosition, "The new position should be added").to.be.true;

    // verify if it has correct fields
    let position = await votechainInstance.positionList.call(expectedPositionKey);

    let actualPositionName = position["name"];
    let actualPositionElectionKey = position["electionKey"];
    let actualPositionKeyIndex = position["keyIndex"];
    let actualMaxNoOfCandidatesThatCanBeSelected = position["maxNoOfCandidatesThatCanBeSelected"];

    let expectedPositionElectionKey = new BigNumber(1);
    let expectedPositionKeyIndex = new BigNumber(0);

    expect(actualPositionName, expectedPositionName + " should be the name of the added position").to.be.deep.equal("President");
    expect(actualPositionElectionKey.toString(), expectedPositionElectionKey.toString() + " should be the election key of the added position").to.be.deep.equal(expectedPositionElectionKey.toString());
    expect(actualPositionKeyIndex.toString(), expectedPositionKeyIndex.toString() + " should be the key index of the added position").to.be.deep.equal(expectedPositionKeyIndex.toString());
    expect(actualMaxNoOfCandidatesThatCanBeSelected.toString(), expectedMaxNoOfCandidatesThatCanBeSelected.toString() + " should be the max no of candidates that can be selected").to.be.deep.equal(expectedMaxNoOfCandidatesThatCanBeSelected.toString());
    
    // the added position should be added in the election it is referred to
    let isPositionAtElection = await votechainInstance.isPositionAt.call(expectedElectionKey, expectedPositionKey);
    expect(isPositionAtElection, "The added position should be in the election with key " + expectedElectionKey + ".").to.be.true;
  });

  it("should add a party.", async () => {
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

    // verify if it has correct fields
    let expectedPartyKeyIndex = 0;
    let party = await votechainInstance.partyList.call(expectedPartyKey);

    let actualPartyName = party['name']
    let actualPartyElectionKey = party['electionKey']
    let actualPartyKeyIndex = party['keyIndex']

    expect(actualPartyName, expectedPartyName + ' should be the name of the party.').to.be.deep.equal(expectedPartyName);
    expect(actualPartyElectionKey.toString(), expectedElectionKey + ' should be the electionKey of the party.').to.be.deep.equal(expectedElectionKey.toString());
    expect(actualPartyKeyIndex.toString(), expectedPartyKeyIndex + ' should be the keyIndex of the party.').to.be.deep.equal(expectedPartyKeyIndex.toString());

  })

  it("should add a new candidate.", async () => {
    // add an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});

    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let expectedMaxNoOfCandidatesThatCanBeSelected = new BigNumber(1);

    // add a position
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, expectedMaxNoOfCandidatesThatCanBeSelected, {from: adminAccount});

    // add a party
    let expectedPartyName = 'Party'
    await votechainInstance.addPartyAt.sendTransaction(expectedElectionKey, expectedPartyName, {from: adminAccount});

    // add a candidate
    let expectedPartyKey = new BigNumber(1)
    let expectedPositionKey = new BigNumber(1);
    let expectedCandidateName = "JM";
    await votechainInstance.addCandidateAt.sendTransaction(expectedPositionKey, expectedCandidateName, expectedPartyKey, {from: adminAccount});

    // verify if the new candidate was successfully recorded     
    let expectedCandidateKey = new BigNumber(1);
    let isCandidate = await votechainInstance.isCandidate.call(expectedCandidateKey);
    expect(isCandidate, "The new candidate should be added.").to.be.true;

    // verify if it has correct fields
    let candidate = await votechainInstance.candidateList.call(expectedCandidateKey);
    let expectedCandidateKeyIndex = new BigNumber(0);

    let actualCandidateName = candidate["name"];
    let actualPositionKey = candidate["positionKey"];
    let actualKeyIndex = candidate["keyIndex"];
    let actualPartyKey = candidate['partyKey'];

    expect(actualCandidateName, expectedCandidateName + " should be the name of the added candidate.").to.be.deep.equal(expectedCandidateName);
    expect(actualPositionKey.toString(), expectedPositionKey.toString() + " should be the position key of the added candidate.").to.be.deep.equal(expectedPositionKey.toString());
    expect(actualKeyIndex.toString(), expectedCandidateKeyIndex.toString() + " should be the key index of the added candidate.").to.be.deep.equal(expectedCandidateKeyIndex.toString());
    expect(actualPartyKey.toString(), expectedPartyKey.toString() + " should be the party key of the added candidate.").to.be.deep.equal(expectedPartyKey.toString());

    // the added candidate should be added in the position it is referred to
    let isCandidateAtPosition = await votechainInstance.isCandidateAt.call(expectedPositionKey, expectedCandidateKey);
    expect(isCandidateAtPosition, "The added candidate should be added in the position with key " + expectedPositionKey.toString() + ".").to.be.true;
  });

  it("should add a new voter.", async() => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
    
    // add a new voter for the added election
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";
    let expectedStudentNo = "2015-08795";
    let expectedName = "JM";
    await votechainInstance.addVoterAt.sendTransaction(expectedElectionKey, expectedVoterKey, expectedStudentNo, expectedName, {from: adminAccount});

    // verify if the new voter was successfully recorded
    let isVoter = await votechainInstance.isVoter.call(expectedVoterKey);
    expect(isVoter, "The new voter should be added.").to.be.true;

    // verify if it has correct fields
    let voter = await votechainInstance.voterList.call(expectedVoterKey);
    let expectedElectionKeyIndexAtVoter = new BigNumber(0);

    let actualElectionKey = await votechainInstance.getElectionKeyAt(expectedVoterKey, expectedElectionKeyIndexAtVoter);
    let actualStudentNo = voter["studentNo"];
    let actualName = voter["name"];
    let actualKeyIndex = voter["keyIndex"];

    let expectedKeyIndex = new BigNumber(0);

    expect(actualElectionKey.toString(), expectedElectionKey.toString() + " should be the election key of the added voter.").to.be.deep.equal(expectedElectionKey.toString());
    expect(actualStudentNo, expectedStudentNo + "should be the studentNo of the added voter.").to.be.deep.equal(expectedStudentNo);
    expect(actualName, expectedName + " should be the name of the added voter.").to.be.deep.equal(expectedName);
    expect(actualKeyIndex.toString(), expectedKeyIndex.toString() + " should be the key index of the added voter.").to.be.deep.equal(expectedKeyIndex.toString());

    // verify if the voter has been successfully added to the voter's list of the election it belongs to
    let isVoterAtElection = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoterAtElection, "The added voter should be added in the election with key " + expectedElectionKey.toString()).to.be.true;
  }); 

  it("should add bulk of voters.", async () => {
    // add first an election 
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
    
    // add a bulk of voters for the added election
    let expectedElectionKey = new BigNumber(1);
    let expectedVoterKey = "0x281a1316FC1e113C8Dc8542D4E281412a28490be";

    let expectedVoterKey2 = '0xab9DF96ff80431C473D318579a686Df8196Ad7f9';

    let expectedVoterKeyList = [expectedVoterKey, expectedVoterKey2];

    await votechainInstance.bulkAddVoterAt(expectedElectionKey, expectedVoterKeyList);

    // verify if the first voter was successfully recorded
    let isVoter = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey);
    expect(isVoter, 'The first voter should be added.').to.be.true;

    // verify if the second voter was successfully recorded
    let isVoter2 = await votechainInstance.isVoterAt.call(expectedElectionKey, expectedVoterKey2);
    expect(isVoter2, 'The second voter should be added.').to.be.true;
  })

  it("should add an abstain option in a position.", async() => {
    // add first an election
    let expectedElectionName = "CAS";
    await votechainInstance.addElection.sendTransaction(expectedElectionName, {from: adminAccount});
  
    // then add a position
    let expectedElectionKey = new BigNumber(1);
    let expectedPositionName = "President";
    let maxNoOfCandidatesThatCanBeSelected = new BigNumber(2);
    let hasAbstain = false;
    await votechainInstance.addPositionAt.sendTransaction(expectedElectionKey, expectedPositionName, maxNoOfCandidatesThatCanBeSelected, hasAbstain, {from: adminAccount});

    // then add an abstain option in the added election position
    let expectedPositionKey = new BigNumber(1);
    await votechainInstance.addAbstainAt.sendTransaction(expectedPositionKey, {from: adminAccount});

    // verify if the new abstain was successfully recorded
    let expectedAbstainKey = new BigNumber(1);
    let isAbstain = await votechainInstance.isAbstain.call(expectedAbstainKey);
    expect(isAbstain, "The new abstain should be added.").to.be.true;

    // verify if it has correct fields
    let abstain = await votechainInstance.abstainList.call(expectedAbstainKey);
    
    let actualAbstainPositionKey = abstain["positionKey"];
    let actualAbstainKeyIndex = abstain["keyIndex"];

    let expectedAbstainPositionKey = expectedPositionKey;
    let expectedAbstainKeyIndex = new BigNumber(0);

    expect(actualAbstainPositionKey.toString(), expectedAbstainPositionKey + " should be the position key of the added abstain.").to.be.deep.equal(expectedAbstainPositionKey.toString());
    expect(actualAbstainKeyIndex.toString(), expectedAbstainKeyIndex + " should be the key index of the added abstain.").to.be.deep.equal(expectedAbstainKeyIndex.toString());

    // verify if the abstain option was added in the position it belongs to
    let isAbstainAtPosition = await votechainInstance.isAbstainAt.call(expectedPositionKey, expectedAbstainKey);
    expect(isAbstainAtPosition, "The added abstain should be added at the position with key " + expectedPositionKey.toString() + ".").to.be.true;
  });
});