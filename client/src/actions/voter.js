import { getVoter } from './read-votechain'

export const FETCH_CURRENT_VOTER_LIST = 'FETCH_CURRENT_VOTER_LIST'
export const ADD_VOTER_VOTECHAIN = 'ADD_VOTER_VOTECHAIN'
export const ADD_VOTER_UI = 'ADD_VOTER_UI'
export const EDIT_VOTER_VOTECHAIN = 'EDIT_VOTER_VOTECHAIN'
export const EDIT_VOTER_UI = 'EDIT_VOTER_UI'
export const DELETE_VOTER_VOTECHAIN = 'DELETE_VOTER_VOTECHAIN'
export const DELETE_VOTER_UI = 'DELETE_VOTER_UI'

export function fetchCurrentVoterList(votechain, electionKey) {
  return async (dispatch) => {
    const noOfVoters = await votechain.methods.getNoOfVotersAt(electionKey).call()
    let voterList = []

    for(let i = 0; i < noOfVoters; i++) {
      let voterKey = await votechain.methods.getVoterKeyAt(electionKey, i).call()
      let voter = await getVoter(voterKey, votechain)

      voterList.push(voter)
    }

    dispatch({
      type: FETCH_CURRENT_VOTER_LIST,
      payload: {voterList, electionKey}
    })
  }
}

export function addVoterVotechain(account, votechain, voter) {
  return async (dispatch) => {
    await votechain.methods.addVoterAt(voter.electionKey, voter.voterKey, voter.studentNo, voter.name).send({from: account})
    
    dispatch( {
      type: ADD_VOTER_VOTECHAIN
    })
  }
}

export function addVoterUI(votechain, voterKey, electionKey) {
  return async (dispatch) => {
    let addedVoter = await getVoter(voterKey, votechain)

    dispatch({
      type: ADD_VOTER_UI,
      payload: {addedVoter, electionKey}
    })
  }
}

export function editVoterVotechain(account, votechain, voter){

  return async (dispatch) => {
    await votechain.methods.updateVoter(voter.voterKey, voter.studentNo, voter.name).send({from: account})
    
    dispatch( {
      type: EDIT_VOTER_VOTECHAIN
    })
  }
}

export function editVoterUI(votechain, voterKey){
  return async (dispatch) => {
    let editedVoter = await getVoter(voterKey, votechain)

    dispatch( {
      type: EDIT_VOTER_UI,
      editedVoter
    })
  }
}


export function deleteVoterVotechain(account, votechain, electionKey, voterKey) {
  return async (dispatch) => {
    await votechain.methods.deleteVoterAt(electionKey, voterKey).send({from: account})
  
    dispatch({
      type: DELETE_VOTER_VOTECHAIN,
    })
  }
}

export function deleteVoterUI(voterKey) {
  return async (dispatch) => {
    let deletedVoterId = voterKey
    
    dispatch({
      type: DELETE_VOTER_UI,
      deletedVoterId
    })
  }
}