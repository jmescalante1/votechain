import { getVote, getElection, getVotesOfVoterInElection } from './read-votechain'

export const FETCH_CURRENT_VOTE_LIST = 'FETCH_CURRENT_VOTE_LIST'
export const FETCH_VOTES_OF_VOTER_IN_ELECTION = 'FETCH_VOTES_OF_VOTER_IN_ELECTION'
export const FETCH_VOTES_OF_VOTER_IN_ELECTION_PENDING = 'FETCH_VOTES_OF_VOTER_IN_ELECTION_PENDING'

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

export function fetchVotesOfVoterInElection(votechain, electionKey, voterKey) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_VOTES_OF_VOTER_IN_ELECTION_PENDING
    })

    let voteList = await getVotesOfVoterInElection(electionKey, voterKey, votechain)

    let election = await getElection(electionKey, votechain)
    
    // format the votelist
    /*
      ballot = {
        electionName: ''
        positionName: { // dynamic
          candidateNames: []
        }
      }
    */
   let ballot = {}

    for(let voteIndex = 0; voteIndex < voteList.length; voteIndex++){
      let vote = voteList[voteIndex]

      if(!ballot[vote.positionName]) {
        ballot[vote.positionName] = {
          candidateNames: [vote.candidateName]
        }
      } else {
        ballot[vote.positionName].candidateNames.push(vote.candidateName)
      }
    }

    dispatch({
      type: FETCH_VOTES_OF_VOTER_IN_ELECTION,
      payload: { ballot, election }
    })
  }
}

