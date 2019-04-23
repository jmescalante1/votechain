import React from 'react'
import { connect } from "react-redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faClipboardList, faUsers, faPersonBooth, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons'

import Main from './components/main/main'
import 'typeface-roboto'

import { getWeb3 } from './actions/web3'
import { getVotechainContract } from './actions/contract'
import { fetchElectionList, addElectionUI, editElectionUI, deleteElectionUI, startElectionUI, stopElectionUI } from './actions/election'
import { addPositionUI, editPositionUI, deletePositionUI } from './actions/position'
import { addCandidateUI, editCandidateUI, deleteCandidateUI } from './actions/candidate'
import { addVoterUI, editVoterUI, deleteVoterUI } from './actions/voter'
import { addOfficialUI, editOfficialUI, deleteOfficialUI } from './actions/official'
import { addAdminUI, editAdminUI, deleteAdminUI } from './actions/admin'
import { changeAccount } from './actions/account'

library.add(faAddressCard, faClipboardList, faUsers, faPersonBooth, faUserTie, faUserCog)

const theme = createMuiTheme({
  palette: {
    text: {
      main: '#fafafa'
    },
    highlight: {
      main: '#006064'
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
      }
    }
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends React.Component {
  async componentDidMount() {
    const { getWeb3 } = this.props
    await getWeb3() // save the web3 to redux store
    
    const { web3 } = this.props
    
    if(web3) {
      const { getVotechainContract } = this.props
      await getVotechainContract(web3) // save the votechain contract to redux store
    }

    const { votechain } = this.props

    // Setup solidity event listeners
    if(votechain) {
      const { addElectionUI, editElectionUI, deleteElectionUI
        , addPositionUI, editPositionUI, deletePositionUI
        , addCandidateUI, editCandidateUI, deleteCandidateUI
        , addVoterUI, editVoterUI, deleteVoterUI
        , startElectionUI, stopElectionUI
        , addOfficialUI, editOfficialUI, deleteOfficialUI
        , addAdminUI, editAdminUI, deleteAdminUI
        , changeAccount } = this.props

      votechain.events.allEvents({fromBlock: 'latest'}, async(error, result) => {
        if(!error) {
          if('AddElection' === result.event) {
            let electionKey = result.returnValues.electionKey
            addElectionUI(web3, votechain, electionKey)
          } 
          
          else if ('EditElection' === result.event) {
            let electionKey = result.returnValues.electionKey
            editElectionUI(web3, votechain, electionKey)
          } 
          
          else if ('DeleteElection' === result.event) {
            let electionKey = result.returnValues.electionKey
            deleteElectionUI(web3, votechain, electionKey)
          } 
          
          else if ('AddPositionAt' === result.event) {
            let electionKey = result.returnValues.electionKey
            let positionKey = result.returnValues.positionKey
            addPositionUI(web3, votechain, positionKey, electionKey)
          }

          else if ('EditPosition' === result.event) {
            let positionKey = result.returnValues.positionKey
            editPositionUI(web3, votechain, positionKey)
          }

          else if ('DeletePosition' === result.event) {
            let positionKey = result.returnValues.positionKey
            deletePositionUI(web3, votechain, positionKey)
          }

          else if ('AddCandidateAt' === result.event) {
            let positionKey = result.returnValues.positionKey
            let candidateKey = result.returnValues.candidateKey
            addCandidateUI(web3, votechain, positionKey, candidateKey)
          }

          else if ('EditCandidate' === result.event) {
            let candidateKey = result.returnValues.candidateKey
            editCandidateUI(web3, votechain, candidateKey)
          }

          else if ('DeleteCandidate' === result.event) {
            let candidateKey = result.returnValues.candidateKey
            deleteCandidateUI(web3, votechain, candidateKey)
          }

          else if ('AddVoterAt' === result.event) {
            let electionKey = result.returnValues.electionKey
            let voterKey = result.returnValues.voterKey
            addVoterUI(web3, votechain, voterKey, electionKey)
          }

          else if ('EditVoter' === result.event) {
            let voterKey = result.returnValues.voterKey
            editVoterUI(web3, votechain, voterKey)
          }

          else if ('DeleteVoterAt' === result.event) {
            let voterKey = result.returnValues.voterKey
            deleteVoterUI(web3, votechain, voterKey)
          }

          else if ('StartElection' === result.event) {
            let electionKey = result.returnValues.electionKey
            startElectionUI(web3, votechain, electionKey)
          }

          else if ('StopElection' === result.event) {
            let electionKey = result.returnValues.electionKey
            stopElectionUI(web3, votechain, electionKey)
          }

          else if ('AddOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            addOfficialUI(web3, votechain, officialKey)
          }

          else if ('EditOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            editOfficialUI(web3, votechain, officialKey)
          }

          else if ('DeleteOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            deleteOfficialUI(web3, votechain, officialKey)
          }

          else if ('AddAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            addAdminUI(web3, votechain, adminKey)
          }

          else if ('EditAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            editAdminUI(web3, votechain, adminKey)
          }

          else if ('DeleteAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            deleteAdminUI(web3, votechain, adminKey)
          }
        }
      })

      window.ethereum.on('accountsChanged', (accounts) => {
        changeAccount(web3, accounts[0])
      })
      
      
      const { fetchElectionList } = this.props

      // fetch data
      fetchElectionList(web3, votechain)
    }
    
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  getWeb3,
  getVotechainContract,
  fetchElectionList,
  addElectionUI,
  editElectionUI,
  deleteElectionUI,
  
  addPositionUI,
  editPositionUI,
  deletePositionUI,
  
  addCandidateUI,
  editCandidateUI,
  deleteCandidateUI,
  
  addVoterUI,
  editVoterUI,
  deleteVoterUI,

  startElectionUI,
  stopElectionUI,

  addOfficialUI,
  editOfficialUI,
  deleteOfficialUI,

  addAdminUI,
  editAdminUI,
  deleteAdminUI,

  changeAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

