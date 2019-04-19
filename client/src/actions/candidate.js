export const FETCH_CANDIDATE_LIST_OF_ELECTION = 'FETCH_CANDIDATE_LIST_OF_ELECTION'

export function fetchCandidateListOfElection(web3, votechain, electionKey){
  return async (dispatch) => {
    const noOfPositions = await votechain.methods.noOfPositionsAt(electionKey)
    
  }
}