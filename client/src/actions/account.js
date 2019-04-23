export const SET_ACCOUNT = 'SET_ACCOUNT'

export function setAccount(web3, account){
  web3.eth.defaultAccount = account
  
  return async (dispatch) => {
    dispatch({
      type: SET_ACCOUNT,
      payload: {account}
    })
  }
}
