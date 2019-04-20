async function getRawPosition(positionKey, votechain){
  let position  = await votechain.methods.positionList(positionKey).call()
  return position
}

async function getPosition(positionKey, votechain) {
  let response = await votechain.methods.positionList(positionKey).call()
  let position = {}

  position.id = positionKey
  position.name = response.name
  position.maxNoOfCandidatesThatCanBeSelected = response.maxNoOfCandidatesThatCanBeSelected
  position.hasAbstain = response.isAbstainActive

  return position
}

async function getCandidate(candidateKey, votechain) {
  let response = await votechain.methods.candidateList(candidateKey).call()
  let candidate = {}

  candidate.id = candidateKey
  candidate.name = response.name
  candidate.positionId = response.positionKey
  
  let position = await getRawPosition(candidate.positionId, votechain)

  candidate.positionName = position.name

  return candidate
}

export const FETCH_CURRENT_CANDIDATE_LIST = 'FETCH_CURRENT_CANDIDATE_LIST'
export const ADD_CANDIDATE_VOTECHAIN = 'ADD_CANDIDATE_VOTECHAIN'
export const ADD_CANDIDATE_UI = 'ADD_CANDIDATE_UI'
export const EDIT_CANDIDATE_VOTECHAIN = 'EDIT_CANDIDATE_VOTECHAIN'
export const EDIT_CANDIDATE_UI = 'EDIT_CANDIDATE_UI'
export const DELETE_CANDIDATE_VOTECHAIN = 'DELETE_CANDIDATE_VOTECHAIN'
export const DELETE_CANDIDATE_UI = 'DELETE_CANDIDATE_UI'

export function fetchCurrentCandidateList(web3, votechain, electionKey) {
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

    dispatch({
      type: FETCH_CURRENT_CANDIDATE_LIST,
      payload: {candidateList, positionList, electionKey}
    })
  }
}

export function addCandidateVotechain(web3, votechain, candidate) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.addCandidateAt(candidate.positionKey, candidate.name).send({from: firstAccount})
    
    dispatch( {
      type: ADD_CANDIDATE_VOTECHAIN
    })
  }
}

export function addCandidateUI(web3, votechain, positionKey, candidateKey) {
  return async (dispatch) => {
    let addedCandidate = await getCandidate(candidateKey, votechain)

    let position = await getRawPosition(positionKey, votechain)
    let electionKey = position.electionKey

    dispatch({
      type: ADD_CANDIDATE_UI,
      payload: {addedCandidate, electionKey}
    })
  }
}

export function editCandidateVotechain(web3, votechain, candidate){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updateCandidate(candidate.candidateKey, candidate.name).send({from: firstAccount})
    
    dispatch( {
      type: EDIT_CANDIDATE_VOTECHAIN
    })
  }
}

export function editCandidateUI(web3, votechain, candidateKey){
  return async (dispatch) => {
    let editedCandidate = await getCandidate(candidateKey, votechain)

    dispatch( {
      type: EDIT_CANDIDATE_UI,
      editedCandidate
    })
  }
}


export function deleteCandidateVotechain(web3, votechain, candidateKey) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    await votechain.methods.deleteCandidate(candidateKey).send({from: firstAccount})
  
    dispatch({
      type: DELETE_CANDIDATE_VOTECHAIN,
    })
  }
}

export function deleteCandidateUI(web3, votechain, candidateKey) {
  return async (dispatch) => {
    let deletedCandidateId = candidateKey

    dispatch({
      type: DELETE_CANDIDATE_UI,
      deletedCandidateId
    })
  }
}