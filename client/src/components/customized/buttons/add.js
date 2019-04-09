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
    const { classes, tooltipTitle, placement, size } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <Fab 
          size={size} 
          className={classes.addButton}
        >
          <Add className={classes.addIcon} />
        </Fab>
      </Tooltip>
    )
  }
}

CustomizedAddButton.propTypes = {
  classes: PropTypes.object.isRequired,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.string,
  size: PropTypes.string,
};


export default withStyles(styles)(CustomizedAddButton)