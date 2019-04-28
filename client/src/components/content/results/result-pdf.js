import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import ElectionResult from './election-result'

const styles = theme => ({
  root: {
    backgroundColor: '#f5f5f5',
    width: '210mm',
    minHeight: '297mm',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

class ResultPDF extends Component {
  render() {
    const { classes, currentFinishedElection } = this.props

    return (
      <div className={classes.root}>
        <ElectionResult 
          currentFinishedElection={currentFinishedElection}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ResultPDF);