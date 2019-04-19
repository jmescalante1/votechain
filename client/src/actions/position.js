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

export function fetchCurrentPositionList(web3, votechain, electionKey) {
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

export function addPositionVotechain(web3, votechain, position) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.addPositionAt(position.electionKey, position.name, position.maxNoOfCandidatesThatCanBeSelected, position.hasAbstain).send({from: firstAccount})
    
    dispatch( {
      type: ADD_POSITION_VOTECHAIN
    })
  }
}

export function addPositionUI(web3, votechain, positionKey, electionKey) {
  return async (dispatch) => {
    let addedPosition = await getPosition(positionKey, votechain)

    dispatch({
      type: ADD_POSITION_UI,
      payload: {addedPosition, electionKey}
    })
  }
}

export function editPositionVotechain(web3, votechain, position){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updatePosition(position.positionKey, position.name, position.maxNoOfCandidatesThatCanBeSelected, position.hasAbstain).send({from: firstAccount})
    
    dispatch( {
      type: EDIT_POSITION_VOTECHAIN
    })
  }
}

export function editPositionUI(web3, votechain, positionKey){
  return async (dispatch) => {
    let editedPosition = await getPosition(positionKey, votechain)

    dispatch( {
      type: EDIT_POSITION_UI,
      editedPosition
    })
  }
}