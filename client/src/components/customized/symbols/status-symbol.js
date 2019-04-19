import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'

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
  
  constructor(){
    super()

    this.capitalize = this.capitalize.bind(this)
  }

  capitalize(string) {
    if((typeof string) == 'string' && string.length > 0){
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return ""
  }

  render() {
    const { classes, variant } = this.props
    return(
      <Tooltip 
        title={this.capitalize(variant)}
        placement='bottom-start'
        enterDelay={300}
      >
        <div className={classNames(classes.default, {
          [classes.pending]: variant === 'Pending',
          [classes.ongoing]: variant === 'Ongoing',
          [classes.finished]: variant === 'Finished'
        })}>
        </div>
      </Tooltip>
    )
  }
}

StatusSymbol.propTypes = {
  variant: PropTypes.oneOf(['Pending', 'Ongoing', 'Finished'])
}

export default withStyles(styles)(StatusSymbol)