import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import Done from '@material-ui/icons/Done'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#1b5e20',
    '&:hover': {
      backgroundColor: '#4caf50'
    }
  },
})

class SubmitButton extends React.Component {
  render(){
    const { handleOnClick, classes } = this.props

    return(
      <Fab
        size='large'
        variant='extended' 
        onClick={handleOnClick} 
        className={classes.button}
      >
        <Done />
        Submit
      </Fab>
    )
  }
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnClick: PropTypes.func.isRequired
}

export default withStyles(styles)(SubmitButton)