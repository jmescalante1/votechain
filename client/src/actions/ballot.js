function convertStageToStatus(stage) {
  if(stage === 0) return 'Pending'
  else if (stage === 1) return 'Ongoing'
  else if (stage === 2) return 'Finished'
  return 'Unknown Status'
}

async function getElection(electionKey, votechain) {
  let response = await votechain.methods.electionList(electionKey).call()
  let election = {}

  election.id = electionKey
  election.name = response.name
  election.status = convertStageToStatus(Number(response.stage))

  return election
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
  
  let position = await getPosition(candidate.positionId, votechain)

  candidate.positionName = position.name

  return candidate
}

export const FETCH_ELECTION = 'FETCH_ELECTION'
export const CAST_BULK_VOTE_VOTECHAIN = 'CAST_BULK_VOTE_VOTECHAIN'

export function fetchElection(web3, votechain, electionKey) {
  return async (dispatch) => {
    let election = await getElection(electionKey, votechain)

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

        candidateList.push(candidate)
      }

      position.candidateList = candidateList
      positionList.push(position)
    }

    election.positionList = positionList

    dispatch({
      type: FETCH_ELECTION,
      payload: {election}
    })
  }
}

export function castBulkVoteVotechain(web3, votechain, candidateKeyList){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts() 
    const firstAccount = accounts[0]

    await votechain.methods.bulkVote(candidateKeyList).send({from: firstAccount})

    dispatch({
      type: CAST_BULK_VOTE_VOTECHAIN,
    })
  }
}