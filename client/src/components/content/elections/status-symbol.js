import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// add tooltip

const styles = theme => ({
  default: {

  },
  pending: {
    height: 20,
    width: 20,
    backgroundColor: '#2196f3',
    borderRadius: '50%',  
  },
  ongoing: {
    height: 20,
    width: 20,
    backgroundColor: '#4caf50',
    borderRadius: '50%',  
  },
  finished: {
    height: 20,
    width: 20,
    backgroundColor: '#f44336',
    borderRadius: '50%',  
  }, 
  
})

class StatusSymbol extends React.Component {
  
  render() {
    const { classes, variant } = this.props
    
    return(
      <div className={classNames(classes.default, {
        [classes.pending]: variant === 'pending',
        [classes.ongoing]: variant === 'ongoing',
        [classes.finished]: variant === 'finished'
      })}>
      </div>
    )
  }
}

export default withStyles(styles)(StatusSymbol)