async function getAdmin(adminKey, votechain) {
  let response = await votechain.methods.adminList(adminKey).call()
  let admin = {}

  admin.id = adminKey
  admin.name = response.name

  return admin
}

export const FETCH_ADMIN_LIST = 'FETCH_ADMIN_LIST'
export const ADD_ADMIN_VOTECHAIN = 'ADD_ADMIN_VOTECHAIN'
export const ADD_ADMIN_UI = 'ADD_ADMIN_UI'
export const EDIT_ADMIN_VOTECHAIN = 'EDIT_ADMIN_VOTECHAIN'
export const EDIT_ADMIN_UI = 'EDIT_ADMIN_UI'
export const DELETE_ADMIN_VOTECHAIN = 'DELETE_ADMIN_VOTECHAIN'
export const DELETE_ADMIN_UI = 'DELETE_ADMIN_UI'

export function fetchAdminList(web3, votechain) {
  return async (dispatch) => {
    const noOfAdmins = await votechain.methods.getNoOfAdmins().call()
    let adminList = []

    for(let i = 0; i < noOfAdmins; i++) {
      let adminKey = await votechain.methods.adminKeyList(i).call()
      let admin = await getAdmin(adminKey, votechain)

      adminList.push(admin)
    }

    dispatch({
      type: FETCH_ADMIN_LIST,
      payload: {adminList}
    })
  }
}

export function addAdminVotechain(web3, votechain, admin) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.addAdmin(admin.adminKey, admin.name).send({from: firstAccount})
    

    dispatch( {
      type: ADD_ADMIN_VOTECHAIN
    })
  }
}

export function addAdminUI(web3, votechain, adminKey) {
  return async (dispatch) => {
    let addedAdmin = await getAdmin(adminKey, votechain)

    dispatch({
      type: ADD_ADMIN_UI,
      payload: {addedAdmin}
    })
  }
}

export function editAdminVotechain(web3, votechain, admin){
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]
    await votechain.methods.updateAdmin(admin.adminKey, admin.name).send({from: firstAccount})
    
    dispatch( {
      type: EDIT_ADMIN_VOTECHAIN
    })
  }
}

export function editAdminUI(web3, votechain, adminKey){
  return async (dispatch) => {
    let editedAdmin = await getAdmin(adminKey, votechain)

    dispatch( {
      type: EDIT_ADMIN_UI,
      payload: {editedAdmin}
    })
  }
}


export function deleteAdminVotechain(web3, votechain, adminKey) {
  return async (dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const firstAccount = accounts[0]

    await votechain.methods.deleteAdmin(adminKey).send({from: firstAccount})
  
    dispatch({
      type: DELETE_ADMIN_VOTECHAIN,
    })
  }
}

export function deleteAdminUI(web3, votechain, adminKey) {
  return async (dispatch) => {
    let deletedAdminKey = adminKey
    
    dispatch({
      type: DELETE_ADMIN_UI,
      payload: {deletedAdminKey}
    })
  }
}