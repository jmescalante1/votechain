
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

export const ADD_ELECTION_VOTECHAIN = 'ADD_ELECTION_VOTECHAIN'
export const ADD_ELECTION_VOTECHAIN_ERROR = 'ADD_ELECTION_VOTECHAIN_ERROR'
export const FETCH_ELECTION_LIST = 'FETCH_ELECTION_LIST'
export const ADD_ELECTION_UI = 'ADD_ELECTION_UI'

export function addElectionVotechain(web3, votechain, electionName){
  return async (dispatch) =>  { 

      function onSuccess() {
        dispatch({
          type: ADD_ELECTION_VOTECHAIN,
        })
      }

      function onError(error) {
        dispatch({
          type: ADD_ELECTION_VOTECHAIN_ERROR,
          addElectionError: error
        })
      }
      
      try {
        const accounts = await web3.eth.getAccounts()
        const firstAccount = accounts[0]
        await votechain.methods.addElection(electionName).send({from: firstAccount})
        onSuccess()
      } catch (error) {
        onError(error)
      }
  }
}

export function addElectionUI(web3, votechain, electionKey){
  return async (dispatch) =>  { 
    let addedElection = await getElection(electionKey, votechain)
    
    dispatch({
      type: ADD_ELECTION_UI,
      addedElection
    })
  }
}

export function fetchElectionList(web3, votechain) {
  return async (dispatch) => {
    const noOfElections = await votechain.methods.getNoOfElections().call()
    let electionList = []

    for(let i = 0; i < noOfElections; i++){
      let electionKey = await votechain.methods.electionKeyList(i).call()
      let election = await getElection(electionKey, votechain)

      electionList.push(election)
    }

    dispatch({
      type: FETCH_ELECTION_LIST,
      payload: electionList
    })
  }
}