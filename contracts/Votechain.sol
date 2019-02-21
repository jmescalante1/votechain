pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Votechain {
    using SafeMath for uint256;

    uint256 private electionKeyCounter = 0; // will also serve as the election's key
    mapping(uint256 => Election) public electionList; // election id to election list
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

        uint256[] positionKeyList;
        mapping(uint256 => uint256) positionKeyIndexList; // position key to index in positionKeyList

        address[] voterKeyList;
        mapping(address => uint256) voterKeyIndexList; // voter kye to index in voterKeyList;
    }

    struct Position {
        uint256 keyIndex;
        string name;
        
        uint256 maxNoOfCandidatesThatCanBeSelected; // the total number of candidates a voter can vote simultaneously in this position.
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

        uint256[] voteKeyList; // votes received
        mapping(uint256 => uint256) voteKeyIndexList; // vote key to index in voteKeyList
    }

    struct Voter {
        uint256 keyIndex;
        string name;
        string studentNo;

        uint256[] electionKeyList;
        mapping(uint256 => uint256) electionKeyIndexList; // electionKey to index in electionKeyList

        Vote[] voteKeyList;
        mapping(uint256 => uint256) voteKeyIndexList; // vote key to index in voteKeyList
    }

    struct Vote {
        uint256 keyIndex;
        uint256 electionKey;
        uint256 positionKey;
        uint256 candidateKey;
        uint256 voteKey;
        address voterKey;
    }

    struct Abstain {
        uint256 keyIndex;
        uint256 positionKey;

        uint256[] voteKeyList; // voters who voted for this particular abstain
        mapping(uint256 => uint256) voteKeyIndexList; // voter key to index in the voterKeyList
    }

    constructor(address adminKey, string memory name) public {
        addAdmin(adminKey, name);
    }

    function addAdmin(address adminKey, string memory name) public returns(address) {
        adminList[adminKey].name = name;
        adminList[adminKey].keyIndex = adminKeyList.push(adminKey).sub(1);

        return adminKey;
    }

    function addOfficial(address officialKey, string memory name) public returns(address) {
        officialList[officialKey].name = name;
        officialList[officialKey].keyIndex = officialKeyList.push(officialKey).sub(1);

        return officialKey;
    }

    function addElection(string memory name) public returns(uint256) {
        uint256 electionKey = genElectionKey();
        electionList[electionKey].name = name;
        electionList[electionKey].keyIndex = electionKeyList.push(electionKey).sub(1);
        
        return electionKey;
    }

    function addPositionAt(uint256 electionKey, string memory name, uint256 maxNoOfCandidatesThatCanBeSelected) public returns(uint256) {
        uint256 positionKey = genPositionKey();
        positionList[positionKey].name = name;
        positionList[positionKey].electionKey = electionKey;
        positionList[positionKey].maxNoOfCandidatesThatCanBeSelected = maxNoOfCandidatesThatCanBeSelected;
        positionList[positionKey].keyIndex = positionKeyList.push(positionKey).sub(1);

        electionList[electionKey].positionKeyIndexList[positionKey] = electionList[electionKey].positionKeyList.push(positionKey).sub(1);

        return positionKey;
    }

    function addCandidateAt(uint256 positionKey, string memory name) public returns(uint256) {
        uint256 candidateKey = genCandidateKey();
        candidateList[candidateKey].name = name;
        candidateList[candidateKey].positionKey = positionKey;
        candidateList[candidateKey].keyIndex = candidateKeyList.push(candidateKey).sub(1);

        positionList[positionKey].candidateKeyIndexList[candidateKey] = positionList[positionKey].candidateKeyList.push(candidateKey).sub(1);
       
        return candidateKey;
    }

    function addVoterAt(uint256 electionKey, address voterKey, string memory studentNo, string memory name) public electionKeyExists(electionKey) notVoterAt(electionKey, voterKey) returns(address){
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
        return voterKey;
    }

    function addAbstainAt(uint256 positionKey) public atMostOneAbstain(positionKey) returns(uint256) {
        uint256 abstainKey = genAbstainKey();
        abstainList[abstainKey].positionKey = positionKey;
        abstainList[abstainKey].keyIndex = abstainKeyList.push(abstainKey).sub(1);
        
        positionList[positionKey].abstainKey = abstainKey;
        positionList[positionKey].isAbstainActive = true;

        return abstainKey; 
    }

    function updateElection(uint256 electionKey, string memory newName) public onlyAdminAndOfficial electionKeyExists(electionKey) returns(bool) {
        electionList[electionKey].name = newName;
        return true;
    }

    function updatePosition(uint256 positionKey, string memory name, uint256 maxNoOfCandidatesThatCanBeSelected ) public positionKeyExists(positionKey) onlyAdminAndOfficial returns(bool) {
        positionList[positionKey].name = name;
        positionList[positionKey].maxNoOfCandidatesThatCanBeSelected = maxNoOfCandidatesThatCanBeSelected;
        return true;
    }

    // function updateCandidate(uint256 candidateKey, string memory name) public onlyAdminAndOfficial returns(bool) {
    //     candidateList[candidateKey].name = name;
    //     return true;
    // }

    // function updateAdmin(address adminKey, string memory name) public adminKeyExists(adminKey) onlySelf(adminKey) returns(bool) {
    //     adminList[adminKey].name = name;
    //     return true;
    // }

    // function updateOfficial(address officialKey, string memory name) public officialKeyExists(officialKey) onlySelf(officialKey) returns(bool) {
    //     officialList[officialKey].name = name;
    //     return true;
    // }

    // function updateVoter(address voterKey, string memory name, string memory studentNo) public voterKeyExists(voterKey) onlySelf(voterKey) returns(bool) {
    //     voterList[voterKey].name = name;
    //     voterList[voterKey].studentNo = studentNo;
    //     return true;
    // }

    function deleteAdmin(address adminKey) public adminKeyExists(adminKey) returns(uint256) {
        uint256 indexToDelete = adminList[adminKey].keyIndex;
        address keyToMove = adminKeyList[adminKeyList.length - 1];
        adminKeyList[indexToDelete] = keyToMove;
        adminList[keyToMove].keyIndex = indexToDelete;
        adminKeyList.length --;

        return indexToDelete; 
    }

    function deleteOfficial(address officialKey) public officialKeyExists(officialKey) returns(uint256) {
        uint256 indexToDelete = officialList[officialKey].keyIndex;
        address keyToMove = officialKeyList[officialKeyList.length - 1];
        officialKeyList[indexToDelete] = keyToMove;
        officialList[keyToMove].keyIndex = indexToDelete;
        officialKeyList.length --;

        return indexToDelete;
    }

    function deleteElection(uint256 electionKey) public electionKeyExists(electionKey) returns(uint256) {
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
        return indexToDelete;
    }

    function deleteCandidate(uint256 candidateKey) public candidateKeyExists(candidateKey) returns(uint256) {
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

        return 1;
    }

    function deletePosition(uint256 positionKey) public positionKeyExists(positionKey) returns(uint256) {
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

    }

    function deleteVoterAt(uint256 electionKey, address voterKey) public electionKeyExists(electionKey) voterKeyExistsAt(electionKey, voterKey) returns(uint256) {
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

    }

    function deleteAbstain(uint256 abstainKey) public returns(uint256) {
        uint256 indexToDelete = abstainList[abstainKey].keyIndex;
        uint256 keyToMove = abstainKeyList[abstainKeyList.length.sub(1)];
        abstainKeyList[indexToDelete] = keyToMove;
        abstainList[keyToMove].keyIndex = indexToDelete;
        abstainKeyList.length = abstainKeyList.length.sub(1);

        // it should also be deleted in the position it belongs to
        uint256 positionKey = abstainList[abstainKey].positionKey;
        positionList[positionKey].isAbstainActive = false;

        return indexToDelete;
    }

    function isAdmin(address adminKey) public view returns(bool) {
        if(adminKeyList.length == 0) return false;
        return adminKeyList[adminList[adminKey].keyIndex] == adminKey;
    }

    function isOfficial(address officialKey) public view returns(bool) {
        if(officialKeyList.length == 0) return false;
        return officialKeyList[officialList[officialKey].keyIndex] == officialKey;
    }

    function isElection(uint256 electionKey) public view returns(bool) {
        if(electionKeyList.length == 0) return false;
        return electionKeyList[electionList[electionKey].keyIndex] == electionKey;
    }

    function isElectionAt(address voterKey, uint256 electionKey) public view returns(bool) {
        Voter storage voter = voterList[voterKey];
        if(voter.electionKeyList.length == 0) return false;
        return voter.electionKeyList[voter.electionKeyIndexList[electionKey]] == electionKey;
    }

    function isPosition(uint256 positionKey) public view returns(bool) {
        if(positionKeyList.length == 0) return false;
        return positionKeyList[positionList[positionKey].keyIndex] == positionKey;
    }

    function isPositionAt(uint256 electionKey, uint256 positionKey) public view returns(bool) {
        Election storage election = electionList[electionKey];
        if(election.positionKeyList.length == 0) return false;
        return election.positionKeyList[election.positionKeyIndexList[positionKey]] == positionKey;
    }

    function isCandidate(uint256 candidateKey) public view returns(bool) {
        if(candidateKeyList.length == 0) return false;
        return candidateKeyList[candidateList[candidateKey].keyIndex] == candidateKey;
    }

    function isCandidateAt(uint256 positionKey, uint256 candidateKey) public view returns(bool) {
        Position storage position = positionList[positionKey];
        if(position.candidateKeyList.length == 0) return false;
        return position.candidateKeyList[position.candidateKeyIndexList[candidateKey]] == candidateKey;
    }

    function isVoter(address voterKey) public view returns(bool) {
        if(voterKeyList.length == 0) return false;
        return voterKeyList[voterList[voterKey].keyIndex] == voterKey;
    }

    function isVoterAt(uint256 electionKey, address voterKey) public view returns(bool) {
        Election storage election = electionList[electionKey];
        if(election.voterKeyList.length == 0) return false;
        return election.voterKeyList[election.voterKeyIndexList[voterKey]] == voterKey;
    }

    function isVote(uint256 voteKey) public view returns(bool) {
        if(voteKeyList.length == 0) return false;
        return voteKeyList[voteList[voteKey].keyIndex] == voteKey;
    }

    function isAbstain(uint256 abstainKey) public view returns(bool) {
        if(abstainKeyList.length == 0) return false;
        return abstainKeyList[abstainList[abstainKey].keyIndex] == abstainKey;
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

    function getElectionKeyAt(address voterKey, uint256 electionKeyIndex) public view returns(uint256) {
        return voterList[voterKey].electionKeyList[electionKeyIndex];
    }

    modifier onlyAdminAndOfficial() {
        require(isAdmin(msg.sender) || isOfficial(msg.sender), "Only admins and officials can invoke this method.");
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

    modifier onlySelf(address accountKey) {
        require(msg.sender == accountKey, "Only the owner of the account can change their profile.");
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

    modifier atMostOneAbstain(uint256 positionKey) {
        require(!positionList[positionKey].isAbstainActive, "The position already has an abstain option.");
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

    
    
}
