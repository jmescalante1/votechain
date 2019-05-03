import Web3 from 'web3'

export const GET_WEB3 = 'GET_WEB3'
export const GET_WEB3_ERROR = 'GET_WEB3_ERROR'
export const CHANGE_DEFAULT_ACCOUNT = 'CHANGE_DEFAULT_ACCOUNT'

export function getWeb3() {
  return async (dispatch) => {
    let buildWeb3 = () => 
      new Promise(async (resolve, reject) => {

        window.addEventListener("load", async () => { // avoid racing condition when the page is loading
          if (window.ethereum) {
            const web3 = new Web3(window.ethereum); 

            try {
              console.log('(Modern dapp browsers) Injected web 3 detected.')
              await window.ethereum.enable(); // Request account access if needed

              resolve(web3);
            } catch (error) {
              reject(error);
            }
          }
          else if (window.web3) {  // Legacy dapp browsers...
            const web3 = window.web3; // Use Mist/MetaMask's provider.
            console.log("(Legacy dapp browsers) Injected web3 detected.");
            resolve(web3);
          }
          else {
            const provider = new Web3.providers.HttpProvider(
              "http://127.0.0.1:9545" // Fallback to localhost; use dev console port by default...
            );
            const web3 = new Web3(provider);
            console.log("No web3 instance injected, using Local web3.");
            resolve(web3);
          }
        });
      });

    function onSuccess(web3) {
      dispatch({
        type: GET_WEB3,
        web3: web3
      })
    }

    function onError(error) {
      dispatch({
        type: GET_WEB3_ERROR,
        web3Error: error
      })
    }

    try {
      const web3 = await buildWeb3()
      onSuccess(web3)
    } catch (error) {
      onError(error)
    }
    
  }
}




