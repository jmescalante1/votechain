import React, { Component } from 'react'
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Delete from '@material-ui/icons/Delete'

const styles = theme => ({
  deleteButton: {
    color: '#f44336',
    '&:hover': {
      color: '#b71c1c'
    }
  },
})

class DeleteButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick, disabled } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <div>
          <IconButton 
            size={size} 
            className={classes.deleteButton}
            onClick={onClick}
            disabled={disabled}
          >
          <Delete />
        </IconButton>
        </div>
      </Tooltip>
    )
  }
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
  disabled: PropTypes.bool,
};


export default withStyles(styles)(DeleteButton)