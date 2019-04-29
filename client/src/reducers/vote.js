import { FETCH_CURRENT_VOTE_LIST } from '../actions/vote'

const initialState = {
  currentVoteList: [],
  currentElectionKey: '' 
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
    
    default: {
      return {
        ...state
      }
    }
  }
}