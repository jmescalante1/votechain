import { editAdminVotechain } from './admin'
import { editOfficialVotechain } from './official'
import { editVoterVotechain } from './voter'
import { getRole } from './read-votechain'

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const GET_ACCOUNT_DETAILS = 'GET_ACCOUNT_DETAILS'

export function setAccount(web3, account){
  web3.eth.defaultAccount = account
  
  return async (dispatch) => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {account}
    })
  }
}

export function getAccountDetails(votechain, accountKey) {
  return async (dispatch) => {
    // account address, name, student no, electionKeyList, voteKeyList
    let profile = {}
    profile.accountAddress = accountKey
    
    // get role
    let role = await getRole(votechain, accountKey)

    if(role === 'Administrator'){
      let admin = await votechain.methods.adminList(accountKey).call()
      profile.name = admin.name
      profile.role = 'Administrator'

    } else if (role === 'Official') {
      let official = await votechain.methods.officialList(accountKey).call()
      profile.name = official.name
      profile.role = 'Official'

    } else if (role === 'Voter') {
      let voter = await votechain.methods.voterList(accountKey).call()
      profile.name = voter.name
      profile.studentNo = voter.studentNo
      profile.role = 'Voter'

    } else if (role === 'Unregistered') {
      profile.role = 'Unregistered'
    }

    dispatch({
      type: GET_ACCOUNT_DETAILS,
      payload: {profile}
    })
  }
} 

export function editProfile(votechain, profile, accountKey) {
  return async (dispatch) => {
    let role = await getRole(votechain, accountKey)

    switch(role){
      case 'Voter':
        profile.voterKey = profile.accountAddress
        return dispatch(editVoterVotechain(accountKey, votechain, profile))
      case 'Official':
        profile.officialKey = profile.accountAddress
        return dispatch(editOfficialVotechain(accountKey, votechain, profile))
      case 'Administrator':
        profile.adminKey = profile.accountAddress
        return dispatch(editAdminVotechain(accountKey, votechain, profile))
      default: {
        break;
      }
    }
  }
}
