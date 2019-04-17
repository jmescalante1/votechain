import { GET_WEB3, GET_WEB3_ERROR } from '../actions/web3'

const initialState = {
  web3: null,
  web3Error: ""
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_WEB3: {
      return {
        ...state,
        web3: action.web3
      }
    }

    case GET_WEB3_ERROR: {
      return {
        ...state,
        web3Error: action.web3Error
      }
    }

    default: {
      return state
    }
  }
}