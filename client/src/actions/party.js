async function getParty(partyKey, votechain) {
  let response = await votechain.methods.partyList(partyKey).call()
  let party = {}

  party.id = Number(partyKey)
  party.electionId = Number(response.electionKey)
  party.name = response.name

  return party
}

export const FETCH_CURRENT_PARTY_LIST = 'FETCH_CURRENT_PARTY_LIST'
export const ADD_PARTY_VOTECHAIN = 'ADD_PARTY_VOTECHAIN'
export const ADD_PARTY_UI = 'ADD_PARTY_UI'
export const EDIT_PARTY_VOTECHAIN = 'EDIT_PARTY_VOTECHAIN'
export const EDIT_PARTY_UI = 'EDIT_PARTY_UI'
export const DELETE_PARTY_VOTECHAIN = 'DELETE_PARTY_VOTECHAIN'
export const DELETE_PARTY_UI = 'DELETE_PARTY_UI'

export function fetchCurrentPartyList(votechain, electionKey) {
  return async (dispatch) => {
    const noOfParties = await votechain.methods.getNoOfParties().call()
    let partyList = []

    for(let partyIndex = 0; partyIndex < noOfParties; partyIndex++) {
      let partyKey = await votechain.methods.partyKeyList(partyIndex).call()
      let party = await getParty(partyKey, votechain)

      if(electionKey === party.electionId) {
        partyList.push(party);
      }
    }

    dispatch({
      type: FETCH_CURRENT_PARTY_LIST,
      payload: {partyList, electionKey}
    })
  }
}

export function addPartyVotechain(account, votechain, party) {
  return async (dispatch) => {
    await votechain.methods.addPartyAt(party.electionKey, party.name).send({from: account})
    
    dispatch( {
      type: ADD_PARTY_VOTECHAIN
    })
  }
}

export function addPartyUI(votechain, partyKey, electionKey) {
  return async (dispatch) => {
    let addedParty = await getParty(partyKey, votechain)

    dispatch({
      type: ADD_PARTY_UI,
      payload: {addedParty, electionKey}
    })
  }
}

export function editPartyVotechain(account, votechain, party){
  return async (dispatch) => {
    await votechain.methods.updateParty(party.partyKey, party.name).send({from: account})
    
    dispatch( {
      type: EDIT_PARTY_VOTECHAIN
    })
  }
}

export function editPartyUI(votechain, partyKey){
  return async (dispatch) => {
    let editedParty = await getParty(partyKey, votechain)

    dispatch( {
      type: EDIT_PARTY_UI,
      payload: {editedParty}
    })
  }
}


export function deletePartyVotechain(account, votechain, partyKey) {
  return async (dispatch) => {
    await votechain.methods.deleteParty(partyKey).send({from: account})
  
    dispatch({
      type: DELETE_PARTY_VOTECHAIN,
    })
  }
}

export function deletePartyUI(votechain, partyKey) {
  return async (dispatch) => {
    let deletedParty = await getParty(partyKey, votechain)
    let deletedPartyKey = partyKey
    dispatch({
      type: DELETE_PARTY_UI,
      payload: {deletedParty, deletedPartyKey}
    })
  }
}