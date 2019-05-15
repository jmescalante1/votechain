import React, { Component } from 'react'
import { connect } from 'react-redux'

import Vote from './vote'

class VoteContainer extends Component {
  constructor() {
    super()

    this.state = {
      electionId: null,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  }

  handleElectionSelectChange(option) {
    if(option) {
      this.setState({ electionId: option.value })
    } else {
      this.setState({ electionId: null })
    }
  }

  render() {
    const { electionId } = this.state 
    const { electionList } = this.props
  
    return (
      <div>
        <Vote 
          electionId={electionId}
          handleElectionSelectChange={this.handleElectionSelectChange}
          electionList={electionList}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  electionList: state.election.electionList
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer)