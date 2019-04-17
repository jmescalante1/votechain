import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import ArrowRight from '@material-ui/icons/ArrowRight'

const styles = theme => ({
  button: {
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
    opacity: 0.5,
  }
})

class NextButton extends React.Component {
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
        <div className={classes.label}>Next</div>
        <ArrowRight className={classes.icon} />
      </Button>
    )
  }
}

NextButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default withStyles(styles)(NextButton)