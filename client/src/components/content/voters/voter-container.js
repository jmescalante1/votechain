import React from 'react'

import Voter from './voter'

import { electionData, electionList } from './voter-data'

class VoterContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      election: "",
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  } 

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ election: option.value })
    } else {
      this.setState({ election: "" })
    }
  }

  render() {
    const { election } = this.state

    return(
      <Voter 
        election={election}
        handleElectionSelectChange={this.handleElectionSelectChange}
        electionList={electionList}
        electionData={electionData}
      />
    )
  }
}

export default VoterContainer