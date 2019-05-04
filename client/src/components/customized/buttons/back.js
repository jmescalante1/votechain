import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import ArrowBack from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#b71c1c',
    '&:hover': {
      backgroundColor: '#f44336'
    }
  },
  label: {
    marginLeft: theme.spacing.unit
  }
})

class BackButton extends React.Component {
  render(){
    const { onClick, classes, size } = this.props

    return(
      <Fab
        size={size}
        variant='extended' 
        onClick={onClick} 
        className={classes.button}
      >
        <ArrowBack />
        <div className={classes.label}>Back</div>
      </Fab>
    )
  }
}

BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(BackButton)