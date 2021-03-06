import React, { Component } from 'react'
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Edit from '@material-ui/icons/Edit'

const styles = theme => ({
  editButton: {
    color: '#ff9800',
    '&:hover': {
      color: '#e65100'
    }
  },
})

class EditButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick, iconSize, disabled } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <div>
          <IconButton 
            size={size} 
            className={classes.editButton}
            onClick={onClick}
            disabled={disabled}
          >
            <Edit style={{fontSize: iconSize}}/>
          </IconButton>
        </div>
      </Tooltip>
    )
  }
}

EditButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
  disabled: PropTypes.bool,
};


export default withStyles(styles)(EditButton)