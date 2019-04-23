import { CHANGE_ACCOUNT } from '../actions/account'

const initialState = {
  account: ''
}

export default function reducer(state = initialState, action){
  switch(action.type) {
    case CHANGE_ACCOUNT: {
      return {
        ...state,
        account: action.payload.account
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}