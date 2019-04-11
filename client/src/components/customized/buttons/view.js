import React, { Component } from 'react'
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Pageview from '@material-ui/icons/Pageview'

const styles = theme => ({
  viewButton: {
    color: '#2196f3',
    '&:hover': {
      color: '#0d47a1'
    }
  },
})

class ViewButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <IconButton 
          size={size} 
          className={classes.viewButton}
          onClick={onClick}
        >
          <Pageview />
        </IconButton>
      </Tooltip>
    )
  }
}

ViewButton.propTypes = {
  classes: PropTypes.object.isRequired,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
};


export default withStyles(styles)(ViewButton)