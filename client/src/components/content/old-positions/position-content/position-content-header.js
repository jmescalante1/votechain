import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddPositionButton from '../../../customized/buttons/add'
import AddPositionDialog from '../../../customized/dialogs/add-position'

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
    const { classes, openAddPositionDialog, handleCloseAddPositionDialog, handleOpenAddPositionDialog } = this.props
    const { hasAbstain, handleAbstainCheckboxChange } = this.props

    return (
      <Fragment>
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
              onClick={handleOpenAddPositionDialog}
            />
          </Grid>
        </Grid>

        <AddPositionDialog 
          openDialog={openAddPositionDialog}
          onClose={handleCloseAddPositionDialog}

          hasAbstain={hasAbstain}
          handleAbstainCheckboxChange={handleAbstainCheckboxChange}
        />
      </Fragment>
    )
  }
}

PositionContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddPositionDialog: PropTypes.bool.isRequired,
  hasAbstain: PropTypes.bool.isRequired,
  
  handleOpenAddPositionDialog: PropTypes.func.isRequired,
  handleCloseAddPositionDialog: PropTypes.func.isRequired,
  handleAbstainCheckboxChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PositionContentHeader)