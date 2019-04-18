import { developmentNetworkId } from '../network-config'
import VotechainJSON from '../contracts/Votechain.json'

export const GET_VOTECHAIN_CONTRACT = 'GET_VOTECHAIN_CONTRACT'
export const GET_VOTECHAIN_CONTRACT_ERROR = 'GET_VOTECHAIN_CONTRACT_ERROR'

export function getVotechainContract(web3) {
  return async (dispatch) => {

    function onSuccess(votechain) {
      dispatch({
        type: GET_VOTECHAIN_CONTRACT,
        votechain: votechain
      })
    }

    function onError(error) {
      dispatch({
        type: GET_VOTECHAIN_CONTRACT_ERROR,
        votechainError: error
      })
    }

    try {
      const deployedNetwork = VotechainJSON.networks[developmentNetworkId];
      const votechain = new web3.eth.Contract(
        VotechainJSON.abi,
        deployedNetwork && deployedNetwork.address,
      );

      onSuccess(votechain)
    } catch (error) {
      onError(error)
    }
  }
}
