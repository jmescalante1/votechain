import { FETCH_CURRENT_VOTE_LIST, FETCH_VOTES_OF_VOTER_IN_ELECTION } from '../actions/vote'

const initialState = {
  currentVoteList: [],
  currentElectionKey: '', 
  ballotOfAVoter: {},
  ballotElection: {},
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

    case FETCH_VOTES_OF_VOTER_IN_ELECTION: {
      return {
        ...state,
        ballotOfAVoter: action.payload.ballot,
        ballotElection: action.payload.election
      }
    }
    
    default: {
      return {
        ...state,
      }
    }
  }
}