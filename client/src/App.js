import React, { Fragment } from 'react'
import { connect } from "react-redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faClipboardList, faUsers, faPersonBooth, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons'

import Main from './components/main/main'
import Loader from './components/customized/progress-bars/loader'
import Web3Error from './components/content/error/web3-error'
import AccountError from './components/content/error/account-error'

import 'typeface-roboto'

import { getWeb3 } from './actions/web3'
import { getVotechainContract } from './actions/contract'
import { fetchElectionList, addElectionUI, editElectionUI, deleteElectionUI, startElectionUI, stopElectionUI } from './actions/election'
import { addPositionUI, editPositionUI, deletePositionUI } from './actions/position'
import { addPartyUI, editPartyUI, deletePartyUI } from './actions/party'
import { addCandidateUI, editCandidateUI, deleteCandidateUI } from './actions/candidate'
import { addVoterUI, editVoterUI, deleteVoterUI } from './actions/voter'
import { fetchOfficialList, addOfficialUI, editOfficialUI, deleteOfficialUI } from './actions/official'
import { fetchAdminList, addAdminUI, editAdminUI, deleteAdminUI } from './actions/admin'
import { setAccount, getAccountDetails } from './actions/account'

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
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      noAccounts: false,
    }

    this.setLoading = this.setLoading.bind(this)
    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.setupAccount = this.setupAccount.bind(this)
    this.fetchInitialGlobalData = this.fetchInitialGlobalData.bind(this)
    this.fetchInitialDataByUser = this.fetchInitialDataByUser.bind(this)
  }

  setLoading(loading) {
    this.setState({ loading })
  }

  async setupWeb3() {
    const { getWeb3 } = this.props
    await getWeb3() // save the web3 to redux store
  }

  async setupVotechain(web3) {
    if(web3) {
      const { getVotechainContract } = this.props
      await getVotechainContract(web3) // save the votechain contract to redux store
    }
  }

  setupEventListeners(votechain, web3) {
    if(votechain && web3){
      const { addElectionUI, editElectionUI, deleteElectionUI
        , addPositionUI, editPositionUI, deletePositionUI
        , addCandidateUI, editCandidateUI, deleteCandidateUI
        , addPartyUI, editPartyUI, deletePartyUI
        , addVoterUI, editVoterUI, deleteVoterUI
        , startElectionUI, stopElectionUI
        , addOfficialUI, editOfficialUI, deleteOfficialUI
        , addAdminUI, editAdminUI, deleteAdminUI
        } = this.props

      // Setup solidity event listeners
      votechain.events.allEvents({fromBlock: 'latest'}, async(error, result) => {
        if(!error) {
          if('AddElection' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            addElectionUI(votechain, electionKey)
          } 
          
          else if ('EditElection' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            editElectionUI(votechain, electionKey)
          } 
          
          else if ('DeleteElection' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            deleteElectionUI(votechain, electionKey)
          } 
          
          else if ('AddPositionAt' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            let positionKey = Number(result.returnValues.positionKey)
            addPositionUI(votechain, positionKey, electionKey)
          }

          else if ('EditPosition' === result.event) {
            let positionKey = Number(result.returnValues.positionKey)
            editPositionUI(votechain, positionKey)
          }

          else if ('DeletePosition' === result.event) {
            let positionKey = Number(result.returnValues.positionKey)
            deletePositionUI(votechain, positionKey)
          }

          else if ('AddCandidateAt' === result.event) {
            let positionKey = Number(result.returnValues.positionKey)
            let candidateKey = Number(result.returnValues.candidateKey)
            addCandidateUI(votechain, positionKey, candidateKey)
          }

          else if ('EditCandidate' === result.event) {
            let candidateKey = Number(result.returnValues.candidateKey)
            editCandidateUI(votechain, candidateKey)
          }

          else if ('DeleteCandidate' === result.event) {
            let candidateKey = Number(result.returnValues.candidateKey)
            deleteCandidateUI(candidateKey)
          }

          else if ('AddVoterAt' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            let voterKey = result.returnValues.voterKey
            addVoterUI(votechain, voterKey, electionKey)
          }

          else if ('EditVoter' === result.event) {
            let voterKey = result.returnValues.voterKey
            editVoterUI(votechain, voterKey)
          }

          else if ('DeleteVoterAt' === result.event) {
            let voterKey = result.returnValues.voterKey
            deleteVoterUI(voterKey)
          }

          else if ('StartElection' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            startElectionUI(votechain, electionKey)
          }

          else if ('StopElection' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            stopElectionUI(votechain, electionKey)
          }

          else if ('AddOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            addOfficialUI(votechain, officialKey)
          }

          else if ('EditOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            editOfficialUI(votechain, officialKey)
          }

          else if ('DeleteOfficial' === result.event) {
            let officialKey = result.returnValues.officialKey
            deleteOfficialUI(officialKey)
          }

          else if ('AddAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            addAdminUI(votechain, adminKey)
          }

          else if ('EditAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            editAdminUI(votechain, adminKey)
          }

          else if ('DeleteAdmin' === result.event) {
            let adminKey = result.returnValues.adminKey
            deleteAdminUI(adminKey)
          }

          else if ('CastVote' === result.event) {
            // let voteKey = Number(result.returnValues.voteKey)
            // let vote = await votechain.methods.voteList(voteKey).call()
          }

          else if ('AddPartyAt' === result.event) {
            let electionKey = Number(result.returnValues.electionKey)
            let partyKey = Number(result.returnValues.partyKey)
            addPartyUI(votechain, partyKey, electionKey)
          }

          else if ('EditParty' === result.event) {
            let partyKey = Number(result.returnValues.partyKey)
            editPartyUI(votechain, partyKey)
          }

          else if ('DeleteParty' === result.event) {
            let partyKey = Number(result.returnValues.partyKey)
            deletePartyUI(votechain, partyKey)
          }
        }
      })

      window.ethereum.on('accountsChanged', async (accounts) => {
        await this.setupAccount(votechain, web3)
        await this.fetchInitialDataByUser(votechain, accounts[0])
      })
    }
  }

  async setupAccount(votechain, web3){
    if(votechain && web3){
      const accounts = await web3.eth.getAccounts()

      if(accounts && accounts[0]){
        let currentAccount = accounts[0]
        
        const { setAccount, getAccountDetails } = this.props
        await setAccount(web3, currentAccount)
        await getAccountDetails(votechain, currentAccount)

        this.setState({ noAccounts: false })
      } else {
        this.setState({ noAccounts: true })
      }
    }
  }

  async fetchInitialGlobalData(votechain) {
    if(votechain){
      const { fetchAdminList, fetchOfficialList } = this.props
            
      await fetchAdminList(votechain)
      await fetchOfficialList(votechain)
    }
  }

  async fetchInitialDataByUser(votechain, account){
    if(votechain && account){
      const { fetchElectionList } = this.props 
      await fetchElectionList(votechain, account)
    }
  }
  

  async componentDidMount() {
    this.setLoading(true)
  
    await this.setupWeb3()
    await this.setupVotechain(this.props.web3)
    await this.setupEventListeners(this.props.votechain, this.props.web3)
    await this.setupAccount(this.props.votechain, this.props.web3)
    await this.fetchInitialDataByUser(this.props.votechain, this.props.account)
    await this.fetchInitialGlobalData(this.props.votechain)
  
    this.setLoading(false)
  }

  render() {
    const { loading, noAccounts } = this.state
    const { web3Error } = this.props
    return (
      <Fragment>
        {loading
          ? <Loader /> 
          : web3Error 
          ? <Web3Error/> 
          : noAccounts
          ? <AccountError/>
          : <MuiThemeProvider theme={theme}>
              <Main/>
            </MuiThemeProvider>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
  web3Error: state.web3.web3Error,
  account: state.account.account
});

const mapDispatchToProps = {
  getWeb3,
  getVotechainContract,
  
  fetchElectionList,
  fetchAdminList,
  fetchOfficialList, 

  addElectionUI,
  editElectionUI,
  deleteElectionUI,

  addPartyUI,
  editPartyUI,
  deletePartyUI,
  
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

  setAccount,
  getAccountDetails
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


