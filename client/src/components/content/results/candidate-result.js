import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  candidateName: {
    fontSize: 16,
  },
  noOfVotes: {
    fontSize: 16,
    color: '#9e9e9e'
  }
})

class CandidateResult extends Component {
  render() {
    const { classes, candidate } = this.props
        
    return (
      <Grid 
        container
        direction='row'
        alignItems='center'
        justify='flex-start'
      >
        <Grid item xs={2}>
          <Typography className={classes.candidateName}>{candidate.name}</Typography>    
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.noOfVotes}>{candidate.noOfVotesReceived}</Typography>  
        </Grid>
      </Grid>
    )
  }
}

CandidateResult.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    positionId: PropTypes.number,
    positionName: PropTypes.string,
    noOfVotesReceived: PropTypes.number,
  }).isRequired
}

export default withStyles(styles)(CandidateResult)