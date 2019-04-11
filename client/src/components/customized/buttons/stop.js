import React, { Component } from 'react'
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Stop from '@material-ui/icons/Stop'

const styles = theme => ({
  stopButton: {
    color: '#3f51b5',
    '&:hover': {
      color: '#1a237e'
    }
  },
})

class StopButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <IconButton 
          size={size} 
          className={classes.stopButton}
          onClick={onClick}
        >
          <Stop />
        </IconButton>
      </Tooltip>
    )
  }
}

StopButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
};


export default withStyles(styles)(StopButton)