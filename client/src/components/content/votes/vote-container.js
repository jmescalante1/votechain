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
  
    return (
      <Vote 
        electionId={electionId}
        handleElectionSelectChange={this.handleElectionSelectChange}
      />
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer)