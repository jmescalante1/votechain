import { GET_VOTECHAIN_CONTRACT, GET_VOTECHAIN_CONTRACT_ERROR } from '../actions/contract'

const initialState = {
  votechain: null,
  votechainError: ""
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_VOTECHAIN_CONTRACT: {
      return {
        ...state,
        votechain: action.votechain
      }
    }

    case GET_VOTECHAIN_CONTRACT_ERROR: {
      return {
        ...state,
        votechainError: action.votechainError
      }
    }

    default: {
      return state
    }
  }
}