import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Add from '@material-ui/icons/Add'

const styles = theme => ({
  addButton: {
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#1b5e20'
    }
  },
  addIcon: {
    color: '#fafafa',
  }
})

class CustomizedAddButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <Fab 
          size={size} 
          className={classes.addButton}
          onClick={onClick}
        >
          <Add className={classes.addIcon} />
        </Fab>
      </Tooltip>
    )
  }
}

CustomizedAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
};


export default withStyles(styles)(CustomizedAddButton)