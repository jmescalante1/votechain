import React from 'react'
import { connect } from "react-redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faClipboardList, faUsers, faPersonBooth, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons'

import Main from './components/main/main'
import 'typeface-roboto'

import { getWeb3 } from './actions/web3'
import { getVotechainContract } from './actions/contract'
import { fetchElectionList, addElectionUI, editElectionUI, deleteElectionUI } from './actions/election'
import { addPositionUI, editPositionUI } from './actions/position'

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
    await this.props.getWeb3() // save the web3 to redux store
    
    if(this.props.web3)
      await this.props.getVotechainContract(this.props.web3) // save the votechain contract to redux store

    // Setup solidity event listeners
    if(this.props.votechain) {
      this.props.votechain.events.allEvents({fromBlock: 'latest'}, async(error, result) => {
        if(!error) {
          if(['AddElection'].includes(result.event)) {
            let electionKey = result.returnValues.electionKey
            this.props.addElectionUI(this.props.web3, this.props.votechain, electionKey)
          } 
          
          else if (['EditElection'].includes(result.event)) {
            let electionKey = result.returnValues.electionKey
            this.props.editElectionUI(this.props.web3, this.props.votechain, electionKey)
          } 
          
          else if (['DeleteElection'].includes(result.event)) {
            let electionKey = result.returnValues.electionKey
            this.props.deleteElectionUI(this.props.web3, this.props.votechain, electionKey)
          } 
          
          else if (['AddPositionAt'].includes(result.event)) {
            let electionKey = result.returnValues.electionKey
            let positionKey = result.returnValues.positionKey
            this.props.addPositionUI(this.props.web3, this.props.votechain, positionKey, electionKey)
          }

          else if (['EditPosition'].includes(result.event)) {
            let positionKey = result.returnValues.positionKey
            this.props.editPositionUI(this.props.web3, this.props.votechain, positionKey)
          }
        }
      })
    }

    // fetch data
    this.props.fetchElectionList(this.props.web3, this.props.votechain)
    console.log('Mount')
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
  editPositionUI
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

