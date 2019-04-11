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
    const { classes, tooltipTitle, placement, size, onClick } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <IconButton 
          size={size} 
          className={classes.deleteButton}
          onClick={onClick}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    )
  }
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  // onClick: PropTypes.func.isRequired,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
};


export default withStyles(styles)(DeleteButton)