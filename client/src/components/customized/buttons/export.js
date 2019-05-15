import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

import Launch from '@material-ui/icons/Launch'

const styles = theme => ({
  actionIcon:{
    marginLeft: theme.spacing.unit,
    color: '#006064'
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    color: '#006064'
  }, 
})

class ExportButton extends React.Component {
  render(){
    const { onClick, classes, size, color } = this.props

    return(
      <Tooltip title='Export election result'>
        <Fab
          size={size}
          variant='extended' 
          onClick={onClick} 
          className={classes.fab}
          style={{color: color ? color : '#006064'}}
        >
          Export
          <Launch className={classes.actionIcon}
            style={{color: color ? color : '#006064'}}
          />
        </Fab>
      </Tooltip>
    )
  }
}

ExportButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(ExportButton)