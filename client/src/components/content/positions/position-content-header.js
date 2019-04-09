import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

class PositionContentHeader extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography className={classes.label}>Positions</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(PositionContentHeader)