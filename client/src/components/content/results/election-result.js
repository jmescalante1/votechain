import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import Export from '../../export/export'
import ResultPDF from './result-pdf'
import PositionResult from './position-result'

const styles = theme => ({
  root: {},
  
  positionName: {
    fontSize: 25,
    color: '#212121',
  },
  header: {
    backgroundColor: '#212121',
    height: theme.spacing.unit * 8,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  title: {
    fontWeight: 'bold',
    color: '#f5f5f5',
    fontSize: 30
  }
})

class ElectionResult extends Component {
  render() {
    const { classes, currentFinishedElection: election } = this.props

    return (
      <Paper className={classes.root}>
        <Grid
          container
          direction='row'
          alignItems='center'
          justify='space-between'
          className={classes.header}
        >
          <Grid item>
            <Typography  className={classes.title}>
              {election.name}
            </Typography>
          </Grid>
          <Grid item>
            <Export 
              document={<ResultPDF currentFinishedElection={election}/>}
              fileName='Election Results.pdf'
              color='#212121'
            />
          </Grid>
        </Grid>
        {election.positionList.map((position) => {
          return (
            <Fragment key={position.id}>
              <Divider />
              <PositionResult 
                position={position}
              />
            </Fragment>
          )
        })}        
      </Paper>
    )
  }
}

ElectionResult.propTypes = {
  currentFinishedElection: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,

    positionList: PropTypes.arrayOf(PropTypes.shape({
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
    }))
  }).isRequired,
}

export default withStyles(styles)(ElectionResult)