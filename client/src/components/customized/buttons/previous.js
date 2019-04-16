import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import ArrowLeft from '@material-ui/icons/ArrowLeft'

const styles = theme => ({
  button: {
    backgroundColor: '#b71c1c',
    '&:hover': {
      backgroundColor: '#f44336'
    },
  },
  label: {
    marginLeft: theme.spacing.unit,
    color: '#fafafa',
  },
  icon: {
    color: '#fafafa'
  },
  disabled: {
    opacity: 0.5,
  }
})

class PreviousButton extends React.Component {
  render(){
    const { onClick, classes, size, disabled } = this.props

    return(
      <Button
        size={size}
        variant='text' 
        onClick={onClick} 
        disabled={disabled}
        className={classes.button}
        classes={{
          disabled: classes.disabled
        }}
      >
        <ArrowLeft className={classes.icon}/>
        <div className={classes.label}>Previous</div>
      </Button>
    )
  }
}

PreviousButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default withStyles(styles)(PreviousButton)