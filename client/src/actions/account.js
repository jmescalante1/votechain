export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT'

export function changeAccount(web3, account){
  web3.eth.defaultAccount = account
  
  return async (dispatch) => {
    dispatch({
      type: CHANGE_ACCOUNT,
      payload: {account}
    })
  }
}