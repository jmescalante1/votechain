import { getElection, getElectionDetails } from './read-votechain'

export const ADD_ELECTION_VOTECHAIN = 'ADD_ELECTION_VOTECHAIN'
export const ADD_ELECTION_VOTECHAIN_ERROR = 'ADD_ELECTION_VOTECHAIN_ERROR'
export const FETCH_ELECTION_LIST = 'FETCH_ELECTION_LIST'
export const ADD_ELECTION_UI = 'ADD_ELECTION_UI'
export const EDIT_ELECTION_VOTECHAIN = 'EDIT_ELECTION_VOTECHAIN'
export const EDIT_ELECTION_UI = 'EDIT_ELECTION_UI'
export const DELETE_ELECTION_VOTECHAIN = 'DELETE_ELECTION_VOTECHAIN'
export const DELETE_ELECTION_UI = 'DELETE_ELECTION_UI'
export const START_ELECTION_VOTECHAIN = 'START_ELECTION_VOTECHAIN'
export const START_ELECTION_UI = 'START_ELECTION_UI'
export const STOP_ELECTION_VOTECHAIN = 'STOP_ELECTION_VOTECHAIN'
export const STOP_ELECTION_UI = 'STOP_ELECTION_UI'
export const FETCH_ELECTION_DETAILS = 'FETCH_ELECTION_DETAILS'

export function addElectionVotechain(account, votechain, electionName){
  return async (dispatch) =>  { 

      function onSuccess() {
        dispatch({
          type: ADD_ELECTION_VOTECHAIN,
        })
      }

      function onError(error) {
        dispatch({
          type: ADD_ELECTION_VOTECHAIN_ERROR,
          addElectionError: error
        })
      }
      
      try {
        await votechain.methods.addElection(electionName).send({from: account})
        onSuccess()
      } catch (error) {
        onError(error)
      }
  }
}

export function addElectionUI(votechain, electionKey){
  return async (dispatch) =>  { 
    let addedElection = await getElection(electionKey, votechain)
    
    dispatch({
      type: ADD_ELECTION_UI,
      addedElection
    })
  }
}

export function fetchElectionList(votechain) {
  return async (dispatch) => {
    const noOfElections = await votechain.methods.getNoOfElections().call()
 
    let electionList = []

    for(let i = 0; i < noOfElections; i++){
      let electionKey = await votechain.methods.electionKeyList(i).call()
      let election = await getElection(electionKey, votechain)

      electionList.push(election)
    }

    dispatch({
      type: FETCH_ELECTION_LIST,
      payload: electionList
    })
  }
}

export function editElectionVotechain(account, votechain, election) {
  return async (dispatch) => {
    await votechain.methods.updateElection(election.id, election.name).send({from: account})
  
    dispatch({
      type: EDIT_ELECTION_VOTECHAIN,
    })
  }
}

export function editElectionUI(votechain, electionKey) {
  return async (dispatch) => {
    let editedElection = await getElection(electionKey, votechain)

    dispatch({
      type: EDIT_ELECTION_UI,
      editedElection
    })
  }
}

export function deleteElectionUI(votechain, electionKey) {
  return async (dispatch) => {
    let deletedElection = await getElection(electionKey, votechain)

    dispatch({
      type: DELETE_ELECTION_UI,
      deletedElection
    })
  }
}

export function deleteElectionVotechain(account, votechain, electionKey) {
  return async (dispatch) => {
    await votechain.methods.deleteElection(electionKey).send({from: account})
  
    dispatch({
      type: DELETE_ELECTION_VOTECHAIN,
    })
  }
}

export function startElectionVotechain(account, votechain, electionKey) {
  return async (dispatch) => {
    await votechain.methods.startElection(electionKey).send({from: account})

    dispatch({
      type: START_ELECTION_VOTECHAIN
    })
  }
}

export function startElectionUI(votechain, electionKey) {
  return async (dispatch) => {
    let startedElection = await getElection(electionKey, votechain)

    dispatch({
      type: START_ELECTION_UI,
      payload: {startedElection}
    })
  }
}

export function stopElectionVotechain(account, votechain, electionKey) {
  return async (dispatch) => {
    await votechain.methods.stopElection(electionKey).send({from: account})

    dispatch({
      type: STOP_ELECTION_VOTECHAIN
    })
  }
}

export function stopElectionUI(votechain, electionKey) {
  return async (dispatch) => {
    let stoppedElection = await getElection(electionKey, votechain)

    dispatch({
      type: STOP_ELECTION_UI,
      payload: {stoppedElection}
    })
  }
}

export function fetchElectionDetails(votechain, electionKey) {
  return async (dispatch) => {
    let electionDetails = await getElectionDetails(votechain, electionKey)

    dispatch({
      type: FETCH_ELECTION_DETAILS,
      payload: { electionDetails }
    })
  }
}
