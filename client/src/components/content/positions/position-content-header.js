import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddPositionButton from '../../customized/buttons/add'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
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
          <AddPositionButton 
            tooltipTitle='Add new position'
            placement='left'
            size='large'
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(PositionContentHeader)