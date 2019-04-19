import cloneDeep from 'lodash/cloneDeep'

import { FETCH_CURRENT_POSITION_LIST, ADD_POSITION_VOTECHAIN, ADD_POSITION_UI } from '../actions/position'

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
  
    default: {
      return state
    }
  }
}