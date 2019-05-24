import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import BallotContainer from './ballot/ballot-container'

import UserBallotDetails from './user-ballot-details'

// import Loader from '../../customized/progress-bars/loader'
import Spacer from '../../customized/layout/spacer'

const styles = theme => ({
  // electionSelector: {
  //   marginTop: theme.spacing.unit * 4,
  //   margin: 'auto',
  //   width: '90%'
  // }
})

class Vote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, election, handleElectionSelectChange, electionList, hasVoted, userBallotDetails, ballotElection, loading, setHasVoted, theme } = this.props

    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}
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
          hasVoted={hasVoted}
        />

        <UserBallotDetails
          ballot={userBallotDetails}
          election={ballotElection}
          display={hasVoted}
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

  hasVoted: PropTypes.bool.isRequired
}

export default withTheme()(withStyles(styles)(Vote))