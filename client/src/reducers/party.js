import cloneDeep from 'lodash/cloneDeep'

import { FETCH_CURRENT_PARTY_LIST, ADD_PARTY_VOTECHAIN, ADD_PARTY_UI 
, EDIT_PARTY_VOTECHAIN, EDIT_PARTY_UI, DELETE_PARTY_VOTECHAIN
, DELETE_PARTY_UI } from '../actions/party'

import { DELETE_ELECTION_UI } from '../actions/election'

const initialState = {
  currentPartyList: [],
  currentElectionKey: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_PARTY_LIST: {
      return {
        ...state,
        currentPartyList: action.payload.partyList,
        currentElectionKey: action.payload.electionKey,
      }
    }
    
    case ADD_PARTY_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_PARTY_UI: {
      if(state.currentElectionKey === action.payload.electionKey) {
        return {
          ...state,
          currentPartyList: cloneDeep(state.currentPartyList).concat(action.payload.addedParty)
        }
      }

      return {
        ...state,
      }
    }

    case EDIT_PARTY_VOTECHAIN: {
      return {
        ...state
      }
    }

    case EDIT_PARTY_UI: {
      let currentPartyListClone = cloneDeep(state.currentPartyList)
      let index = currentPartyListClone.findIndex(party => party.id === action.payload.editedParty.id)
      if(index !== -1){
        currentPartyListClone[index] = action.payload.editedParty
      }

      return {
        ...state,
        currentPartyList: currentPartyListClone
      }
    }

    case DELETE_ELECTION_UI: {
      if(state.currentElectionKey === action.deletedElection.id){
        return {
          ...state,
          currentElectionKey: '',
          currentPartyList: []
        }
      }

      return {
        ...state
      }
    }

    case DELETE_PARTY_VOTECHAIN: {
      return {
        ...state
      }
    }

    case DELETE_PARTY_UI: {
      let deletedIndex = state.currentPartyList.findIndex(x => x.id === action.payload.deletedParty.id)
      
      if(deletedIndex !== -1) {
        let partyListClone = cloneDeep(state.currentPartyList)
        partyListClone.splice(deletedIndex, 1)

        return {
          ...state,
          currentPartyList: partyListClone
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