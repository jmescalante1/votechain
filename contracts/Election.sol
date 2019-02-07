pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath";

contract Election {
    using SafeMath for uint256;
    
    uint256 private electionIdCounter = 0;
    uint256 private adminIdCounter = 0;
    uint256 private officialIdCounter = 0;

    struct Election {
        uint256 electionId;
        uint256 voterIdCounter = 0;
        mapping(uint256 => Voter) voterList; // voter id to Voter
        mapping(address => bool) isVoter;

        uint256 positionIdCounter = 0;
        string name;
        mapping(uint256 => Position) positionList; // position id to position 
    }

    struct Position {
        uint256 positionId;
        uint256 candidateIdCounter = 0;
        uint256 maxNoOfCandidateToVote = 1;
        string name;
        mapping(uint256 => Candidate) candidateList;
        mapping (address => uint256) noOfCandidatesVotedBy; // address of the voter -> no of candidates voted in this position
    }

    struct Candidate {
        uint256 positionId; // the position where this candidate can be elected
        uint256 candidateId;
        address[] storage hisVoters; // voters who voted for this candidate
        mapping(address => bool) hasBeenVotedBy; // determines whether or not this candidate has been voted by a voter
        string name;
        uint256 votesReceived;
    }

    struct Admin {
        uint256 adminId;
        uint256 studentId;
        string name;
    }

    struct Official {
        uint256 officialId;
        uint256 studentId;
        string name;
    }

    struct Voter {
        uint256[] electionsInvolved; // elections in which this voter is involved
        uint256 voterId;
        uint256 studentId;
        string name;  
    }

    /* a list of elections that can be accessed via Id*/
    mapping (uint256 => Election) public electionList;

    mapping(uint256 => Official) public officialList; // official id to Official
    mapping(uint256 => Admin) public adminList; // admin id to Admin

    mapping (address => bool) public isAdmin;
    mapping (address => bool) public isOfficial;
    mapping (address => bool) public isVoter;

    Voter[] voterList;

    mapping (address => Voter) voterList; // all voters in all elections

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only a voting admin can invoke this method");
        _;
    }

    modifier onlyOfficial() {
        require(isOfficial[msg.sender], "Only a voting official can invoke this method");
        _;
    }

    modifier onlyVoterInElection(electionId){
        require(electionList[electionId].isVoter[msg.sender], "The voter is not allowed to vote in this election");
        _;
    }

    modifier canVoteAnotherCandidate(electionId, positionId){
        Election election = electionList[electionId];
        Position position = election[positionId];

        require(position.noOfCandidatesVotedBy[msg.sender] < position.maxNumOfCandidateToVote, "The voter has exceeded the number of candidates allowed to be voted in this position: " + positionId);
    }

    modifier hasNotVotedThisCandidate(uint256 electionId, uint256 positionId, uint256 candidateId) {
        Election election = electionList[electionId];
        Position position = election.positionList[positionId];
        Candidate candidate = position.candidateList[candidateId];
        
        require(electionList[candidate.hasBeenVotedBy[msg.sender], "The voter already cast a vote for this candidate: " + candidateId);
        _;
    }

    constructor() public {
        isAdmin[msg.sender] = true;
        isOfficial[msg.sender] = true;
    }

    function addAdmin(address newAdmin, uint256 studentId, string memory name) public onlyAdmin {
        isAdmin[newAdmin] = true;
        Admin storage admin = Admin({adminId: adminIdCounter, studentId: studentId, name: name});
        adminList[adminIdCounter] = admin;

        officialAdminCounter = adminIdCounter.add(1);
        
        addOfficial(newAdmin, studentId, name); // an admin is an official also
    }

    function addOfficial(address newOfficial, uint256 studentId, string memory name) public onlyAdmin {
        isOfficial[newOfficial] = true;
        Official storage official = Official({officialId: officialIdCounter, studentId: studentId, name: name});

        officialList[officialIdCounter] = official;

        officialIdCounter = officialIdCounter.add(1);
    }

    function addVoter(address newVoter, uint256 electionId, uint256 studentId, string memory name) public onlyOfficial {
        Voter storage voter = Voter({voterId: voterIdCounter, studentId: studentId, name: name});
        voter.electionsInvolved.push(electionId);
        voterList[voterIdCounter] = voter;
        isVoter[msg.sender] = true;
        
        Election election = electionList[electionId];
        election.voterList[voterIdCounter] = voter;
        election.isVoter[msg.sender] = true;

        voterIdCounter = voterIdCounter.add(1);
    }

    function removeAdmin(address toRemove) public onlyAdmin {
        isAdmin[toRemove] = false;
    }

    function removeOfficial(address toRemove) public onlyAdmin {
        isOfficial[toRemove] = false;
    }

    function removeVoter(address toRemove) public onlyOfficial {
        isVoter[toRemove] = false;
    }


    function vote(uint256 electionId, uint256 positionId, uint256 candidateId) public onlyVoterInElection(electionId) canVoteAnotherCandidate(election, positionId) hasNotVotedThisCandidate(electionId, positionId, candidateId) {
        Election election = electionList[electionId];
        Position position = election.positionList[positionId];
        Candidate candidate = position.candidateList[candidateId];

        position.noOfCandidatesVotedBy[msg.sender].add(1);
        candidate.hasBeenVotedBy[msg.sender] = true;
        candidate.votesReceived.add(1);
    } 

    

}