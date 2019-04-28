function convertStageToStatus(stage) {
  if(stage === 0) return 'Pending'
  else if (stage === 1) return 'Ongoing'
  else if (stage === 2) return 'Finished'
  return 'Unknown Status'
}

async function getElection(electionKey, votechain) {
  let response = await votechain.methods.electionList(electionKey).call()
  let election = {}

  election.id = Number(electionKey)
  election.name = response.name
  election.status = convertStageToStatus(Number(response.stage))

  return election
}

async function getPosition(positionKey, votechain) {
  let response = await votechain.methods.positionList(positionKey).call()
  let position = {}

  position.id = Number(positionKey)
  position.name = response.name
  position.maxNoOfCandidatesThatCanBeSelected = Number(response.maxNoOfCandidatesThatCanBeSelected)
  position.hasAbstain = response.isAbstainActive

  return position
}

async function getCandidate(candidateKey, votechain) {
  let response = await votechain.methods.candidateList(candidateKey).call()
  let candidate = {}

  candidate.id = Number(candidateKey)
  candidate.name = response.name
  candidate.positionId = Number(response.positionKey)
  
  let position = await getPosition(candidate.positionId, votechain)

  candidate.positionName = position.name

  return candidate
}

export const FETCH_FINISHED_ELECTION_LIST = 'FETCH_FINISHED_ELECTION_LIST'
export const FETCH_FINISHED_ELECTION_RESULT = 'FETCH_FINISHED_ELECTION_RESULT'

export function fetchFinishedElectionResult(votechain, electionKey) {
  return async (dispatch) => {
    let finishedElection = await getElection(electionKey, votechain)

    const noOfPositions = await votechain.methods.getNoOfPositionsAt(electionKey).call()
    let positionList = []
    
    for(let positionKeyIndex = 0; positionKeyIndex < noOfPositions; positionKeyIndex++) {
      let positionKey = await votechain.methods.getPositionKeyAt(electionKey, positionKeyIndex).call()
      let position = await getPosition(positionKey, votechain)

      const noOfCandidates = await votechain.methods.getNoOfCandidatesAt(positionKey).call()
      let candidateList = []

      for(let candidateKeyIndex = 0; candidateKeyIndex < noOfCandidates; candidateKeyIndex++){
        let candidateKey = await votechain.methods.getCandidateKeyAt(positionKey, candidateKeyIndex).call()
        let candidate = await getCandidate(candidateKey, votechain)

        candidate.noOfVotesReceived = Number(await votechain.methods.getNoOfVotesReceivedBy(candidateKey).call())
        candidateList.push(candidate)
      }

      position.candidateList = candidateList
      positionList.push(position)
    }

    finishedElection.positionList = positionList

    dispatch({
      type: FETCH_FINISHED_ELECTION_RESULT,
      payload: {finishedElection}
    })
  }
}

export function fetchFinishedElectionList(votechain) {
  return async (dispatch) => {
    let finishedElectionList = []

    let noOfElections = await votechain.methods.getNoOfElections().call() 
    
    for(let electionIndex = 0; electionIndex < noOfElections; electionIndex++) {
      let electionKey = await votechain.methods.electionKeyList(electionIndex).call()
      let election = await getElection(electionKey, votechain)

      if(election.status === 'Finished') {
        finishedElectionList.push(election)
      }
    }

    dispatch({
      type: FETCH_FINISHED_ELECTION_LIST,
      payload: {finishedElectionList}
    })
  }
}