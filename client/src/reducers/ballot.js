import { FETCH_ELECTION } from '../actions/ballot'

const initialState = {
  election: {},
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ELECTION: {
      return {
        ...state,
        election: action.payload.election
      }
    }
    
    default: {
      return {
        ...state
      }
    }
  }
}
