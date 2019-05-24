import { FETCH_CURRENT_VOTE_LIST, FETCH_VOTES_OF_VOTER_IN_ELECTION, FETCH_VOTES_OF_VOTER_IN_ELECTION_PENDING } from '../actions/vote'


const initialState = {
  currentVoteList: [],
  currentElectionKey: '', 
  ballotOfAVoter: {},
  ballotElection: {},
  fetchVotesOfVoterInElectionLoading: false, 
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_VOTE_LIST: {
      return {
        ...state,
        currentVoteList: action.payload.voteList,
        currentElectionKey: action.payload.electionKey,
      }
    }

    case FETCH_VOTES_OF_VOTER_IN_ELECTION_PENDING: {
      return {
        ...state,
        fetchVotesOfVoterInElectionLoading: true
      }
    }

    case FETCH_VOTES_OF_VOTER_IN_ELECTION: {
      return {
        ...state,
        ballotOfAVoter: action.payload.ballot,
        ballotElection: action.payload.election,
        fetchVotesOfVoterInElectionLoading: false
      }
    }
    
    default: {
      return {
        ...state,
      }
    }
  }
}