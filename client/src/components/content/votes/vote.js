import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ElectionSelector from '../../customized/selectors/election-selector'
import BallotContainer from './ballot/ballot-container'

import UserBallotDetails from './user-ballot-details'

import Spacer from '../../customized/layout/spacer'

class Vote extends Component {
  render() {
    const { election, handleElectionSelectChange, electionList, hasVoted, userBallotDetails, ballotElection, loading, setHasVoted, theme } = this.props

    return (
      <div>
        <ElectionSelector 
          label='Ongoing Elections'
          fontSize={18}
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />

        <Spacer width='100%' height={theme.spacing.unit * 4}/>

        <BallotContainer 
          setHasVoted={setHasVoted}
          electionId={election ? election.id : null}
          display={!hasVoted && Boolean(election) && !loading}
        />

        <UserBallotDetails
          ballot={userBallotDetails}
          election={ballotElection}
          display={hasVoted && Boolean(election) && !loading}
        />
        
      </div>
    )
  }
}

Vote.propTypes = {
  classes: PropTypes.object.isRequired,
  
  election: PropTypes.object,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setHasVoted: PropTypes.func.isRequired,

  hasVoted: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Vote