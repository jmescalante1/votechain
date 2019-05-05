import { getPartyListOfElection, getPosition, getCandidate } from './read-votechain'

export const FETCH_CURRENT_CANDIDATE_LIST = 'FETCH_CURRENT_CANDIDATE_LIST'
export const ADD_CANDIDATE_VOTECHAIN = 'ADD_CANDIDATE_VOTECHAIN'
export const ADD_CANDIDATE_UI = 'ADD_CANDIDATE_UI'
export const EDIT_CANDIDATE_VOTECHAIN = 'EDIT_CANDIDATE_VOTECHAIN'
export const EDIT_CANDIDATE_UI = 'EDIT_CANDIDATE_UI'
export const DELETE_CANDIDATE_VOTECHAIN = 'DELETE_CANDIDATE_VOTECHAIN'
export const DELETE_CANDIDATE_UI = 'DELETE_CANDIDATE_UI'

export function fetchCurrentCandidateList(votechain, electionKey) {
  return async (dispatch) => {
    const noOfPositions = await votechain.methods.getNoOfPositionsAt(electionKey).call()
    let candidateList = []
    let positionList = []

    for(let i = 0; i < noOfPositions; i++) {
      let positionKey = await votechain.methods.getPositionKeyAt(electionKey, i).call()
      let position = await getPosition(positionKey, votechain)

      positionList.push(position)

      let noOfCandidates = await votechain.methods.getNoOfCandidatesAt(positionKey).call()
     
      for(let j = 0; j < noOfCandidates; j++){
        let candidateKey = await votechain.methods.getCandidateKeyAt(positionKey, j).call()
     
        let candidate = await getCandidate(candidateKey, votechain)
        candidateList.push(candidate)
      }
    }

    let partyList = await getPartyListOfElection(electionKey, votechain);

    dispatch({
      type: FETCH_CURRENT_CANDIDATE_LIST,
      payload: {candidateList, positionList, electionKey, partyList}
    })
  }
}

export function addCandidateVotechain(account, votechain, candidate) {
  return async (dispatch) => {
    await votechain.methods.addCandidateAt(candidate.positionKey, candidate.name, candidate.partyKey).send({from: account})
    
    dispatch( {
      type: ADD_CANDIDATE_VOTECHAIN
    })
  }
}

export function addCandidateUI(votechain, positionKey, candidateKey) {
  return async (dispatch) => {
    let addedCandidate = await getCandidate(candidateKey, votechain)

    let position = await getPosition(positionKey, votechain)
    let electionKey = position.electionId

    dispatch({
      type: ADD_CANDIDATE_UI,
      payload: {addedCandidate, electionKey}
    })
  }
}

export function editCandidateVotechain(account, votechain, candidate){
  return async (dispatch) => {
    await votechain.methods.updateCandidate(candidate.candidateKey, candidate.name, candidate.partyKey).send({from: account})
    
    dispatch( {
      type: EDIT_CANDIDATE_VOTECHAIN
    })
  }
}

export function editCandidateUI(votechain, candidateKey){
  return async (dispatch) => {
    let editedCandidate = await getCandidate(candidateKey, votechain)

    dispatch( {
      type: EDIT_CANDIDATE_UI,
      editedCandidate
    })
  }
}


export function deleteCandidateVotechain(account, votechain, candidateKey) {
  return async (dispatch) => {
    await votechain.methods.deleteCandidate(candidateKey).send({from: account})
  
    dispatch({
      type: DELETE_CANDIDATE_VOTECHAIN,
    })
  }
}

export function deleteCandidateUI(candidateKey) {
  return async (dispatch) => {
    let deletedCandidateId = candidateKey

    dispatch({
      type: DELETE_CANDIDATE_UI,
      deletedCandidateId
    })
  }
}