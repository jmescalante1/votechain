import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import Title from '../../customized/texts/title'

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 2
  },
  sectionDivider: {
    backgroundColor: '#212121'
  },
  section: {
   padding: theme.spacing.unit * 2
  },
  columnTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  candidateName: {
    color: '#9e9e9e',
    fontSize: 20
  },
  positionName: {
    fontSize: 20
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold'
  }
})

class UserBallotDetails extends Component {
  render() {
    const { classes, ballot, election, display } = this.props

    if(!display) {
      return (
        <div></div>
      )
    }

    return (
      <Paper className={classes.root}>
        <Title fontSize={30}>{election.name}</Title>

        <div className={classes.content}>
          <Typography className={classes.sectionTitle}>Your Votes</Typography> 

          <Divider className={classes.sectionDivider}/>

          <Grid
            className={classes.section}
            container
            direction='column'
            alignItems='flex-start'
            justify='center'
          >
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='flex-start'
            >
              <Grid item xs={3}><Typography className={classes.columnTitle}>Positions</Typography></Grid>
              <Grid item xs={3}><Typography className={classes.columnTitle}>Candidates</Typography></Grid>
            </Grid>

            {Object.keys(ballot).map((positionName, index) => {
              let votedCandidates = ballot[positionName].candidateNames
              return(
                <Grid
                  key={index}
                  container
                  direction='row'
                  alignItems='center'
                  justify='flex-start'
                >
                  <Grid item xs={3}><Typography className={classes.positionName}>{positionName}</Typography></Grid>
                  
                  <Grid item xs={3}>
                    <Grid
                      container
                      direction='row'
                      alignItems='center'
                      justify='flex-start'
                    >
                      {votedCandidates.map((candidateName, index) => {
                        return(
                          <Grid key={index} item>
                            <Typography className={classes.candidateName} >{candidateName}{index !== votedCandidates.length - 1 ? ', ' : ''}</Typography>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </Paper>
    )
  }
}

UserBallotDetails.propTypes = {
  display: PropTypes.bool.isRequired
}

export default withStyles(styles)(UserBallotDetails)