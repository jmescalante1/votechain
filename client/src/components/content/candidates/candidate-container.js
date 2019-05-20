import React from 'react'
import { connect } from "react-redux"

import Candidate from './candidate'

class CandidateContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      election: null,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  } 

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ election: option.value })
    } else {
      this.setState({ election: null })
    }
  }

  render() {
    const { election } = this.state
    const { electionList } = this.props

    return(
      <Candidate 
        election={election}
        handleElectionSelectChange={this.handleElectionSelectChange}
        electionList={electionList}
      />
    )
  }
}

const mapStateToProps = state => ({
  electionList: state.election.electionList
});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateContainer)