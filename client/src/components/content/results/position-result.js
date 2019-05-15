import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import CandidateResult from './candidate-result' 

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  positionName: {
    fontSize: 25,
    color: '#212121',
  },
  abstain: {
    fontSize: 16,
  },
  noOfVotes: {
    fontSize: 16,
    color: '#9e9e9e'
  },
  list: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  }
})

class PositionResult extends Component {
  render() {
    const { position, classes } = this.props

    return (
      <div className={classes.root}>
        <Typography className={classes.positionName}>{position.name}</Typography>
        
        <div className={classes.list}>
          {position.candidateList.map((candidate) => {
            return (
              <CandidateResult 
                key={candidate.id}
                candidate={candidate}
              />
            )
          })}
          {position.hasAbstain && 
            <Grid 
              container
              direction='row'
              alignItems='center'
              justify='flex-start'
            >
              <Grid item xs={2}>
                <Typography className={classes.abstain}>{'Abstain ' }</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.noOfVotes}>{position.abstain.noOfVotesReceived}</Typography>  
              </Grid>
            </Grid>
          }
        </div>
      </div>
    )
  }
}

PositionResult.propTypes = {
  position: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hasAbstain: PropTypes.bool,
    maxNoOfCandidatesThatCanBeSelected: PropTypes.number,

    candidateList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      positionId: PropTypes.number,
      positionName: PropTypes.string,
      noOfVotesReceived: PropTypes.number,
    }))
  }).isRequired,
  
}

export default withStyles(styles)(PositionResult)