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

export const FETCH_CURRENT_VOTE_LIST = 'FETCH_CURRENT_VOTE_LIST'

export function fetchCurrentVoteList(votechain, electionKey) {
  return async (dispatch) => {
    const noOfVotes = await votechain.methods.getNoOfVotesOfElection(electionKey).call()
    let voteList = []

    for(let i = 0; i < noOfVotes; i++) {
      let voteKey = await votechain.methods.getVoteKeyOfElection(electionKey, i).call()
      
      let vote = await getVote(voteKey, votechain)

      voteList.push(vote)
    }

    dispatch({
      type: FETCH_CURRENT_VOTE_LIST,
      payload: {voteList, electionKey}
    })
  }
}

