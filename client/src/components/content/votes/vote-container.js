import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchVotesOfVoterInElection } from '../../../actions/vote'

import Vote from './vote'

class VoteContainer extends Component {
  constructor() {
    super()

    this.state = {
      election: null,
      hasVoted: false,
      loading: true,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
    this.checkIfVotedAlready = this.checkIfVotedAlready.bind(this)
    this.getOngoingElections = this.getOngoingElections.bind(this)
    this.setHasVoted = this.setHasVoted.bind(this)
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.election !== this.state.election) {
      await this.setState({ loading: true })
      await this.checkIfVotedAlready()
      await this.setState({ loading: false})
    }
  }

  async checkIfVotedAlready(){
    const { account, votechain, fetchVotesOfVoterInElection } = this.props
    const { election } = this.state 

    let hasVoted = false

    if(election) {
      hasVoted = await votechain.methods.hasVotedAt(election.id, account).call()
      
      if(hasVoted)
       await fetchVotesOfVoterInElection(votechain, election.id, account)
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

  async setHasVoted() {
    await this.setState({ hasVoted: true })
  }

  handleElectionSelectChange(option) {
    if(option) {
      this.setState({ election: option.value })
    } else {
      this.setState({ election: null })
    }
  }

  render() {
    const { election, hasVoted } = this.state 
    const { loading } = this.state
    const { userBallotDetails, ballotElection } = this.props
  
    return (
      <div>
          <Vote 
            election={election}
            handleElectionSelectChange={this.handleElectionSelectChange}
            electionList={this.getOngoingElections()}

            setHasVoted={this.setHasVoted}

            userBallotDetails={userBallotDetails}
            hasVoted={hasVoted}
            loading={loading}
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