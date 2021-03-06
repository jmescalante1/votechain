import { getOfficial } from './read-votechain'

export const FETCH_OFFICIAL_LIST = 'FETCH_OFFICIAL_LIST'
export const ADD_OFFICIAL_VOTECHAIN = 'ADD_OFFICIAL_VOTECHAIN'
export const ADD_OFFICIAL_UI = 'ADD_OFFICIAL_UI'
export const EDIT_OFFICIAL_VOTECHAIN = 'EDIT_OFFICIAL_VOTECHAIN'
export const EDIT_OFFICIAL_UI = 'EDIT_OFFICIAL_UI'
export const DELETE_OFFICIAL_VOTECHAIN = 'DELETE_OFFICIAL_VOTECHAIN'
export const DELETE_OFFICIAL_UI = 'DELETE_OFFICIAL_UI'

export function fetchOfficialList(votechain) {
  return async (dispatch) => {
    const noOfOfficials = await votechain.methods.getNoOfOfficials().call()
    let officialList = []

    for(let i = 0; i < noOfOfficials; i++) {
      let officialKey = await votechain.methods.officialKeyList(i).call()
      let official = await getOfficial(officialKey, votechain)

      officialList.push(official)
    }

    dispatch({
      type: FETCH_OFFICIAL_LIST,
      payload: {officialList}
    })
  }
}

export function addOfficialVotechain(account, votechain, official) {
  return async (dispatch) => {
    await votechain.methods.addOfficial(official.officialKey, official.name).send({from: account})

    dispatch( {
      type: ADD_OFFICIAL_VOTECHAIN
    })
  }
}

export function addOfficialUI(votechain, officialKey) {
  return async (dispatch) => {
    let addedOfficial = await getOfficial(officialKey, votechain)

    dispatch({
      type: ADD_OFFICIAL_UI,
      payload: {addedOfficial}
    })
  }
}

export function editOfficialVotechain(account, votechain, official){
  return async (dispatch) => {
    await votechain.methods.updateOfficial(official.officialKey, official.name).send({from: account})
    
    dispatch( {
      type: EDIT_OFFICIAL_VOTECHAIN
    })
  }
}

export function editOfficialUI(votechain, officialKey){
  return async (dispatch) => {
    let editedOfficial = await getOfficial(officialKey, votechain)

    dispatch( {
      type: EDIT_OFFICIAL_UI,
      payload: {editedOfficial}
    })
  }
}


export function deleteOfficialVotechain(account, votechain, officialKey) {
  return async (dispatch) => {
    await votechain.methods.deleteOfficial(officialKey).send({from: account})
  
    dispatch({
      type: DELETE_OFFICIAL_VOTECHAIN,
    })
  }
}

export function deleteOfficialUI(officialKey) {
  return async (dispatch) => {
    let deletedOfficialKey = officialKey
    
    dispatch({
      type: DELETE_OFFICIAL_UI,
      payload: {deletedOfficialKey}
    })
  }
}