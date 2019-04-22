pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Votechain {
    using SafeMath for uint256;

    enum Stage { Setup, Started, Finished }

    uint256 private electionKeyCounter = 0; 
    mapping(uint256 => Election) public electionList;
    uint256[] public electionKeyList;
    
    uint256 private positionKeyCounter = 0;
    mapping(uint256 => Position) public positionList;
    uint256[] public positionKeyList;

    uint256 private candidateKeyCounter = 0;
    mapping(uint256 => Candidate) public candidateList;
    uint256[] public candidateKeyList;

    mapping(address => Voter) public voterList;
    address[] public voterKeyList;

    uint256 private voteKeyCounter = 0;
    mapping(uint256 => Vote) public voteList;
    uint256[] public voteKeyList;

    uint256 private abstainKeyCounter = 0;
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
        mapping(uint256 => uint256) positionKeyIndexList; // position key to index in positionKeyList

        address[] voterKeyList;
        mapping(address => uint256) voterKeyIndexList; // voter kye to index in voterKeyList;
    }

    struct Position {
        uint256 keyIndex;
        string name;
        
        uint256 maxNoOfCandidatesThatCanBeSelected; // the total number of candidates a voter can vote in this position.
        mapping(address => uint256) noOfVotesSubmittedBy; // voter id to no of votes that has been casted by this voter in this position.

        uint256 electionKey;

        uint256[] candidateKeyList;
        mapping(uint256 => uint256) candidateKeyIndexList; // candidate key to index in candidateKeyList

        uint256 abstainKey;
        bool isAbstainActive;
    }

    struct Candidate {
        uint256 keyIndex;
        string name;

        uint256 positionKey;

        mapping(address => bool) wasVotedBy;

        uint256[] voteKeyList; // votes received
        mapping(uint256 => uint256) voteKeyIndexList; // vote key to index in voteKeyList
    }

    struct Voter {
        uint256 keyIndex;
        string name;
        string studentNo;

        uint256[] electionKeyList;
        mapping(uint256 => uint256) electionKeyIndexList; // electionKey to index in electionKeyList

        uint256[] voteKeyList;
        mapping(uint256 => uint256) voteKeyIndexList; // vote key to index in voteKeyList
    }

    struct Vote {
        uint256 keyIndex;
        uint256 electionKey;
        uint256 positionKey;
        uint256 candidateKey;
        address voterKey;
    }

    struct Abstain {
        uint256 keyIndex;
        uint256 positionKey;

        uint256[] voteKeyList; // voters who voted for this particular abstain
        mapping(uint256 => uint256) voteKeyIndexList; // voter key to index in the voterKeyList
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

    event CastVote (uint256 voteKey);

    constructor(address adminKey, string memory name) public {
        adminList[adminKey].name = name;
        adminList[adminKey].keyIndex = adminKeyList.push(adminKey).sub(1);

        // For testing UI
        addElection('UP Manila Student Council Election');
        addElection('Codeninja Board Of Directors Election');

        // for election1
        addPositionAt(1, 'Chairman', 1, false);

        // for election2
        addPositionAt(2, 'CEO', 1, false);
        addPositionAt(2, 'CTO', 2, false);

        // for position1
        addCandidateAt(1, 'Neil');
        addCandidateAt(1, 'Alee');
        addCandidateAt(1, 'Bea');

        // for position2
        addCandidateAt(2, 'Paulo');
        addCandidateAt(2, 'Ben');
        addCandidateAt(2, 'Guen');

        // for position3
        addCandidateAt(3, 'JM');
        addCandidateAt(3, 'Mike');
        addCandidateAt(3, 'Alley');

        addVoterAt(1, 0xc09972BaE6E393b4C3f22D81DB3AC55554c1b975, '2015-08795', 'JM');
        addVoterAt(2, 0x211f3138e1bA20F517B2569B225d7174f4FAaC8E, '2015-09899', 'Alley');
    }

    function startElection(uint256 electionKey) public onlyAdmin electionKeyExists(electionKey) inSetupStage(electionKey){
        electionList[electionKey].stage = Stage.Started;
        emit StartElection(electionKey);
    }

    function stopElection(uint256 electionKey) public onlyAdmin electionKeyExists(electionKey) hasStarted(electionKey){
        electionList[electionKey].stage = Stage.Finished;
        emit StopElection(electionKey);
    }

    function castVote(uint256 candidateKey) 
        public 
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

        candidateList[candidateKey].wasVotedBy[msg.sender] = true;
        position.noOfVotesSubmittedBy[msg.sender] = position.noOfVotesSubmittedBy[msg.sender].add(1);

        emit CastVote(voteKey);
    }

    function bulkVote(uint256[] memory candidateKeys) public {
        for(uint256 i = 0; i < candidateKeys.length; i++){
            castVote(candidateKeys[i]);
        }
    }

    function addAdmin(address adminKey, string memory name) public onlyAdmin notVoter(adminKey) notOfficial(adminKey) notAdmin(adminKey){
        adminList[adminKey].name = name;
        adminList[adminKey].keyIndex = adminKeyList.push(adminKey).sub(1);
        
        emit AddAdmin(adminKey);
    }

    function addOfficial(address officialKey, string memory name) public onlyAdmin notAdmin(officialKey) notVoter(officialKey) notOfficial(officialKey){
        officialList[officialKey].name = name;
        officialList[officialKey].keyIndex = officialKeyList.push(officialKey).sub(1);

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

    function addCandidateAt(uint256 positionKey, string memory name) 
        public 
        onlyAdminOrOfficial
        positionKeyExists(positionKey)
        inSetupStage(positionList[positionKey].electionKey)  
    {
        uint256 candidateKey = genCandidateKey();
        candidateList[candidateKey].name = name;
        candidateList[candidateKey].positionKey = positionKey;
        candidateList[candidateKey].keyIndex = candidateKeyList.push(candidateKey).sub(1);

        positionList[positionKey].candidateKeyIndexList[candidateKey] = positionList[positionKey].candidateKeyList.push(candidateKey).sub(1);
       
        emit AddCandidateAt(positionKey, candidateKey);
    }

    function addVoterAt(uint256 electionKey, address voterKey, string memory studentNo, string memory name) 
        public 
        onlyAdminOrOfficial 
        electionKeyExists(electionKey)
        inSetupStage(electionKey) 
        notVoterAt(electionKey, voterKey) 
        notAdmin(voterKey)
        notOfficial(voterKey)
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

        election.voterKeyIndexList[voterKey] = election.voterKeyList.push(voterKey).sub(1);
        emit AddVoterAt(electionKey, voterKey);
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

    function updateCandidate(uint256 candidateKey, string memory newName) 
        public 
        onlyAdminOrOfficial 
        candidateKeyExists(candidateKey)  
        inSetupStage(positionList[candidateList[candidateKey].positionKey].electionKey)
    {
        candidateList[candidateKey].name = newName;
        emit EditCandidate(candidateKey);
    }

    function updateAdmin(address adminKey, string memory newName) public onlySelf(adminKey) adminKeyExists(adminKey){
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
        onlySelf(voterKey) 
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

    function deleteElection(uint256 electionKey) public onlyAdminOrOfficial electionKeyExists(electionKey){
        uint256 indexToDelete = electionList[electionKey].keyIndex;
        uint256 keyToMove = electionKeyList[electionKeyList.length.sub(1)];
        electionKeyList[indexToDelete] = keyToMove;
        electionList[keyToMove].keyIndex = indexToDelete;
        electionKeyList.length = electionKeyList.length.sub(1);

        // delete the election key from the list of election keys of all of its voters
        Election storage election = electionList[electionKey];
        for(uint256 i = 0; i < election.voterKeyList.length; i++){
            address voterKey = election.voterKeyList[i];
            Voter storage voter = voterList[voterKey];
            indexToDelete = voter.electionKeyIndexList[electionKey];
            keyToMove = voter.electionKeyList[voter.electionKeyList.length.sub(1)];
            voter.electionKeyList[indexToDelete] = keyToMove;
            voter.electionKeyIndexList[keyToMove] = indexToDelete;
            voter.electionKeyList.length = voter.electionKeyList.length.sub(1);
        }

        // delete all the positions under this election
        for(uint256 i = 0; i < election.positionKeyList.length; i++){
            uint256 positionKey = election.positionKeyList[i];

            // delete this position
            indexToDelete = positionList[positionKey].keyIndex;
            keyToMove = positionKeyList[positionKeyList.length.sub(1)];
            positionKeyList[indexToDelete] = keyToMove;
            positionList[keyToMove].keyIndex = indexToDelete;
            positionKeyList.length = positionKeyList.length.sub(1);

            // delete all the candidates under this position
            Position storage position = positionList[positionKey];
            for(uint256 j = 0; j < position.candidateKeyList.length; j++){
                uint256 candidateKey = position.candidateKeyList[j];
                indexToDelete = candidateList[candidateKey].keyIndex;
                keyToMove = candidateKeyList[candidateKeyList.length.sub(1)];
                candidateKeyList[indexToDelete] = keyToMove;
                candidateList[keyToMove].keyIndex = indexToDelete;
                candidateKeyList.length = candidateKeyList.length.sub(1);
            }          
            
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
            indexToDelete = candidateList[candidateKey].keyIndex;
            keyToMove = candidateKeyList[candidateKeyList.length.sub(1)];
            candidateKeyList[indexToDelete] = keyToMove;
            candidateList[keyToMove].keyIndex = indexToDelete;
            candidateKeyList.length = candidateKeyList.length.sub(1);
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

    function getPositionKeyAt(uint256 electionKey, uint256 index) public view electionKeyExists(electionKey) returns(uint256) {
        return electionList[electionKey].positionKeyList[index];
    }

    function getCandidateKeyAt(uint256 positionKey, uint256 index) public view positionKeyExists(positionKey) returns(uint256) {
        return positionList[positionKey].candidateKeyList[index];
    }

    function getVoterKeyAt(uint256 electionKey, uint256 index) public view electionKeyExists(electionKey) returns(address) {
        return electionList[electionKey].voterKeyList[index];
    }

    function indexOutOfRange(uint256 index, uint256 arrayLength) private pure returns(bool) {
        if(index >= arrayLength) return true;
        return false;
    }

    modifier onlyAdminOrOfficial() {
        require(isAdmin(msg.sender) || isOfficial(msg.sender), "Only admins and officials can invoke this method.");
        _;
    }

    modifier onlyAdminOrSelf(address accountKey) {
        require(isAdmin(msg.sender) || msg.sender == accountKey, "Only admins or the account owner can change the official's profile.");
        _;
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Only admins can invoke this method.");
        _;
    }

    modifier onlyOfficial() {
        require(isOfficial(msg.sender), "Only the voting officials can invoke this method.");
        _;
    }

    modifier onlyVoterAt(uint256 electionKey) {
        require(isVoterAt(electionKey, msg.sender), "Only registered voters can invoke this method.");
        _;
    }

    modifier onlySelf(address accountKey) {
        require(msg.sender == accountKey, "Only the owner of the account can change his profile.");
        _;
    }

    modifier inSetupStage(uint256 electionKey) {
        require(electionList[electionKey].stage == Stage.Setup, "The election is not in setup stage.");
        _;
    }

    modifier hasStarted(uint256 electionKey) {
        require(electionList[electionKey].stage == Stage.Started, "The election has not started yet.");
        _;
    }

    modifier isFinished(uint256 electionKey) {
        require(electionList[electionKey].stage == Stage.Finished, "The election is not finished yet.");
        _;
    }

    modifier adminKeyExists(address adminKey) {
        require(isAdmin(adminKey), "The admin key provided does not exist.");
        _;
    }

    modifier officialKeyExists(address officialKey) {
        require(isOfficial(officialKey), "The official key provided does not exist.");
        _;
    }

    modifier electionKeyExists(uint256 electionKey) {
        require(isElection(electionKey), "The election key provided does not exist.");
        _;
    }

    modifier positionKeyExists(uint256 positionKey) {
        require(isPosition(positionKey), "The position key provided does not exits.");
        _;
    }

    modifier candidateKeyExists(uint256 candidateKey) {
        require(isCandidate(candidateKey), "The candidate key provided does not exist.");
        _;
    }

    modifier voterKeyExists(address voterKey) {
        require(isVoter(voterKey), "The voter key provided does not exist.");
        _;
    }

    modifier voterKeyExistsAt(uint256 electionKey, address voterKey) {
        require(isVoterAt(electionKey, voterKey), "The voter key provided does not exist in the specified election.");
        _;
    }

    modifier abstainKeyExists(uint256 abstainKey){
        require(isAbstain(abstainKey), "The abstain key provided does not exist.");
        _;
    }

    modifier notVoterAt(uint256 electionKey, address voterKey) {
        require(!isVoterAt(electionKey, voterKey), "The voter key provided is already registered in this election.");
        _;
    }

    modifier notAdmin(address adminKey) {
        require(!isAdmin(adminKey), "The account address provided is registered as admin.");
        _;
    }

    modifier notOfficial(address officialKey) {
        require(!isOfficial(officialKey), "The account address provided is registered as official.");
        _;
    }

    modifier notVoter(address voterKey){
        require(!isVoter(voterKey), "The account address provided is registered as voter.");
        _;
    }

    modifier atMostOneAbstain(uint256 positionKey) {
        require(!positionList[positionKey].isAbstainActive, "The position already has an abstain option.");
        _;
    }
    
    modifier hasNotVotedFor(uint256 candidateKey) {
        require(!candidateList[candidateKey].wasVotedBy[msg.sender], "The voter has already voted this candidate.");
        _;
    }

    modifier canStillVoteAt(uint256 positionKey) {
        uint256 noOfVotesSubmittedInThePosition = positionList[positionKey].noOfVotesSubmittedBy[msg.sender];
        uint256 maxNoOfCandidatesThatCanBeSelected = positionList[positionKey].maxNoOfCandidatesThatCanBeSelected;
        
        require(noOfVotesSubmittedInThePosition < maxNoOfCandidatesThatCanBeSelected, "The voter exceeded the amount of candidates he can vote for this position.");
        _;
    }

    /* For Testing */
    function getElectionKeyAt(address voterKey, uint256 electionKeyIndex) public view returns(uint256) {
        return voterList[voterKey].electionKeyList[electionKeyIndex];
    }
    /* End Testing */
}
