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
  constructor(props) {
    super(props);
    
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this)
  }
  
  onChangeRowsPerPage(option) {
    const { onChangeRowsPerPage } = this.props

    onChangeRowsPerPage(option.id)
  }

  render() {
    const { classes, label, options, rowsPerPage } = this.props
    
    const optionObjectList = options.map(option => {
      return {
        id: option,
        label: option,
      }
    })

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
            options={optionObjectList}
            onSelectChange={this.onChangeRowsPerPage}
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