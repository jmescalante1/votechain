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

async function getVote(voteKey, votechain) {
  let response = await votechain.methods.voteList(voteKey).call()
 
  let vote = {}

  vote.id = Number(voteKey)
  vote.voterId = response.voterKey

  // get candidate name
  let candidate = await votechain.methods.candidateList(response.candidateKey).call()
  vote.candidateName = candidate.name

  // get position name
  let position = await votechain.methods.positionList(response.positionKey).call()
  vote.positionName = position.name

  return vote
}

export const FETCH_BALLOT_LIST = 'FETCH_BALLOT_LIST'
export const FETCH_ELECTION = 'FETCH_ELECTION'
export const CAST_BULK_VOTE_VOTECHAIN = 'CAST_BULK_VOTE_VOTECHAIN'

export function fetchElection(votechain, electionKey) {
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

export function castBulkVoteVotechain(account, votechain, candidateKeyList){
  return async (dispatch) => {
    await votechain.methods.bulkVote(candidateKeyList).send({from: account})

    dispatch({
      type: CAST_BULK_VOTE_VOTECHAIN,
    })
  }
}

export function fetchBallotList(votechain, electionKey){
  return async (dispatch) => {
    // get election
    // let election = await getElection(electionKey, votechain)

    // get all votes under the election
    const noOfVotes = await votechain.methods.getNoOfVotesOfElection(electionKey).call()

    let ballotList = []

    for(let voteKeyIndex = 0; voteKeyIndex < noOfVotes; voteKeyIndex++){
      let voteKey = await votechain.methods.getVoteKeyOfElection(electionKey, voteKeyIndex).call()

      let vote = await getVote(voteKey, votechain)

      if(!ballotList[vote.voterId]) {
        let ballot = {
          voteList: {

          }
        }

        ballotList[vote.voterId] = ballot
      }

      if(!ballotList[vote.voterId].voteList[vote.positionName]){
        let voteStructure = {
          candidateList: []
        }

        ballotList[vote.voterId].voteList[vote.positionName] = voteStructure
      }

      ballotList[vote.voterId].voteList[vote.positionName].candidateList.push(vote.candidateName)
    }

    console.log(ballotList)

    // form the ballots from the votes
    // ballot structure
    // ballotList :{
        // voterKeyAddress: { // dynamic
            // voteList: {
               // positionName: { // dynamic
                      // candidateList: []
                //}
            //}]
        //}
    //}


    dispatch({
      type: FETCH_BALLOT_LIST,
      payload: { ballotList }
    })
  }
}