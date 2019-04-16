import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Menu from '../../selectors/menu'

const styles = theme => ({
  label: {
    color: '#fafafa'
  }, 
  menuButton: {
    color: '#fafafa'
  }
})

class RowsPerPageOptions extends Component {
  render() {
    const { classes, label, options, onChangeRowsPerPage, rowsPerPage } = this.props

    return (
      <Grid 
        container 
        direction='row'
        alignItems='center'
        justify='flex-start'
        spacing={16}
      >
        <Grid item>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>
        <Grid item> 
          <Menu 
            label={rowsPerPage}
            options={options}
            onSelectChange={onChangeRowsPerPage}
            classes={{
              button: classes.menuButton
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

RowsPerPageOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
}

export default withStyles(styles)(RowsPerPageOptions)