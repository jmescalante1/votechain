import { SET_ACCOUNT, GET_ACCOUNT_DETAILS } from '../actions/account'
import { EDIT_ADMIN_UI } from '../actions/admin'
import { EDIT_OFFICIAL_UI } from '../actions/official'
import { EDIT_VOTER_UI } from '../actions/voter'

const initialState = {
  account: '',
  profile: {},
}

export default function reducer(state = initialState, action){
  switch(action.type) {
    case SET_ACCOUNT: {
      return {
        ...state,
        account: action.payload.account
      }
    }

    case GET_ACCOUNT_DETAILS: {
      return {
        ...state,
        profile: action.payload.profile
      }
    }

    case EDIT_ADMIN_UI: {
      if(state.profile.accountAddress.toLowerCase() === action.payload.editedAdmin.id.toLowerCase()){
        return {
          ...state,
          profile: {...state.profile, name: action.payload.editedAdmin.name}
        }
      }
      return {
        ...state
      }
    }

    case EDIT_OFFICIAL_UI: {
      if(state.profile.accountAddress.toLowerCase() === action.payload.editedOfficial.id.toLowerCase()){
        return {
          ...state,
          profile: {...state.profile, name: action.payload.editedOfficial.name}
        }
      }
      return {
        ...state
      }
    }

    case EDIT_VOTER_UI: {
      if(state.profile.accountAddress.toLowerCase() === action.editedVoter.id.toLowerCase()){
        return {
          ...state,
          profile: {...state.profile, 
            name: action.editedVoter.name,
            studentNo: action.editedVoter.studentNo
          },
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