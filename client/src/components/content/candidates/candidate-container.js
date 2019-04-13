import React from 'react'

import Candidate from './candidate'

import { electionData, electionList } from './candidate-data'

class CandidateContainer extends React.Component {
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
      <Candidate 
        election={election}
        handleElectionSelectChange={this.handleElectionSelectChange}
        electionList={electionList}
        electionData={electionData}
      />
    )
  }
}

export default CandidateContainer