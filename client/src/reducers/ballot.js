import { FETCH_ELECTION, CAST_BULK_VOTE_VOTECHAIN } from '../actions/ballot'

const initialState = {
  election: {},
  noOfPositions: 0,
  noOfCandidates: 0,
  noOfVoters: 0,
  noOfVotes: 0,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ELECTION: {
      return {
        ...state,
        election: action.payload.election
      }
    }
    
    case CAST_BULK_VOTE_VOTECHAIN: {
      return {
        ...state
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}
