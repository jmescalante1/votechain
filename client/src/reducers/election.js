import cloneDeep from 'lodash/cloneDeep'

import { ADD_ELECTION_VOTECHAIN, ADD_ELECTION_VOTECHAIN_ERROR, FETCH_ELECTION_LIST 
  , ADD_ELECTION_UI } from '../actions/election'


const initialState = {
  electionList: [],
  addElectionError: ''
}


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ELECTION_VOTECHAIN: {
      return {
        ...state,
        addElectionError: ''
      }
    }

    case ADD_ELECTION_VOTECHAIN_ERROR: {
      return {
        ...state,
        addElectionError: action.addElectionError
      }
    }

    case ADD_ELECTION_UI: {
      return {
        ...state,
        electionList: cloneDeep(state.electionList).concat(action.addedElection)
      }
    }

    case FETCH_ELECTION_LIST: {
      return {
        ...state,
        electionList: action.payload
      }
    }

    default: {
      return state
    }
  }
}