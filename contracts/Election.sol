pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath";

contract Election {
    using SafeMath for uint256;
    
    uint256 private electionIdCounter = 0;
    uint256 private adminIdCounter = 0;
    uint256 private officialIdCounter = 0;
    uint256 private voterIdCounter = 0;

    struct Election {
        uint256 electionId;
        uint256 positionIdCounter = 0;
        string name;
        mapping(uint256 => Position) positionList;
    }

    struct Position {
        uint256 positionId;
        uint256 candidateIdCounter = 0;
        uint256 maxNumOfCandidateToVote = 1;
        string name;
        mapping(uint256 => Candidate) candidateList;        
    }

    struct Candidate {
        uint256 candidateId;
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
        mapping (uint256 => bool) canVoteInElection; // Id of the election in which he/she is involved
        uint256 voterId;
        uint256 studentId;
        string name;  
        mapping (uint256 => bool) hasVotedInPosition;
    }

    /* a list of elections that can be accessed via Id*/
    mapping (uint256 => Election) public electionList;

    mapping(address => Voter) public voterList;
    mapping(address => Official) public officialList;
    mapping(address => Admin) public adminList;

    mapping (address => bool) public isAdmin;
    mapping (address => bool) public isOfficial;
    mapping (address => bool) public isVoter;

    modifier onlyVoter {
        require(isVoter[msg.sender], "Only a voter can invoke this method");
        _;
    }

    modifier onlyAdmin {
        require(isAdmin[msg.sender], "Only a voting admin can invoke this method");
        _;
    }

    modifier onlyOfficial {
        require(isOfficial[msg.sender], "Only a voting official can invoke this method");
        _;
    }

    constructor() public {
        
    }


    function addOfficial(address official, string memory name, ) public onlyAdmin{

    }

    function addVoter(address voter)


}