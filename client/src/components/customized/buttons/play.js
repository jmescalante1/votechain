import React, { Component } from 'react'
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled'

const styles = theme => ({
  playButton: {
    color: '#4caf50',
    '&:hover': {
      color: '#1b5e20'
    }
  },
})

class PlayButton extends Component {
  render() {
    const { classes, tooltipTitle, placement, size, onClick } = this.props

    return (
      <Tooltip
        title={tooltipTitle}
        placement={placement}
      >
        <IconButton 
          size={size} 
          className={classes.playButton}
          onClick={onClick}
        >
          <PlayCircleFilled />
        </IconButton>
      </Tooltip>
    )
  }
}

PlayButton.propTypes = {
  classes: PropTypes.object.isRequired,
  // onClick: PropTypes.func.isRequired,

  tooltipTitle: PropTypes.string,
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  size: PropTypes.oneOf(['small','medium','large']),
};


export default withStyles(styles)(PlayButton)