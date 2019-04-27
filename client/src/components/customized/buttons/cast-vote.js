import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

import CastVoteIcon from '@material-ui/icons/HowToVote'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#1a237e',
    '&:hover': {
      backgroundColor: '#3f51b5'
    }
  },
  label: {
    marginLeft: theme.spacing.unit
  }
})

class CastVoteButton extends React.Component {
  render(){
    const { onClick, classes, size } = this.props

    return(
      <Tooltip
        title='Cast your vote'
        placement='right-end'
      >
        <Fab
          size={size}
          variant='extended' 
          onClick={onClick} 
          className={classes.button}
        >
          <CastVoteIcon />
          <div className={classes.label}>Vote</div>
        </Fab>
      </Tooltip>
    )
  }
}

CastVoteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(CastVoteButton)