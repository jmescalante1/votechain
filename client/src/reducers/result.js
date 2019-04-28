import { FETCH_FINISHED_ELECTION_RESULT, FETCH_FINISHED_ELECTION_LIST } from '../actions/result'

const initialState = {
  finishedElectionList: [],
  currentFinishedElection: {}
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_FINISHED_ELECTION_RESULT: {
      return {
        ...state,
        currentFinishedElection: action.payload.finishedElection
      }
    }

    case FETCH_FINISHED_ELECTION_LIST: {
      return {
        ...state,
        finishedElectionList: action.payload.finishedElectionList
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}