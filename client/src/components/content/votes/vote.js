import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import BallotContainer from './ballot/ballot-container'

import UserBallotDetails from './user-ballot-details'

import Loader from '../../customized/progress-bars/loader'

const styles = theme => ({
  electionSelector: {
    marginTop: theme.spacing.unit * 4,
    margin: 'auto',
    width: '90%'
  }
})

class Vote extends Component {
  constructor(props) {
    super(props);
    

  }

  render() {
    const { classes, electionId, handleElectionSelectChange, electionList, hasVoted, userBallotDetails, ballotElection, loading } = this.props
    console.log(hasVoted)
    // console.log(electionId)
    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}
          label='Ongoing Elections'
          fontSize={18}
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />
        { loading 
          ? <Loader />
          : electionId 
            ? hasVoted 
              ? <UserBallotDetails
                  ballot={userBallotDetails}
                  election={ballotElection}
                />
              : <BallotContainer 
                  electionId={electionId}
                />
            : null
        }
        
      </div>
    )
  }
}

Vote.propTypes = {
  classes: PropTypes.object.isRequired,
  
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles)(Vote)