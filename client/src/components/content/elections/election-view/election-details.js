import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../../../customized/texts/title'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import StatusSymbol from '../../../customized/symbols/status-symbol'

const styles = theme => ({
  paper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#64b5f6'
  },
  detail: {
    fontSize: 16,
    margin: theme.spacing.unit * 2,
  }
})

class ElectionDetails extends Component {
  render() {
    const { election, classes } = this.props

    return (
      <Paper className={classes.paper}>
        <Title fontSize={30}>
          {election.name}
        </Title>

        <Grid
          container
          direction='column'
          alignItems='flex-start'
          justify='flex-start'
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='flex-start'
            spacing={8}
          >
            <Grid item>
              <Typography className={classes.detail}>Status:</Typography>
            </Grid>

            <Grid item>
              <StatusSymbol variant={election.status}/>
            </Grid>
          </Grid>

          <Grid item>
            <Typography className={classes.detail}>Votes: {election.noOfVotes}</Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.detail}>Voters: {election.noOfVoters}</Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.detail}>Positions: {election.noOfPositions}</Typography>
          </Grid>

          <Grid item>
            <Typography className={classes.detail}>Candidates: {election.noOfCandidates}</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

ElectionDetails.propTypes = {
  election: PropTypes.object.isRequired
}

export default withStyles(styles)(ElectionDetails)