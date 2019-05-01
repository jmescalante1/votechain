async function getRawPosition(positionKey, votechain){
  let position  = await votechain.methods.positionList(positionKey).call()
  return position
}

async function getRawParty(partyKey, votechain){
  let party = await votechain.methods.partyList(partyKey).call()
  return party
}

async function getParty(partyKey, votechain){
  let response = await votechain.methods.partyList(partyKey).call()
  
  let party = {}

  party.id = partyKey
  party.name = response.name
  party.electionId = Number(response.electionKey)

  return party
}

async function getPartyListOfElection(electionKey, votechain){
  let partyList = []
  
  // get all parties with election key equal to the parameter
  let noOfParties = await votechain.methods.getNoOfParties().call()

  for(let partyIndex = 0; partyIndex < noOfParties; partyIndex++){
    let partyKey = await votechain.methods.partyKeyList(partyIndex).call()
    let party = await getParty(partyKey, votechain)

    if(party.electionId === electionKey){
      partyList.push(party)
    }
  }

  return partyList
}

async function getPosition(positionKey, votechain) {
  let response = await votechain.methods.positionList(positionKey).call()
  let position = {}

  position.id = Number(positionKey)
  position.name = response.name
  position.maxNoOfCandidatesThatCanBeSelected = Number(response.maxNoOfCandidatesThatCanBeSelected)
  position.hasAbstain = response.isAbstainActive
  position.electionId = Number(response.electionKey)

  return position
}

async function getCandidate(candidateKey, votechain) {
  let response = await votechain.methods.candidateList(candidateKey).call()
  let candidate = {}

  candidate.id = Number(candidateKey)
  candidate.name = response.name
 
  candidate.positionId = Number(response.positionKey)
  let position = await getRawPosition(response.positionKey, votechain)

  candidate.positionName = position.name

  if((await votechain.methods.isParty(response.partyKey).call())){
    let party = await getRawParty(Number(response.partyKey), votechain)

    candidate.partyName = party.name
  } else {
    candidate.partyName = 'Independent'
  }
  
  return candidate
}

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
    await votechain.methods.updateCandidate(candidate.candidateKey, candidate.name).send({from: account})
    
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