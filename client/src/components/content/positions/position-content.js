import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import PositionContentBody from './position-content-body'
import PositionContentHeader from './position-content-header'

const styles = theme => ({
  root: {},
  paper: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#006064',
  },
})

class PositionContent extends Component {
  render() {
    const { classes, election, electionData } = this.props

    return (
      <div className={classes.root}>
        {election && <Paper className={classes.paper}>
          <PositionContentHeader />
          <PositionContentBody 
            election={election}
            electionData={electionData}
          />
        </Paper>}
      </div>
    );
  }
}

export default withStyles(styles)(PositionContent);
