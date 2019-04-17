import { ADD_ELECTION } from '../actions/election'

const initialState = {
  
}


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ELECTION: {
      return {
        ...state,
      }
    }

    default: {
      return state
    }
  }
}