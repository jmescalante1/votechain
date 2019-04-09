import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddPositionButton from '../../customized/buttons/add-position'

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
      <Grid 
        className={classes.root}
        container
        direction='row'
        alignItems='center'
        justify='space-between'
      >
        <Grid item>
          <Typography className={classes.label}>Positions</Typography>
        </Grid>

        <Grid item>
      
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(PositionContentHeader)