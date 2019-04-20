import React from 'react'
import { connect } from "react-redux"

import Candidate from './candidate'

class CandidateContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      electionId: '',
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  } 

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ electionId: option.value })
    } else {
      this.setState({ electionId: '' })
    }
  }

  render() {
    const { electionId } = this.state
    const { electionList } = this.props

    return(
      <Candidate 
        electionId={electionId}
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