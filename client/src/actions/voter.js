async function getVoter(voterKey, votechain) {
  let response = await votechain.methods.voterList(voterKey).call()
  let voter = {}

  voter.id = voterKey
  voter.name = response.name
  voter.studentNo = response.studentNo

  return voter
}

export const FETCH_CURRENT_VOTER_LIST = 'FETCH_CURRENT_VOTER_LIST'
export const ADD_VOTER_VOTECHAIN = 'ADD_VOTER_VOTECHAIN'
export const ADD_VOTER_UI = 'ADD_VOTER_UI'
export const EDIT_VOTER_VOTECHAIN = 'EDIT_VOTER_VOTECHAIN'
export const EDIT_VOTER_UI = 'EDIT_VOTER_UI'
export const DELETE_VOTER_VOTECHAIN = 'DELETE_VOTER_VOTECHAIN'
export const DELETE_VOTER_UI = 'DELETE_VOTER_UI'

export function fetchCurrentVoterList(web3, votechain, electionKey) {
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

export function addVoterVotechain(web3, votechain, voter) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.addVoterAt(voter.electionKey, voter.voterKey, voter.studentNo, voter.name).send({from: firstAccount})
    
    dispatch( {
      type: ADD_VOTER_VOTECHAIN
    })
  }
}

export function addVoterUI(web3, votechain, voterKey, electionKey) {
  return async (dispatch) => {
    let addedVoter = await getVoter(voterKey, votechain)

    dispatch({
      type: ADD_VOTER_UI,
      payload: {addedVoter, electionKey}
    })
  }
}

export function editVoterVotechain(web3, votechain, voter){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updateVoter(voter.voterKey, voter.studentNo, voter.name).send({from: firstAccount})
    
    dispatch( {
      type: EDIT_VOTER_VOTECHAIN
    })
  }
}

export function editVoterUI(web3, votechain, voterKey){
  return async (dispatch) => {
    let editedVoter = await getVoter(voterKey, votechain)

    dispatch( {
      type: EDIT_VOTER_UI,
      editedVoter
    })
  }
}


export function deleteVoterVotechain(web3, votechain, electionKey, voterKey) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    await votechain.methods.deleteVoterAt(electionKey, voterKey).send({from: firstAccount})
  
    dispatch({
      type: DELETE_VOTER_VOTECHAIN,
    })
  }
}

export function deleteVoterUI(web3, votechain, voterKey) {
  return async (dispatch) => {
    let deletedVoterId = voterKey
    
    dispatch({
      type: DELETE_VOTER_UI,
      deletedVoterId
    })
  }
}