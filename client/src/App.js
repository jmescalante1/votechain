import React from 'react'
import { connect } from "react-redux"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faClipboardList, faUsers, faPersonBooth, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons'

import Main from './components/main/main'
import 'typeface-roboto'

import { getWeb3 } from './actions/web3'

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
    await this.props.getWeb3()
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
  web3Error: state.web3.web3Error
});

const mapDispatchToProps = {
  getWeb3
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// import React from 'react';
// import SimpleStorageContract from './contracts/SimpleStorage.json';
// import getWeb3 from './utils/getWeb3';

// import './App.css';

// class App extends React.Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null, newValue: '' };

//   componentDidMount = async () => {
//     try {

//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();
//       console.log('User accounts: ' + JSON.stringify(accounts));
//       window.ethereum.on('accountsChanged', async (accounts) => {
//         accounts = await web3.eth.getAccounts();
//         this.setState({ accounts})
//         console.log('New accounts: ' + JSON.stringify(accounts));
//       })
     

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   handleChange(event){
//     this.setState({newValue: event.target.value});
//   }

//   async handleSubmit(event){
//     event.preventDefault();

//     const { accounts, contract } = this.state;
//     await contract.methods.set(this.state.newValue).send({from: accounts[0]});
//     const response = await contract.methods.get().call();
//     console.log(response);
//     this.setState({storageValue: response});
//   }

//   runExample = async () => {
//     const { accounts, contract } = this.state;
//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();
//     console.log(response);
//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className='App'>
//         <h1>Welcome to this dapp!</h1>
//         <div>Filip likes: {this.state.storageValue}</div>
//         <form onSubmit={this.handleSubmit}>
//           <input type='text' value={this.state.newValue} onChange={this.handleChange} />
//           <input type='submit' value='Submit' />
//         </form>
//       </div>
//     );
//   }
// }

// export default App;
