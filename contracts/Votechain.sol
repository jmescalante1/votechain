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
    }

    struct Candidate {
        uint256 keyIndex;
        string name;

        uint256 positionKey;

        address[] voterKeyList; // voters who vote for this candidate
        mapping(address => uint256) voterKeyIndexList; // voter key to index in voterKeyIndexList
    }

    struct Voter {
        uint256 keyIndex;
        string name;
        string studentNo;

        uint256 electionKey;

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

        address[] voterKeyList; // voters who voted for this particular abstain
        mapping(address => uint256) voterKeyIndexList; // voter key to index in the voterKeyList
    }


    function addElection(string memory name) public returns(uint256) {
        uint256 newKey = genElectionKey();
        electionList[newKey].name = name;
        electionList[newKey].keyIndex = electionKeyList.push(newKey) - 1;
        
        return newKey;
    }

    function addPosition(uint256 electionKey, string memory name, uint256 maxNoOfCandidatesThatCanBeSelected) public returns(uint256) {
        uint256 positionKey = genPositionKey();
        positionList[positionKey].name = name;
        positionList[positionKey].electionKey = electionKey;
        positionList[positionKey].maxNoOfCandidatesThatCanBeSelected = maxNoOfCandidatesThatCanBeSelected;
        positionList[positionKey].keyIndex = positionKeyList.push(positionKey) - 1;

        electionList[electionKey].positionKeyIndexList[positionKey] = electionList[electionKey].positionKeyList.push(positionKey) - 1;

        return positionKey;
    }

    function addCandidate(uint256 positionKey, string memory name) public returns(uint256) {
        uint256 candidateKey = genCandidateKey();
        candidateList[candidateKey].name = name;
        candidateList[candidateKey].positionKey = positionKey;
        candidateList[candidateKey].keyIndex = candidateKeyList.push(candidateKey) - 1;

        positionList[positionKey].candidateKeyIndexList[candidateKey] = positionList[positionKey].candidateKeyList.push(candidateKey) - 1;
        return candidateKey;
    }

    function addVoter(address voterKey, uint256 electionKey, string memory studentNo, string memory name) public returns(address){
        voterList[voterKey].electionKey = electionKey;
        voterList[voterKey].studentNo = studentNo;
        voterList[voterKey].name = name;
        voterList[voterKey].keyIndex = voterKeyList.push(voterKey) - 1;

        electionList[electionKey].voterKeyIndexList[voterKey] = electionList[electionKey].voterKeyList.push(voterKey) - 1;
        return voterKey;
    }

    function addAbstain(uint256 positionKey) public returns(uint256) {
        uint256 abstainKey = genAbstainKey();
        abstainList[abstainKey].positionKey = positionKey;
        abstainList[abstainKey].keyIndex = abstainKeyList.push(abstainKey) - 1;
        
        positionList[positionKey].abstainKey = abstainKey;

        return abstainKey; // a value of 0 means it does not exist
    }

    function isElection(uint256 electionKey) public view returns(bool) {
        if(electionKeyList.length == 0) return false;
        return electionKeyList[electionList[electionKey].keyIndex] == electionKey;
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
        if(position.abstainKey == 0) return false;
        return position.abstainKey == abstainKey;
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
}
