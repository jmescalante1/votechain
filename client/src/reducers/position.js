import cloneDeep from 'lodash/cloneDeep'

import { FETCH_CURRENT_POSITION_LIST, ADD_POSITION_VOTECHAIN, ADD_POSITION_UI 
, EDIT_POSITION_VOTECHAIN, EDIT_POSITION_UI, DELETE_POSITION_VOTECHAIN
, DELETE_POSITION_UI } from '../actions/position'

import { DELETE_ELECTION_UI } from '../actions/election'

const initialState = {
  currentPositionList: [],
  currentElectionKey: '' 
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_POSITION_LIST: {
      return {
        ...state,
        currentPositionList: action.payload.positionList,
        currentElectionKey: action.payload.electionKey,
      }
    }
    
    case ADD_POSITION_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_POSITION_UI: {
      if(state.currentElectionKey === action.payload.electionKey) {
        return {
          ...state,
          currentPositionList: cloneDeep(state.currentPositionList).concat(action.payload.addedPosition)
        }
      }

      return {
        ...state,
      }
    }

    case EDIT_POSITION_VOTECHAIN: {
      return {
        ...state
      }
    }

    case EDIT_POSITION_UI: {
      let currentPositionListClone = cloneDeep(state.currentPositionList)
      let index = currentPositionListClone.findIndex(position => position.id === action.editedPosition.id)
      if(index !== -1){
        currentPositionListClone[index] = action.editedPosition
      }

      return {
        ...state,
        currentPositionList: currentPositionListClone
      }
    }

    case DELETE_ELECTION_UI: {
      if(state.currentElectionKey === action.deletedElection.id){
        return {
          ...state,
          currentElectionKey: '',
          currentPositionList: []
        }
      }

      return {
        ...state
      }
    }

    case DELETE_POSITION_VOTECHAIN: {
      return {
        ...state
      }
    }

    case DELETE_POSITION_UI: {
      let deletedIndex = state.currentPositionList.findIndex(x => x.id === action.deletedPosition.id)
      
      if(deletedIndex !== -1) {
        let positionListClone = cloneDeep(state.currentPositionList)
        positionListClone.splice(deletedIndex, 1)

        return {
          ...state,
          currentPositionList: positionListClone
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