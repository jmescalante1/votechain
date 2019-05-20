import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchVotesOfVoterInElection } from '../../../actions/vote'

import Vote from './vote'

class VoteContainer extends Component {
  constructor() {
    super()

    this.state = {
      electionId: null,
      hasVoted: false,
      loading: false,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
    this.checkIfVotedAlready = this.checkIfVotedAlready.bind(this)
    this.getOngoingElections = this.getOngoingElections.bind(this)
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.electionId !== this.state.electionId) {
      await this.setState({ loading: true })
      await this.checkIfVotedAlready()
      await this.setState({ loading: false})
    }
  }

  async checkIfVotedAlready(){
    const { account, votechain, fetchVotesOfVoterInElection } = this.props
    const { electionId } = this.state 

    let hasVoted = false

    if(electionId) {
      hasVoted = await votechain.methods.hasVotedAt(electionId, account).call()
      
      if(hasVoted)
       await fetchVotesOfVoterInElection(votechain, electionId, account)
    }

    await this.setState({ hasVoted })
  }

  getOngoingElections() {
    const { electionList } = this.props

    let ongoingElections = []
    
    electionList.forEach(election => {
      if(election.status === 'Ongoing') {
        ongoingElections.push(election)
      }
    })

    return ongoingElections
  }

  handleElectionSelectChange(option) {
    if(option) {
      this.setState({ electionId: option.value })
    } else {
      this.setState({ electionId: null })
    }
  }

  render() {
    const { electionId, hasVoted, loading } = this.state 
    const { userBallotDetails, ballotElection } = this.props
  
    return (
      <div>
        <Vote 
          electionId={electionId}
          handleElectionSelectChange={this.handleElectionSelectChange}
          electionList={this.getOngoingElections()}
          loading={loading}

          userBallotDetails={userBallotDetails}
          hasVoted={hasVoted}
          ballotElection={ballotElection}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  electionList: state.election.electionList,
  account: state.account.account,
  votechain: state.contract.votechain,
  userBallotDetails: state.vote.ballotOfAVoter,
  ballotElection: state.vote.ballotElection
})

const mapDispatchToProps = {
  fetchVotesOfVoterInElection
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer)