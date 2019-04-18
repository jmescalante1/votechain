
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
export const EDIT_ELECTION_VOTECHAIN = 'EDIT_ELECTION_VOTECHAIN'
export const EDIT_ELECTION_UI = 'EDIT_ELECTION_UI'
export const DELETE_ELECTION_VOTECHAIN = 'DELETE_ELECTION_VOTECHAIN'
export const DELETE_ELECTION_UI = 'DELETE_ELECTION_UI'

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

export function editElectionVotechain(web3, votechain, election) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updateElection(election.id, election.name).send({from: firstAccount})
  
    dispatch({
      type: EDIT_ELECTION_VOTECHAIN,
    })
  }
}

export function editElectionUI(web3, votechain, electionKey) {
  return async (dispatch) => {
    let editedElection = await getElection(electionKey, votechain)

    dispatch({
      type: EDIT_ELECTION_UI,
      editedElection
    })
  }
}

export function deleteElectionUI(web3, votechain, electionKey) {
  return async (dispatch) => {
    let deletedElection = await getElection(electionKey, votechain)

    dispatch({
      type: DELETE_ELECTION_UI,
      deletedElection
    })
  }
}

export function deleteElectionVotechain(web3, votechain, electionKey) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    await votechain.methods.deleteElection(electionKey).send({from: firstAccount})
  
    dispatch({
      type: DELETE_ELECTION_VOTECHAIN,
    })
  }
}