import cloneDeep from 'lodash/cloneDeep'

import { FETCH_CURRENT_VOTER_LIST, ADD_VOTER_VOTECHAIN, ADD_VOTER_UI 
, EDIT_VOTER_VOTECHAIN, EDIT_VOTER_UI, DELETE_VOTER_VOTECHAIN
, DELETE_VOTER_UI } from '../actions/voter'

import { DELETE_ELECTION_UI } from '../actions/election'

const initialState = {
  currentVoterList: [],
  currentElectionKey: '' 
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_VOTER_LIST: {
      return {
        ...state,
        currentVoterList: action.payload.voterList,
        currentElectionKey: action.payload.electionKey,
      }
    }
    
    case ADD_VOTER_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_VOTER_UI: {
      if(state.currentElectionKey === action.payload.electionKey) {
        return {
          ...state,
          currentVoterList: cloneDeep(state.currentVoterList).concat(action.payload.addedVoter)
        }
      }

      return {
        ...state,
      }
    }

    // case EDIT_VOTER_VOTECHAIN: {
    //   return {
    //     ...state
    //   }
    // }

    // case EDIT_VOTER_UI: {
    //   let currentVoterListClone = cloneDeep(state.currentVoterList)
    //   let index = currentVoterListClone.findIndex(position => position.id === action.editedVoter.id)
    //   if(index !== -1){
    //     console.log(index)
    //     currentVoterListClone[index] = action.editedVoter
    //   }

    //   return {
    //     ...state,
    //     currentVoterList: currentVoterListClone
    //   }
    // }

    // case DELETE_ELECTION_UI: {
    //   if(state.currentElectionKey === action.deletedElection.id){
    //     return {
    //       ...state,
    //       currentElectionKey: '',
    //       currentVoterList: []
    //     }
    //   }

    //   return {
    //     ...state
    //   }
    // }

    // case DELETE_VOTER_VOTECHAIN: {
    //   return {
    //     ...state
    //   }
    // }

    // case DELETE_VOTER_UI: {
    //   let deletedIndex = state.currentVoterList.findIndex(x => x.id === action.deletedVoter.id)
      
    //   if(deletedIndex !== -1) {
    //     let positionListClone = cloneDeep(state.currentVoterList)
    //     positionListClone.splice(deletedIndex, 1)

    //     return {
    //       ...state,
    //       currentVoterList: positionListClone
    //     }
    //   }

    //   return {
    //     ...state
    //   }
    // }
  
    default: {
      return {
        ...state
      }
    }
  }
}