import {getElection, getPosition, getCandidate, getVote } from './read-votechain'

export const FETCH_BALLOT_LIST = 'FETCH_BALLOT_LIST'
export const FETCH_ELECTION = 'FETCH_ELECTION'
export const CAST_BULK_VOTE_VOTECHAIN = 'CAST_BULK_VOTE_VOTECHAIN'
// export const CAST_BULK_VOTE_VOTECHAIN_PENDING = 'CAST_BULK_VOTE_VOTECHAIN_PENDING'

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

export function castBulkVoteVotechain(account, votechain, candidateKeyList, abstainKeyList){
  return async (dispatch) => {
    await votechain.methods.bulkVote(candidateKeyList, abstainKeyList).send({from: account})
    
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