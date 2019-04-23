async function getPosition(positionKey, votechain) {
  let response = await votechain.methods.positionList(positionKey).call()
  let position = {}

  position.id = positionKey
  position.name = response.name
  position.maxNoOfCandidatesThatCanBeSelected = response.maxNoOfCandidatesThatCanBeSelected
  position.hasAbstain = response.isAbstainActive

  return position
}

export const FETCH_CURRENT_POSITION_LIST = 'FETCH_CURRENT_POSITION_LIST'
export const ADD_POSITION_VOTECHAIN = 'ADD_POSITION_VOTECHAIN'
export const ADD_POSITION_UI = 'ADD_POSITION_UI'
export const EDIT_POSITION_VOTECHAIN = 'EDIT_POSITION_VOTECHAIN'
export const EDIT_POSITION_UI = 'EDIT_POSITION_UI'
export const DELETE_POSITION_VOTECHAIN = 'DELETE_POSITION_VOTECHAIN'
export const DELETE_POSITION_UI = 'DELETE_POSITION_UI'

export function fetchCurrentPositionList(votechain, electionKey) {
  return async (dispatch) => {
    const noOfPositions = await votechain.methods.getNoOfPositionsAt(electionKey).call()
    let positionList = []

    for(let i = 0; i < noOfPositions; i++) {
      let positionKey = await votechain.methods.getPositionKeyAt(electionKey, i).call()
      let position = await getPosition(positionKey, votechain)

      positionList.push(position)
    }

    dispatch({
      type: FETCH_CURRENT_POSITION_LIST,
      payload: {positionList, electionKey}
    })
  }
}

export function addPositionVotechain(account, votechain, position) {
  return async (dispatch) => {
    await votechain.methods.addPositionAt(position.electionKey, position.name, position.maxNoOfCandidatesThatCanBeSelected, position.hasAbstain).send({from: account})
    
    dispatch( {
      type: ADD_POSITION_VOTECHAIN
    })
  }
}

export function addPositionUI(votechain, positionKey, electionKey) {
  return async (dispatch) => {
    let addedPosition = await getPosition(positionKey, votechain)

    dispatch({
      type: ADD_POSITION_UI,
      payload: {addedPosition, electionKey}
    })
  }
}

export function editPositionVotechain(account, votechain, position){
  return async (dispatch) => {
    await votechain.methods.updatePosition(position.positionKey, position.name, position.maxNoOfCandidatesThatCanBeSelected, position.hasAbstain).send({from: account})
    
    dispatch( {
      type: EDIT_POSITION_VOTECHAIN
    })
  }
}

export function editPositionUI(votechain, positionKey){
  return async (dispatch) => {
    let editedPosition = await getPosition(positionKey, votechain)

    dispatch( {
      type: EDIT_POSITION_UI,
      editedPosition
    })
  }
}


export function deletePositionVotechain(account, votechain, positionKey) {
  return async (dispatch) => {
    await votechain.methods.deletePosition(positionKey).send({from: account})
  
    dispatch({
      type: DELETE_POSITION_VOTECHAIN,
    })
  }
}

export function deletePositionUI(votechain, positionKey) {
  return async (dispatch) => {
    let deletedPosition = await getPosition(positionKey, votechain)
    let deletedPositionKey = positionKey
    dispatch({
      type: DELETE_POSITION_UI,
      deletedPosition,
      deletedPositionKey
    })
  }
}