import { FETCH_ELECTION, CAST_BULK_VOTE_VOTECHAIN, FETCH_BALLOT_LIST } from '../actions/ballot'

const initialState = {
  election: {},
  ballotList: [],
  loading: false,
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
        ...state,
        loading: false
      }
    }

    // case CAST_BULK_VOTE_VOTECHAIN_PENDING: {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }

    case FETCH_BALLOT_LIST: {
      return {
        ...state,
        ballotList: action.payload.ballotList
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}
