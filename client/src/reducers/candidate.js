import cloneDeep from 'lodash/cloneDeep'

import { FETCH_CURRENT_CANDIDATE_LIST, ADD_CANDIDATE_VOTECHAIN, ADD_CANDIDATE_UI 
, EDIT_CANDIDATE_VOTECHAIN, EDIT_CANDIDATE_UI, DELETE_CANDIDATE_VOTECHAIN
, DELETE_CANDIDATE_UI } from '../actions/candidate'

import { DELETE_ELECTION_UI } from '../actions/election'

import { DELETE_POSITION_UI } from '../actions/position'

const initialState = {
  currentCandidateList: [],
  currentPositionList: [],
  currentElectionKey: '' 
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_CANDIDATE_LIST: {
      return {
        ...state,
        currentCandidateList: action.payload.candidateList,
        currentPositionList: action.payload.positionList,
        currentElectionKey: action.payload.electionKey,
      }
    }
    
    case ADD_CANDIDATE_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_CANDIDATE_UI: {
      if(state.currentElectionKey === action.payload.electionKey) {
        return {
          ...state,
          currentCandidateList: cloneDeep(state.currentCandidateList).concat(action.payload.addedCandidate)
        }
      }

      return {
        ...state,
      }
    }

    case DELETE_POSITION_UI: {
      // delete all candidates with position key equal to the deleted position key
      let currentCandidateListClone = cloneDeep(state.currentCandidateList)
      let filtered = currentCandidateListClone.filter(candidate => candidate.positionId !== action.deletedPositionKey)
      console.log(filtered)
      return {
        ...state,
        currentCandidateList: filtered
      }
    }

    case EDIT_CANDIDATE_VOTECHAIN: {
      return {
        ...state
      }
    }

    case EDIT_CANDIDATE_UI: {
      let currentCandidateListClone = cloneDeep(state.currentCandidateList)
      let index = currentCandidateListClone.findIndex(candidate => candidate.id === action.editedCandidate.id)
      if(index !== -1){
        currentCandidateListClone[index] = action.editedCandidate
      }

      return {
        ...state,
        currentCandidateList: currentCandidateListClone
      }
    }

    // case DELETE_ELECTION_UI: {
    //   if(state.currentElectionKey === action.deletedElection.id){
    //     return {
    //       ...state,
    //       currentElectionKey: '',
    //       currentCandidateList: []
    //     }
    //   }

    //   return {
    //     ...state
    //   }
    // }

    case DELETE_CANDIDATE_VOTECHAIN: {
      return {
        ...state
      }
    }

    case DELETE_CANDIDATE_UI: {
      let deletedIndex = state.currentCandidateList.findIndex(x => x.id === action.deletedCandidateId)
      
      if(deletedIndex !== -1) {
        let positionListClone = cloneDeep(state.currentCandidateList)
        positionListClone.splice(deletedIndex, 1)

        return {
          ...state,
          currentCandidateList: positionListClone
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