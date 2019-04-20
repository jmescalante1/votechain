import cloneDeep from 'lodash/cloneDeep'

import { FETCH_OFFICIAL_LIST, ADD_OFFICIAL_VOTECHAIN, ADD_OFFICIAL_UI 
, EDIT_OFFICIAL_VOTECHAIN, EDIT_OFFICIAL_UI, DELETE_OFFICIAL_VOTECHAIN
, DELETE_OFFICIAL_UI } from '../actions/official'

const initialState = {
  officialList: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OFFICIAL_LIST: {
      return {
        ...state,
        officialList: action.payload.officialList,
      }
    }
    
    case ADD_OFFICIAL_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_OFFICIAL_UI: {
      return {
        ...state,
        officialList: cloneDeep(state.officialList).concat(action.payload.addedOfficial)
      }
    }

    case EDIT_OFFICIAL_VOTECHAIN: {
      return {
        ...state
      }
    }

    case EDIT_OFFICIAL_UI: {
      let officialListClone = cloneDeep(state.officialList)
      let index = officialListClone.findIndex(official => official.id === action.payload.editedOfficial.id)
      if(index !== -1){
        officialListClone[index] = action.payload.editedOfficial
      }

      return {
        ...state,
        officialList: officialListClone
      }
    }


    case DELETE_OFFICIAL_VOTECHAIN: {
      return {
        ...state
      }
    }

    case DELETE_OFFICIAL_UI: {
      let deletedIndex = state.officialList.findIndex(x => x.id === action.payload.deletedOfficialKey)
      
      if(deletedIndex !== -1) {
        let officialListClone = cloneDeep(state.officialList)
        officialListClone.splice(deletedIndex, 1)

        return {
          ...state,
          officialList: officialListClone
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