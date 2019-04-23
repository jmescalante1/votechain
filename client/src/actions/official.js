async function getOfficial(officialKey, votechain) {
  let response = await votechain.methods.officialList(officialKey).call()
  let official = {}

  official.id = officialKey
  official.name = response.name

  return official
}

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

export function addOfficialVotechain(web3, votechain, official) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.addOfficial(official.officialKey, official.name).send({from: firstAccount})
    console.log(official)

    dispatch( {
      type: ADD_OFFICIAL_VOTECHAIN
    })
  }
}

export function addOfficialUI(web3, votechain, officialKey) {
  return async (dispatch) => {
    let addedOfficial = await getOfficial(officialKey, votechain)

    dispatch({
      type: ADD_OFFICIAL_UI,
      payload: {addedOfficial}
    })
  }
}

export function editOfficialVotechain(web3, votechain, official){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updateOfficial(official.officialKey, official.name).send({from: firstAccount})
    
    dispatch( {
      type: EDIT_OFFICIAL_VOTECHAIN
    })
  }
}

export function editOfficialUI(web3, votechain, officialKey){
  return async (dispatch) => {
    let editedOfficial = await getOfficial(officialKey, votechain)

    dispatch( {
      type: EDIT_OFFICIAL_UI,
      payload: {editedOfficial}
    })
  }
}


export function deleteOfficialVotechain(web3, votechain, officialKey) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    await votechain.methods.deleteOfficial(officialKey).send({from: firstAccount})
  
    dispatch({
      type: DELETE_OFFICIAL_VOTECHAIN,
    })
  }
}

export function deleteOfficialUI(web3, votechain, officialKey) {
  return async (dispatch) => {
    let deletedOfficialKey = officialKey
    
    dispatch({
      type: DELETE_OFFICIAL_UI,
      payload: {deletedOfficialKey}
    })
  }
}