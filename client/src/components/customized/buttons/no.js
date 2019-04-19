import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import Cancel from '@material-ui/icons/Cancel'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#b71c1c',
    '&:hover': {
      backgroundColor: '#f44336'
    }
  },
  label: {
    marginLeft: theme.spacing.unit
  }
})

class NoButton extends React.Component {
  render(){
    const { onClick, classes, size } = this.props

    return(
      <Fab
        size={size}
        variant='extended' 
        onClick={onClick} 
        className={classes.button}
      >
        <Cancel />
        <div className={classes.label}>No</div>
      </Fab>
    )
  }
}

NoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(NoButton)