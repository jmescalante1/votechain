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
  label: {
    marginLeft: theme.spacing.unit
  }
})

class YesButton extends React.Component {
  render(){
    const { onClick, classes, size } = this.props

    return(
      <Fab
        size={size}
        variant='extended' 
        onClick={onClick} 
        className={classes.button}
      >
        <Done />
        <div className={classes.label}>Yes</div>
      </Fab>
    )
  }
}

YesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(YesButton)