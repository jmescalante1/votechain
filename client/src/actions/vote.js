import { getVote } from './read-votechain'

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

