import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'

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
    marginLeft: theme.spacing.unit,
    color: '#fafafa',
  },
  icon: {
    color: '#fafafa',
  },
  disabled: {
    backgroundColor: 'white'
  }
})

class SubmitButton extends React.Component {
  render(){
    const { onClick, classes, size, disabled } = this.props

    return(
      <Fab
        size={size}
        variant='extended' 
        onClick={onClick} 
        disabled={disabled}
        className={classes.button}
        classes={{
          disabled: classes.disabled
        }}
      >
        <Done className={classes.icon}/>
        <div className={classes.label}>Submit</div>
      </Fab>
    )
  }
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default withStyles(styles)(SubmitButton)