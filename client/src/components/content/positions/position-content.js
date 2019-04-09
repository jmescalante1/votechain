import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import PositionContentBody from './position-content-body'
import PositionContentHeader from './position-content-header'

const styles = theme => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#006064',
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 4
  },
})

class PositionContent extends Component {
  render() {
    const { classes, election, electionData } = this.props

    return (
      <div>
        {election && <Paper className={classes.root}>
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
