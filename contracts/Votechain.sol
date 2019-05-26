pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Votechain {
    using SafeMath for uint256;

    enum Stage { Setup, Started, Finished }

    uint256 private electionKeyCounter;
    mapping(uint256 => Election) public electionList;
    uint256[] public electionKeyList;
    
    uint256 private positionKeyCounter;
    mapping(uint256 => Position) public positionList;
    uint256[] public positionKeyList;

    uint256 private partyKeyCounter;
    mapping(uint256 => Party) public partyList;
    uint256[] public partyKeyList;

    uint256 private candidateKeyCounter;
    mapping(uint256 => Candidate) public candidateList;
    uint256[] public candidateKeyList;

    mapping(address => Voter) public voterList;
    address[] public voterKeyList;

    uint256 private voteKeyCounter;
    mapping(uint256 => Vote) public voteList;
    uint256[] public voteKeyList;

    uint256 private abstainKeyCounter;
    mapping(uint256 => Abstain) public abstainList;
    uint256[] public abstainKeyList;

    mapping(address => Admin) public adminList;
    address[] public adminKeyList;
    
    mapping(address => Official) public officialList;
    address[] public officialKeyList;

    struct Admin {
        uint256 keyIndex;
        string name;
    }

    struct Official {
        uint256 keyIndex;
        string name;
    }

    struct Election {
        uint256 keyIndex;
        string name;

        Stage stage;

        uint256[] positionKeyList;
        mapping(uint256 => uint256) positionKeyIndexList; 

        address[] voterKeyList;
        mapping(address => uint256) voterKeyIndexList; 

        uint256[] voteKeyList;

        mapping(address => bool) hasVoted;
    }

    struct Position {
        uint256 keyIndex;
        string name;
        
        uint256 maxNoOfCandidatesThatCanBeSelected; 
        mapping(address => uint256) noOfVotesSubmittedBy;

        uint256 electionKey;

        uint256[] candidateKeyList;
        mapping(uint256 => uint256) candidateKeyIndexList;

        uint256 abstainKey;
        bool isAbstainActive;
    }

    struct Party {
        uint256 electionKey;
        uint256 keyIndex;
        string name;

        uint256[] candidateKeyList;
        mapping(uint256 => uint256) candidateKeyIndexList;
    }

    struct Candidate {
        uint256 keyIndex;
        string name;

        uint256 positionKey;
        uint256 partyKey;

        mapping(address => bool) wasVotedBy;

        uint256[] voteKeyList;
        mapping(uint256 => uint256) voteKeyIndexList;
    }

    struct Voter {
        uint256 keyIndex;
        string name;
        string studentNo;

        uint256[] electionKeyList;
        mapping(uint256 => uint256) electionKeyIndexList; 

        uint256[] voteKeyList;
        mapping(uint256 => uint256) voteKeyIndexList; 
    }

    struct Vote {
        uint256 keyIndex;
        address voterKey;
        uint256 electionKey;
        uint256 positionKey;
        uint256 candidateKey;
        uint256 abstainKey;
    }

    struct Abstain {
        uint256 keyIndex;
        uint256 positionKey;

        uint256[] voteKeyList;
        mapping(uint256 => uint256) voteKeyIndexList;
    }

    event StartElection (uint256 electionKey);
    event StopElection (uint256 electionKey);

    event AddElection (uint256 electionKey);
    event EditElection (uint256 electionKey);
    event DeleteElection (uint256 electionKey);

    event AddPositionAt (uint256 electionKey, uint256 positionKey);
    event EditPosition (uint256 positionKey);
    event DeletePosition (uint256 positionKey);

    event AddCandidateAt (uint256 positionKey, uint256 candidateKey);
    event EditCandidate (uint256 candidateKey);
    event DeleteCandidate (uint256 candidateKey);

    event AddVoterAt (uint256 electionKey, address voterKey);
    event EditVoter (address voterKey);
    event DeleteVoterAt (uint256 electionKey, address voterKey);

    event AddAbstainAt(uint256 positionKey, uint256 abstainKey);
    event DeleteAbstain(uint abstainKey);

    event AddAdmin (address adminKey);
    event EditAdmin (address adminKey);
    event DeleteAdmin (address adminKey);

    event AddOfficial (address officialKey);
    event EditOfficial (address officialKey);
    event DeleteOfficial (address officialKey);

    event AddPartyAt (uint256 electionKey, uint256 partyKey);
    event EditParty (uint256 partyKey);
    event DeleteParty (uint256 partyKey);

    event CastVote (uint256 voteKey);

    constructor(address adminKey, string memory name) public payable {
        adminList[adminKey].name = name;
        adminList[adminKey].keyIndex = adminKeyList.push(adminKey).sub(1);

        // For testing UI
        addElection('UP Manila Student Council Election');
        addElection('UP Diliman Student Council Election');

        // for election1
        addPositionAt(1, 'Chairman', 1, false);
        addPartyAt(1, 'Great Party List'); // id 1
        addPartyAt(1, 'Normal Party List'); // id 2

        // for election2
        addPositionAt(2, 'CEO', 1, false);
        addPositionAt(2, 'CTO', 2, true);
        addPartyAt(2, 'Great Party List'); // id 3
        addPartyAt(2, 'Walastik Party List'); // id 4

        // for election 1 position1
        addCandidateAt(1, 'Neil', 1); // Great party list
        addCandidateAt(1, 'Alee', 2); // Normal party list
        addCandidateAt(1, 'Bea', 0); // Independent

        // for election 2 position2
        addCandidateAt(2, 'Paulo', 3); // Great Party list
        addCandidateAt(2, 'Ben', 4); // Walastik Party list
        addCandidateAt(2, 'Guen', 0); // Independent

        // for election 2 position3
        addCandidateAt(3, 'JM', 3); // Great Party list
        addCandidateAt(3, 'Mike', 4); // Walastik Party list
        addCandidateAt(3, 'Alley', 0); // Independent

        addVoterAt(1, 0x256Fd21e01c3b56a75DecD67EE47E8809f055eA4, '2015-08795', 'JM');
        addVoterAt(1, 0x888783dF0a495Cb7211a194452f25b6971417DEE, '2015-08795', 'Guen');
        addVoterAt(2, 0xEFf4FfF8a03CaFaa90d0b2b08936Cd0521A0eEE7, '2015-09899', 'Alley');
        addVoterAt(2, 0x256Fd21e01c3b56a75DecD67EE47E8809f055eA4, '2015-08795', 'JM');
    }

    function () external payable {}

    function startElection(uint256 electionKey) public onlyAdmin electionKeyExists(electionKey) inSetupStage(electionKey){
        electionList[electionKey].stage = Stage.Started;
        emit StartElection(electionKey);
    }

    function stopElection(uint256 electionKey) public onlyAdmin electionKeyExists(electionKey) hasStarted(electionKey){
        electionList[electionKey].stage = Stage.Finished;
        emit StopElection(electionKey);
    }

    function castVote(uint256 candidateKey) 
        private 
        candidateKeyExists(candidateKey)
        hasStarted(positionList[candidateList[candidateKey].positionKey].electionKey)
        onlyVoterAt(positionList[candidateList[candidateKey].positionKey].electionKey) 
        hasNotVotedFor(candidateKey)
        canStillVoteAt(candidateList[candidateKey].positionKey) 
        returns(bool) 
    {
        uint256 voteKey = genVoteKey();

        Candidate storage candidate = candidateList[candidateKey];
        Position storage position = positionList[candidate.positionKey];
        Voter storage voter = voterList[msg.sender];

        voteList[voteKey].electionKey = position.electionKey;
        voteList[voteKey].positionKey = candidate.positionKey;
        voteList[voteKey].candidateKey = candidateKey;
        voteList[voteKey].voterKey = msg.sender;
        voteList[voteKey].keyIndex = voteKeyList.push(voteKey).sub(1);

        // insert the key of the casted vote to the voteKeyList of the candidate
        candidate.voteKeyIndexList[voteKey] = candidate.voteKeyList.push(voteKey).sub(1);

        // insert the key of the casted vote to the voteKeyList of the voter
        voter.voteKeyIndexList[voteKey] = voter.voteKeyList.push(voteKey).sub(1);

        // insert the key of the casted vote to the voteKeyList of the election
        electionList[position.electionKey].voteKeyList.push(voteKey);

        candidateList[candidateKey].wasVotedBy[msg.sender] = true;
        position.noOfVotesSubmittedBy[msg.sender] = position.noOfVotesSubmittedBy[msg.sender].add(1);

        emit CastVote(voteKey);
    }

    function castAbstain(uint256 abstainKey) 
        private
        abstainKeyExists(abstainKey)
        hasStarted(positionList[abstainList[abstainKey].positionKey].electionKey)
        onlyVoterAt(positionList[abstainList[abstainKey].positionKey].electionKey) 

    {
        Abstain storage abstain = abstainList[abstainKey];
        Position storage position = positionList[abstain.positionKey];
        Voter storage voter = voterList[msg.sender];

        uint256 voteKey = genVoteKey();
        
        voteList[voteKey].voterKey = msg.sender;
        voteList[voteKey].electionKey = position.electionKey;
        voteList[voteKey].positionKey = abstain.positionKey;
        voteList[voteKey].abstainKey = abstainKey;
        voteList[voteKey].keyIndex = voteKeyList.push(voteKey).sub(1);

        // insert the key of the casted vote to the voteKeyList of the voter
        voter.voteKeyList.push(voteKey);

        // insert the key of the casted vote to the voteKeyList of the election
        electionList[position.electionKey].voteKeyList.push(voteKey);

        // insert the key of the casted vote to the voteKeyList of the abstain
        abstainList[abstainKey].voteKeyList.push(voteKey);
    }

    function bulkVote(uint256[] memory candidateKeys, uint256[] memory abstainKeys) public {
        if(candidateKeys.length > 0) { 
            uint256 electionKey = positionList[candidateList[candidateKeys[0]].positionKey].electionKey;
            _hasNotVotedAt(electionKey); // can only vote once

            electionList[electionKey].hasVoted[msg.sender] = true;
        }
        for(uint256 i = 0; i < candidateKeys.length; i++){
            castVote(candidateKeys[i]);
        }

        for(uint256 i = 0; i < abstainKeys.length; i++){
            castAbstain(abstainKeys[i]);
        }        
    }

    function addAdmin(address payable adminKey, string memory name) public payable onlyAdmin notVoter(adminKey) notOfficial(adminKey) notAdmin(adminKey) hasEnoughEther{
        adminList[adminKey].name = name;
        adminList[adminKey].keyIndex = adminKeyList.push(adminKey).sub(1);

        adminKey.transfer(50 * (1 ether));
        
        emit AddAdmin(adminKey);
    }

    function addOfficial(address payable officialKey, string memory name) public onlyAdmin notAdmin(officialKey) notVoter(officialKey) notOfficial(officialKey) hasEnoughEther{
        officialList[officialKey].name = name;
        officialList[officialKey].keyIndex = officialKeyList.push(officialKey).sub(1);

        officialKey.transfer(50 * (1 ether));

        emit AddOfficial(officialKey);
    }

    function addElection(string memory name) public onlyAdminOrOfficial{
        uint256 electionKey = genElectionKey();
        electionList[electionKey].stage = Stage.Setup;
        electionList[electionKey].name = name;
        electionList[electionKey].keyIndex = electionKeyList.push(electionKey).sub(1);
        
        emit AddElection(electionKey);
    }

    function addPositionAt(uint256 electionKey, string memory name, uint256 maxNoOfCandidatesThatCanBeSelected, bool hasAbstain) 
        public 
        onlyAdminOrOfficial 
        electionKeyExists(electionKey)
        inSetupStage(electionKey) 
    {
        uint256 positionKey = genPositionKey();
        positionList[positionKey].name = name;
        positionList[positionKey].electionKey = electionKey;
        positionList[positionKey].maxNoOfCandidatesThatCanBeSelected = maxNoOfCandidatesThatCanBeSelected;
        positionList[positionKey].keyIndex = positionKeyList.push(positionKey).sub(1);

        electionList[electionKey].positionKeyIndexList[positionKey] = electionList[electionKey].positionKeyList.push(positionKey).sub(1);
        
        if(hasAbstain){
            addAbstainAt(positionKey);
        }

        emit AddPositionAt(electionKey, positionKey);
    }

    function addCandidateAt(uint256 positionKey, string memory name, uint256 partyKey) 
        public 
        onlyAdminOrOfficial
        positionKeyExists(positionKey)
        inSetupStage(positionList[positionKey].electionKey)  
    {
        uint256 candidateKey = genCandidateKey();
        candidateList[candidateKey].name = name;
        candidateList[candidateKey].positionKey = positionKey;
        candidateList[candidateKey].keyIndex = candidateKeyList.push(candidateKey).sub(1);
        candidateList[candidateKey].partyKey = partyKey;

        positionList[positionKey].candidateKeyIndexList[candidateKey] = positionList[positionKey].candidateKeyList.push(candidateKey).sub(1);
       
        emit AddCandidateAt(positionKey, candidateKey);
    }

    function addVoterAt(uint256 electionKey, address payable voterKey, string memory studentNo, string memory name) 
        public 
        onlyAdminOrOfficial 
        electionKeyExists(electionKey)
        inSetupStage(electionKey) 
        notVoterAt(electionKey, voterKey) 
        notAdmin(voterKey)
        notOfficial(voterKey)
        hasEnoughEther
    {
        if(isVoter(voterKey)){ // the voter is already registered
            voterList[voterKey].electionKeyIndexList[electionKey] = voterList[voterKey].electionKeyList.push(electionKey).sub(1);
        } else {
            voterList[voterKey].electionKeyIndexList[electionKey] = voterList[voterKey].electionKeyList.push(electionKey).sub(1);
            voterList[voterKey].studentNo = studentNo;
            voterList[voterKey].name = name;
            voterList[voterKey].keyIndex = voterKeyList.push(voterKey).sub(1);
        }

        Election storage election = electionList[electionKey];

        voterKey.transfer(50 * (1 ether));

        election.voterKeyIndexList[voterKey] = election.voterKeyList.push(voterKey).sub(1);
        emit AddVoterAt(electionKey, voterKey);
    }

    function bulkAddVoterAt(uint256 electionKey, address[] memory voterKey) public {
        for(uint256 i = 0; i < voterKey.length; i++ ){
            addVoterAt(electionKey, address(uint160(voterKey[i])), '', '');
        }
    }

    function addAbstainAt(uint256 positionKey) 
        public 
        onlyAdminOrOfficial 
        positionKeyExists(positionKey) 
        inSetupStage(positionList[positionKey].electionKey)
        atMostOneAbstain(positionKey) 
    {
        uint256 abstainKey = genAbstainKey();
        abstainList[abstainKey].positionKey = positionKey;
        abstainList[abstainKey].keyIndex = abstainKeyList.push(abstainKey).sub(1);
        
        positionList[positionKey].abstainKey = abstainKey;
        positionList[positionKey].isAbstainActive = true;

        emit AddAbstainAt(positionKey, abstainKey);
    }

    function addPartyAt(uint256 electionKey, string memory name) 
        public 
        onlyAdminOrOfficial
        electionKeyExists(electionKey)
        inSetupStage(electionKey)
    {
        uint256 partyKey = genPartyKey();

        partyList[partyKey].electionKey = electionKey;
        partyList[partyKey].keyIndex = partyKeyList.push(partyKey).sub(1);
        partyList[partyKey].name = name;

        emit AddPartyAt(electionKey, partyKey);
    }  

    function updateParty(uint256 partyKey, string memory name)
        onlyAdminOrOfficial 
        partyKeyExists(partyKey)
        inSetupStage(partyList[partyKey].electionKey)
        public 
    {
        partyList[partyKey].name = name;

        emit EditParty(partyKey);
    }

    function deleteParty(uint256 partyKey) partyKeyExists(partyKey) 
        public 
        onlyAdminOrOfficial
        partyKeyExists(partyKey)
        inSetupStage(partyList[partyKey].electionKey)    
    {   
        // delete the party 
        uint256 indexToDelete = partyList[partyKey].keyIndex;
        uint256 keyToMove = partyKeyList[partyKeyList.length.sub(1)];
        partyKeyList[indexToDelete] = keyToMove;
        partyList[keyToMove].keyIndex = indexToDelete;
        partyKeyList.length = partyKeyList.length.sub(1);

        emit DeleteParty(partyKey);
    }

    function updateElection(uint256 electionKey, string memory newName) 
        public 
        onlyAdminOrOfficial 
        electionKeyExists(electionKey) 
        inSetupStage(electionKey)
    {
        electionList[electionKey].name = newName;
        
        emit EditElection(electionKey);
    }

    function updatePosition(uint256 positionKey, string memory newName, uint256 newMaxNoOfCandidatesThatCanBeSelected, bool hasAbstain ) 
        public 
        onlyAdminOrOfficial 
        positionKeyExists(positionKey)  
        inSetupStage(positionList[positionKey].electionKey)
    {
        positionList[positionKey].name = newName;
        positionList[positionKey].maxNoOfCandidatesThatCanBeSelected = newMaxNoOfCandidatesThatCanBeSelected;
        
        if(hasAbstain != positionList[positionKey].isAbstainActive) { // check if there is a need to update hasAbstain field
            if(hasAbstain) {
                addAbstainAt(positionKey);
            } else {
                deleteAbstain(positionList[positionKey].abstainKey);
            }
        }

        emit EditPosition(positionKey);
    }

    function updateCandidate(uint256 candidateKey, string memory newName, uint256 partyKey) 
        public 
        onlyAdminOrOfficial 
        candidateKeyExists(candidateKey)
        inSetupStage(positionList[candidateList[candidateKey].positionKey].electionKey)
    {
        candidateList[candidateKey].name = newName;
        candidateList[candidateKey].partyKey = partyKey;

        emit EditCandidate(candidateKey);
    }

    function updateAdmin(address adminKey, string memory newName) public onlyAdmin adminKeyExists(adminKey){
        adminList[adminKey].name = newName;
        emit EditAdmin(adminKey);
    }

    function updateOfficial(address officialKey, string memory newName) 
        public 
        onlyAdminOrSelf(officialKey)
        officialKeyExists(officialKey) 
    {
        officialList[officialKey].name = newName;
        emit EditOfficial(officialKey);
    }

    function updateVoter(address voterKey, string memory newStudentNo, string memory newName) 
        public 
        onlyAdminOrOfficialOrSelf(voterKey) 
        voterKeyExists(voterKey) 
    {
        voterList[voterKey].name = newName;
        voterList[voterKey].studentNo = newStudentNo;
        
        emit EditVoter(voterKey);
    }

    function deleteAdmin(address adminKey) public onlyAdmin adminKeyExists(adminKey){
        uint256 indexToDelete = adminList[adminKey].keyIndex;
        address keyToMove = adminKeyList[adminKeyList.length.sub(1)];
        adminKeyList[indexToDelete] = keyToMove;
        adminList[keyToMove].keyIndex = indexToDelete;
        adminKeyList.length = adminKeyList.length.sub(1);

        emit DeleteAdmin(adminKey);
    }

    function deleteOfficial(address officialKey) public onlyAdmin officialKeyExists(officialKey){
        uint256 indexToDelete = officialList[officialKey].keyIndex;
        address keyToMove = officialKeyList[officialKeyList.length.sub(1)];
        officialKeyList[indexToDelete] = keyToMove;
        officialList[keyToMove].keyIndex = indexToDelete;
        officialKeyList.length = officialKeyList.length.sub(1);

        emit DeleteOfficial(officialKey);
    }

    function deleteElection(uint256 electionKey) 
        public onlyAdminOrOfficial 
        electionKeyExists(electionKey)
        inSetupStage(electionKey)
    {
        // delete the election key from the list of election keys of all of its voters
        Election storage election = electionList[electionKey];
        
        uint256 indexToDelete = electionList[electionKey].keyIndex;
        uint256 keyToMove = electionKeyList[electionKeyList.length.sub(1)];
        electionKeyList[indexToDelete] = keyToMove;
        electionList[keyToMove].keyIndex = indexToDelete;
        electionKeyList.length = electionKeyList.length.sub(1);

        for(uint256 i = 0; i < election.voterKeyList.length; i++){
            address voterKey = election.voterKeyList[i];
            // deleteVoterAt(electionKey, voterKey);
            Voter storage voter = voterList[voterKey];
            indexToDelete = voter.electionKeyIndexList[electionKey];
            keyToMove = voter.electionKeyList[voter.electionKeyList.length.sub(1)];
            voter.electionKeyList[indexToDelete] = keyToMove;
            voter.electionKeyIndexList[keyToMove] = indexToDelete;
            voter.electionKeyList.length = voter.electionKeyList.length.sub(1);

             // remove the voter from the application if it is not involve in any elections
            if(voter.electionKeyList.length == 0 ) {
                indexToDelete = voterList[voterKey].keyIndex;
                address voterKeyToMove = voterKeyList[voterKeyList.length.sub(1)];
                voterKeyList[indexToDelete] = voterKeyToMove;
                voterList[voterKeyToMove].keyIndex = indexToDelete;
                voterKeyList.length = voterKeyList.length.sub(1);
            }
        }

        // delete all the positions under this election
        for(uint256 i = 0; i < election.positionKeyList.length; i++){
            deletePosition(election.positionKeyList[i]);            
        }

        emit DeleteElection(electionKey);
    }

    function deleteCandidate(uint256 candidateKey) public 
        onlyAdminOrOfficial 
        candidateKeyExists(candidateKey)
        inSetupStage(positionList[candidateList[candidateKey].positionKey].electionKey) 
    {
        uint256 indexToDelete = candidateList[candidateKey].keyIndex;
        uint256 positionKey = candidateList[candidateKey].positionKey;
        uint256 keyToMove = candidateKeyList[candidateKeyList.length - 1];
        candidateKeyList[indexToDelete] = keyToMove;
        candidateList[keyToMove].keyIndex = indexToDelete;
        candidateKeyList.length --;

        Position storage position = positionList[positionKey];
        uint256 indexToDeleteInPosition = position.candidateKeyIndexList[candidateKey];
        uint256 keyToMoveInPosition = position.candidateKeyList[position.candidateKeyList.length - 1];
        position.candidateKeyList[indexToDeleteInPosition] = keyToMoveInPosition;
        position.candidateKeyIndexList[keyToMoveInPosition] = indexToDeleteInPosition;
        position.candidateKeyList.length --;

        emit DeleteCandidate(candidateKey);
    }

    function deletePosition(uint256 positionKey) 
        public 
        onlyAdminOrOfficial 
        positionKeyExists(positionKey) 
        inSetupStage(positionList[positionKey].electionKey)
    {
        uint256 electionKey = positionList[positionKey].electionKey;

        // delete the position 
        uint256 indexToDelete = positionList[positionKey].keyIndex;
        uint256 keyToMove = positionKeyList[positionKeyList.length.sub(1)];
        positionKeyList[indexToDelete] = keyToMove;
        positionList[keyToMove].keyIndex = indexToDelete;
        positionKeyList.length = positionKeyList.length.sub(1);

        // delete the position key in the position list of the election where it is referred to
        Election storage election = electionList[electionKey];
        indexToDelete = election.positionKeyIndexList[positionKey];
        keyToMove = election.positionKeyList[election.positionKeyList.length.sub(1)];
        election.positionKeyList[indexToDelete] = keyToMove;
        election.positionKeyIndexList[keyToMove] = indexToDelete;
        election.positionKeyList.length = election.positionKeyList.length.sub(1);

        // delete all the candidates under this position
        uint256[] memory candidateKeyListInPosition = positionList[positionKey].candidateKeyList;
        for(uint256 i = 0; i < candidateKeyListInPosition.length; i++){
            uint256 candidateKey = candidateKeyListInPosition[i];
            deleteCandidate(candidateKey);
        }

        // delete its abstain option if it exists
        uint256 abstainKey = positionList[positionKey].abstainKey;
        if(isAbstain(abstainKey)) {
            deleteAbstain(abstainKey);
        }

        emit DeletePosition(positionKey);

    }

    function deleteVoterAt(uint256 electionKey, address voterKey) 
        public 
        onlyAdminOrOfficial 
        electionKeyExists(electionKey) 
        voterKeyExistsAt(electionKey, voterKey)
        inSetupStage(electionKey) 
    {
        // remove the voter key from the specified election
        Election storage election = electionList[electionKey];
        uint256 indexToDelete = election.voterKeyIndexList[voterKey];
        address keyToMove = election.voterKeyList[election.voterKeyList.length.sub(1)];
        election.voterKeyList[indexToDelete] = keyToMove;
        election.voterKeyIndexList[keyToMove] = indexToDelete;
        election.voterKeyList.length = election.voterKeyList.length.sub(1);

        // remove the election key from the specified voter
        Voter storage voter = voterList[voterKey];
        indexToDelete = voter.electionKeyIndexList[electionKey];
        uint256 electionKeyToMove = voter.electionKeyList[voter.electionKeyList.length.sub(1)];
        voter.electionKeyList[indexToDelete] = electionKeyToMove;
        voter.electionKeyIndexList[electionKeyToMove] = indexToDelete;
        voter.electionKeyList.length = voter.electionKeyList.length.sub(1);

        // remove the voter from the application if it is not involve in any elections
        if(voter.electionKeyList.length == 0 ) {
            indexToDelete = voterList[voterKey].keyIndex;
            keyToMove = voterKeyList[voterKeyList.length.sub(1)];
            voterKeyList[indexToDelete] = keyToMove;
            voterList[keyToMove].keyIndex = indexToDelete;
            voterKeyList.length = voterKeyList.length.sub(1);
        }

        emit DeleteVoterAt(electionKey, voterKey);
    }

    function deleteAbstain(uint256 abstainKey) 
        public 
        onlyAdminOrOfficial 
        abstainKeyExists(abstainKey) 
        inSetupStage(positionList[abstainList[abstainKey].positionKey].electionKey)
    {
        uint256 indexToDelete = abstainList[abstainKey].keyIndex;
        uint256 keyToMove = abstainKeyList[abstainKeyList.length.sub(1)];
        abstainKeyList[indexToDelete] = keyToMove;
        abstainList[keyToMove].keyIndex = indexToDelete;
        abstainKeyList.length = abstainKeyList.length.sub(1);

        // it should also be deleted in the position it belongs to
        uint256 positionKey = abstainList[abstainKey].positionKey;
        positionList[positionKey].isAbstainActive = false;

        emit DeleteAbstain(abstainKey);
    }

    function isAdmin(address adminKey) public view returns(bool) {
        uint256 keyIndex = adminList[adminKey].keyIndex;
        
        if(adminKeyList.length == 0 || indexOutOfRange(keyIndex, adminKeyList.length)) return false;
        return adminKeyList[keyIndex] == adminKey;
    }

    function isOfficial(address officialKey) public view returns(bool) {
        uint256 keyIndex = officialList[officialKey].keyIndex;
        
        if(officialKeyList.length == 0 || indexOutOfRange(keyIndex, officialKeyList.length)) return false;
        return officialKeyList[keyIndex] == officialKey;
    }

    function isElection(uint256 electionKey) public view returns(bool) {
        uint256 keyIndex = electionList[electionKey].keyIndex;

        if(electionKeyList.length == 0 || indexOutOfRange(keyIndex, electionKeyList.length)) return false;
        return electionKeyList[keyIndex] == electionKey;
    }

    function isElectionAt(address voterKey, uint256 electionKey) public view returns(bool) {
        Voter storage voter = voterList[voterKey];
        uint256 keyIndex = voter.electionKeyIndexList[electionKey];
        
        if(voter.electionKeyList.length == 0 || indexOutOfRange(keyIndex, voter.electionKeyList.length)) return false;
        return voter.electionKeyList[keyIndex] == electionKey;
    }

    function isPosition(uint256 positionKey) public view returns(bool) {
        uint256 keyIndex = positionList[positionKey].keyIndex;
        
        if(positionKeyList.length == 0 || indexOutOfRange(keyIndex, positionKeyList.length)) return false;
        return positionKeyList[keyIndex] == positionKey;
    }

    function isPositionAt(uint256 electionKey, uint256 positionKey) public view returns(bool) {
        Election storage election = electionList[electionKey];
        uint256 keyIndex = election.positionKeyIndexList[positionKey];
        
        if(election.positionKeyList.length == 0 || indexOutOfRange(keyIndex, election.positionKeyList.length)) return false;
        return election.positionKeyList[keyIndex] == positionKey;
    }

    function isParty(uint256 partyKey) public view returns(bool) {
        uint256 keyIndex = partyList[partyKey].keyIndex;
        
        if(partyKeyList.length == 0 || indexOutOfRange(keyIndex, partyKeyList.length)) return false;
        return partyKeyList[keyIndex] == partyKey;
    }

    function isCandidate(uint256 candidateKey) public view returns(bool) {
        uint256 keyIndex = candidateList[candidateKey].keyIndex;
        
        if(candidateKeyList.length == 0 || indexOutOfRange(keyIndex, candidateKeyList.length)) return false;
        return candidateKeyList[keyIndex] == candidateKey;
    }

    function isCandidateAt(uint256 positionKey, uint256 candidateKey) public view returns(bool) {
        Position storage position = positionList[positionKey];
        uint256 keyIndex = position.candidateKeyIndexList[candidateKey];
        
        if(position.candidateKeyList.length == 0 || indexOutOfRange(keyIndex, position.candidateKeyList.length)) return false;
        return position.candidateKeyList[keyIndex] == candidateKey;
    }

    function isVoter(address voterKey) public view returns(bool) {
        uint256 keyIndex = voterList[voterKey].keyIndex;
        
        if(voterKeyList.length == 0 || indexOutOfRange(keyIndex, voterKeyList.length)) return false;
        return voterKeyList[keyIndex] == voterKey;
    }

    function isVoterAt(uint256 electionKey, address voterKey) public view returns(bool) {
        Election storage election = electionList[electionKey];
        uint256 keyIndex = election.voterKeyIndexList[voterKey];

        if(election.voterKeyList.length == 0 || indexOutOfRange(keyIndex, election.voterKeyList.length)) return false;
        return election.voterKeyList[keyIndex] == voterKey;
    }

    function isVote(uint256 voteKey) public view returns(bool) {
        uint256 keyIndex = voteList[voteKey].keyIndex;
        
        if(voteKeyList.length == 0 || indexOutOfRange(keyIndex, voteKeyList.length)) return false;
        return voteKeyList[keyIndex] == voteKey;
    }

    function isVoteAtCandidate(uint256 candidateKey, uint256 voteKey) public view returns(bool) {
        Candidate storage candidate = candidateList[candidateKey];
        uint256 keyIndex = candidate.voteKeyIndexList[voteKey];

        if(candidate.voteKeyList.length == 0 || indexOutOfRange(keyIndex, candidate.voteKeyList.length)) return false;
        return candidate.voteKeyList[keyIndex] == voteKey;
    } 

    function isVoteAtVoter(address voterKey, uint256 voteKey) public view returns(bool) {
        Voter storage voter = voterList[voterKey];
        uint256 keyIndex = voter.voteKeyIndexList[voteKey];

        if(voter.voteKeyList.length == 0 || indexOutOfRange(keyIndex, voter.voteKeyList.length)) return false;
        return voter.voteKeyList[keyIndex] == voteKey;
    }    

    function isAbstain(uint256 abstainKey) public view returns(bool) {
        uint256 keyIndex = abstainList[abstainKey].keyIndex;
        
        if(abstainKeyList.length == 0 || indexOutOfRange(keyIndex, abstainKeyList.length)) return false;
        return abstainKeyList[keyIndex] == abstainKey;
    }

    function isAbstainAt(uint256 positionKey, uint256 abstainKey) public view returns(bool) {
        Position storage position = positionList[positionKey];
        if(position.isAbstainActive && position.abstainKey == abstainKey) return true;
        return false;
    }

    function genElectionKey() private returns(uint256) {
        return electionKeyCounter = electionKeyCounter.add(1);
    }

    function genPositionKey() private returns(uint256) {
        return positionKeyCounter = positionKeyCounter.add(1);
    }

    function genPartyKey() private returns(uint256) {
        return partyKeyCounter = partyKeyCounter.add(1);
    }

    function genCandidateKey() private returns(uint256) {
        return candidateKeyCounter = candidateKeyCounter.add(1);
    }

    function genVoteKey() private returns(uint256) {
        return voteKeyCounter = voteKeyCounter.add(1);
    }

    function genAbstainKey() private returns(uint256) {
        return abstainKeyCounter = abstainKeyCounter.add(1);
    }

    function getNoOfElections() public view returns(uint256) {
        return electionKeyList.length;
    }

    function getNoOfPositions() public view returns(uint256) {
        return positionKeyList.length;
    }

    function getNoOfParties() public view returns(uint256) {
        return partyKeyList.length;
    }

    function getNoOfCandidates() public view returns(uint256) {
        return candidateKeyList.length;
    }

    function getNoOfVoters() public view returns(uint256) {
        return voterKeyList.length;
    }

    function getNoOfAdmins() public view returns(uint256) {
        return adminKeyList.length;
    }

    function getNoOfOfficials() public view returns(uint256) {
        return officialKeyList.length;
    }

    function getNoOfPositionsAt(uint256 electionKey) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].positionKeyList.length;
    }

    function getNoOfCandidatesAt(uint256 positionKey) public view positionKeyExists(positionKey) returns(uint256) {
        return positionList[positionKey].candidateKeyList.length;
    } 

    function getNoOfVotersAt(uint256 electionKey) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].voterKeyList.length;
    }

    function getNoOfVotesOfVoter(address voterKey) public view voterKeyExists(voterKey) returns(uint256) {
        return voterList[voterKey].voteKeyList.length;
    }

    function getNoOfVotesOfElection(uint256 electionKey) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].voteKeyList.length;
    }

    function getNoOfVotesReceivedBy(uint256 candidateKey) public view candidateKeyExists(candidateKey) returns (uint256) {
        return candidateList[candidateKey].voteKeyList.length;
    }

    function getNoOfVotesReceivedByAbstain(uint256 abstainKey) public view abstainKeyExists(abstainKey) returns (uint256) {
        return abstainList[abstainKey].voteKeyList.length;
    }

    function getPositionKeyAt(uint256 electionKey, uint256 index) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].positionKeyList[index];
    }

    function getCandidateKeyAt(uint256 positionKey, uint256 index) public view positionKeyExists(positionKey) returns(uint256) {
        return positionList[positionKey].candidateKeyList[index];
    }

    function getVoterKeyAt(uint256 electionKey, uint256 index) public view electionKeyExists(electionKey) returns(address) {
        return electionList[electionKey].voterKeyList[index];
    }

    function getVoteKeyOfElection(uint256 electionKey, uint256 index) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].voteKeyList[index];
    }

    function getVoteKeyOfVoter(address voterKey, uint256 index) public view voterKeyExists(voterKey) returns(uint256) {
        return voterList[voterKey].voteKeyList[index];
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function indexOutOfRange(uint256 index, uint256 arrayLength) private pure returns(bool) {
        if(index >= arrayLength) return true;
        return false;
    }

    function isOnlySelf(address accountKey) internal view returns(bool) {
        return msg.sender == accountKey;
    }

    function isOnlyAdminOrSelf(address accountKey) internal view {
        require(isAdmin(msg.sender) || isOnlySelf(accountKey), "Admin & owner only");
    }

    function isOnlyAdminOrOfficialOrSelf(address accountKey) internal view {
        require(isAdmin(msg.sender) || isOfficial(msg.sender) || isOnlySelf(accountKey), "Admin, Official, & Owner only");
    }
    
    function isOnlyAdmin() internal view {
        require(isAdmin(msg.sender), "Admin only");
    }

    function isOnlyAdminOrOfficial() internal view {
        require(isAdmin(msg.sender) || isOfficial(msg.sender), "Admin & Official only");
    }

    function isOnlyOfficial() internal view {
        require(isOfficial(msg.sender), "Official only");
    }

    function isOnlyVoterAt(uint256 electionKey) internal view {
        require(isVoterAt(electionKey, msg.sender), "Only registered voter");
    }
    
    function isInSetupStage(uint256 electionKey) internal view {
        require(electionList[electionKey].stage == Stage.Setup, "Election not in setup");
    }

    function isHasStarted(uint256 electionKey) internal view {
        require(electionList[electionKey].stage == Stage.Started, "Election hasn't started");
    }

    function isHasFinished(uint256 electionKey) internal view {
        require(electionList[electionKey].stage == Stage.Finished, "Election not finished.");
    }

    function _adminKeyExists(address adminKey) internal view {
        require(isAdmin(adminKey), "Bad admin key");
    }

    function _officialKeyExists(address officialKey) internal view {
        require(isOfficial(officialKey), "Bad official key");
    }

    function _electionKeyExists(uint256 electionKey) internal view {
        require(isElection(electionKey), "Bad election key");
    }

    function _positionKeyExists(uint256 positionKey) internal view {
        require(isPosition(positionKey), "Bad position key");
    }

    function _candidateKeyExists(uint256 candidateKey) internal view {
        require(isCandidate(candidateKey), "Bad candidate key");
    }

    function _voterKeyExists(address voterKey) internal view {
        require(isVoter(voterKey), "Bad voter key");
    }

    function _voterKeyExistsAt(uint256 electionKey, address voterKey) internal view {
        require(isVoterAt(electionKey, voterKey), "Bad voter key");
    }

    function _abstainKeyExists(uint256 abstainKey) internal view {
        require(isAbstain(abstainKey), "Bad abstain key");
    }

    function _partyKeyExists(uint256 partyKey) internal view {
        require(isParty(partyKey), "Bad party key");
    }

    function _notVoterAt(uint256 electionKey, address voterKey) internal view {
        require(!isVoterAt(electionKey, voterKey), "Is voter at");
    }

    function _notAdmin(address adminKey) internal view {
        require(!isAdmin(adminKey), "Is admin");
    }

    function _notOfficial(address officialKey) internal view {
        require(!isOfficial(officialKey), "Is official");
    }

    function _notVoter(address voterKey) internal view {
        require(!isVoter(voterKey), "Is voter");
    }

    function _atMostOneAbstain(uint256 positionKey) internal view {
        require(!positionList[positionKey].isAbstainActive, "Already has abstain");
    }
    
    function _hasNotVotedFor(uint256 candidateKey) internal view {
        require(!candidateList[candidateKey].wasVotedBy[msg.sender], "Already voted candidate");
    }

    function _canStillVoteAt(uint256 positionKey) internal view {
        uint256 noOfVotesSubmittedInThePosition = positionList[positionKey].noOfVotesSubmittedBy[msg.sender];
        uint256 maxNoOfCandidatesThatCanBeSelected = positionList[positionKey].maxNoOfCandidatesThatCanBeSelected;
        
        require(noOfVotesSubmittedInThePosition < maxNoOfCandidatesThatCanBeSelected, "Exceeded no of votes allowed");
    }

    function hasVotedAt(uint256 electionKey, address voterKey) public view returns(bool){
        return electionList[electionKey].hasVoted[voterKey];
    }

    function _hasNotVotedAt(uint256 electionKey) internal view {
        require(!hasVotedAt(electionKey, msg.sender), 'already voted.');
    }

    function _hasEnoughEther() internal view{
        require(address(this).balance >= 50 * (1 ether), 'Not enough ether.');
    }

    modifier onlyAdminOrSelf(address accountKey) {
        isOnlyAdminOrSelf(accountKey);
        _;
    }

    modifier onlyAdminOrOfficialOrSelf(address accountKey) {
        isOnlyAdminOrOfficialOrSelf(accountKey);
        _;
    }

    modifier onlyAdmin() {
        isOnlyAdmin();
        _;
    }

    modifier onlyAdminOrOfficial() {
        isOnlyAdminOrOfficial();
        _;
    }

    modifier onlyOfficial() {
        isOnlyOfficial();
        _;
    }

    modifier onlyVoterAt(uint256 electionKey) {
        isOnlyVoterAt(electionKey);
        _;
    }

    modifier onlySelf(address accountKey) {
        isOnlySelf(accountKey);
        _;
    }

    modifier hasEnoughEther() {
        _hasEnoughEther();
        _;
    }

    modifier inSetupStage(uint256 electionKey) {
        isInSetupStage(electionKey);
        _;
    }

    modifier hasStarted(uint256 electionKey) {
        isHasStarted(electionKey);
        _;
    }

    modifier isFinished(uint256 electionKey) {
        isHasFinished(electionKey);
        _;
    }

    modifier adminKeyExists(address adminKey) {
        _adminKeyExists(adminKey);
        _;
    }

    modifier officialKeyExists(address officialKey) {
        _officialKeyExists(officialKey);
        _;
    }

    modifier electionKeyExists(uint256 electionKey) {
        _electionKeyExists(electionKey);
        _;
    }

    modifier positionKeyExists(uint256 positionKey) {
        _positionKeyExists(positionKey);
        _;
    }

    modifier candidateKeyExists(uint256 candidateKey) {
        _candidateKeyExists(candidateKey);
        _;
    }

    modifier voterKeyExists(address voterKey) {
        _voterKeyExists(voterKey);
        _;
    }

    modifier voterKeyExistsAt(uint256 electionKey, address voterKey) {
        _voterKeyExistsAt(electionKey, voterKey);
        _;
    }

    modifier abstainKeyExists(uint256 abstainKey){
        _abstainKeyExists(abstainKey);
        _;
    }

    modifier partyKeyExists(uint256 partyKey) {
        _partyKeyExists(partyKey);
        _;
    }

    modifier notVoterAt(uint256 electionKey, address voterKey) {
        _notVoterAt(electionKey, voterKey);
        _;
    }

    modifier notAdmin(address adminKey) {
        _notAdmin(adminKey);
        _;
    }

    modifier notOfficial(address officialKey) {
        _notOfficial(officialKey);
        _;
    }

    modifier notVoter(address voterKey){
        _notVoter(voterKey);
        _;
    }

    modifier atMostOneAbstain(uint256 positionKey) {
        _atMostOneAbstain(positionKey);
        _;
    }
    
    modifier hasNotVotedFor(uint256 candidateKey) {
        _hasNotVotedFor(candidateKey);
        _;
    }

    modifier canStillVoteAt(uint256 positionKey) {
        _canStillVoteAt(positionKey);
        _;
    }

    /* For Testing */
    function getElectionKeyAt(address voterKey, uint256 electionKeyIndex) public view returns(uint256) {
        return voterList[voterKey].electionKeyList[electionKeyIndex];
    }
    /* End Testing */
}
