import cloneDeep from 'lodash/cloneDeep'

import { FETCH_ADMIN_LIST, ADD_ADMIN_VOTECHAIN, ADD_ADMIN_UI 
, EDIT_ADMIN_VOTECHAIN, EDIT_ADMIN_UI, DELETE_ADMIN_VOTECHAIN
, DELETE_ADMIN_UI } from '../actions/admin'

const initialState = {
  adminList: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_LIST: {
      return {
        ...state,
        adminList: action.payload.adminList,
      }
    }
    
    case ADD_ADMIN_VOTECHAIN: {
      return {
        ...state,
      }
    }

    case ADD_ADMIN_UI: {
      return {
        ...state,
        adminList: cloneDeep(state.adminList).concat(action.payload.addedAdmin)
      }
    }

    // case EDIT_ADMIN_VOTECHAIN: {
    //   return {
    //     ...state
    //   }
    // }

    // case EDIT_ADMIN_UI: {
    //   let adminListClone = cloneDeep(state.adminList)
    //   let index = adminListClone.findIndex(admin => admin.id === action.payload.editedAdmin.id)
    //   if(index !== -1){
    //     adminListClone[index] = action.payload.editedAdmin
    //   }

    //   return {
    //     ...state,
    //     adminList: adminListClone
    //   }
    // }


    // case DELETE_ADMIN_VOTECHAIN: {
    //   return {
    //     ...state
    //   }
    // }

    // case DELETE_ADMIN_UI: {
    //   let deletedIndex = state.adminList.findIndex(x => x.id === action.payload.deletedAdminKey)
      
    //   if(deletedIndex !== -1) {
    //     let adminListClone = cloneDeep(state.adminList)
    //     adminListClone.splice(deletedIndex, 1)

    //     return {
    //       ...state,
    //       adminList: adminListClone
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