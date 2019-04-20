import cloneDeep from 'lodash/cloneDeep'

import { ADD_ELECTION_VOTECHAIN, ADD_ELECTION_VOTECHAIN_ERROR, FETCH_ELECTION_LIST 
  , ADD_ELECTION_UI, EDIT_ELECTION_VOTECHAIN, EDIT_ELECTION_UI
  , DELETE_ELECTION_VOTECHAIN, DELETE_ELECTION_UI, START_ELECTION_VOTECHAIN 
  , START_ELECTION_UI } from '../actions/election'


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

    case EDIT_ELECTION_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case EDIT_ELECTION_UI: {
      let editedIndex = state.electionList.findIndex(x => x.id === action.editedElection.id)
      let electionListClone = cloneDeep(state.electionList)
      electionListClone[editedIndex] = action.editedElection
      return {
        ...state,
        electionList: electionListClone
      }
    }

    case DELETE_ELECTION_UI: {
      let deletedIndex = state.electionList.findIndex(x => x.id === action.deletedElection.id)

      if(deletedIndex !== -1){
        let electionListClone = cloneDeep(state.electionList)
        electionListClone.splice(deletedIndex, 1)

        return {
          ...state,
          electionList: electionListClone
        }
      }

      return {
        ...state
      }

    }

    case DELETE_ELECTION_VOTECHAIN: {
      return {
        ...state
      }
    }

    case START_ELECTION_VOTECHAIN: {
      return {
        ...state
      }
    }

    case START_ELECTION_UI: {
      let startedIndex = state.electionList.findIndex(x => x.id === action.payload.startedElection.id)

      if(startedIndex !== -1){
        let electionListClone = cloneDeep(state.electionList)
        electionListClone[startedIndex] = action.payload.startedElection

        return {
          ...state,
          electionList: electionListClone
        }
      }

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