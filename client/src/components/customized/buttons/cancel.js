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
})

class CancelButton extends React.Component {
  render(){
    const { handleOnClick, classes } = this.props

    return(
      <Fab
        size='large'
        variant='extended' 
        onClick={handleOnClick} 
        className={classes.button}
      >
        <Cancel />
        Cancel
      </Fab>
    )
  }
}

CancelButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired
}

export default withStyles(styles)(CancelButton)