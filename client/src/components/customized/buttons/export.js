import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import SaveAlt from '@material-ui/icons/SaveAlt'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#1a237e',
    '&:hover': {
      backgroundColor: '#3f51b5'
    }
  },
  label: {
    marginLeft: theme.spacing.unit,
  },
})

class ExportButton extends React.Component {
  render(){
    const { onClick, classes, size } = this.props

    return(
      <Fab
        size={size}
        variant='extended' 
        onClick={onClick} 
        className={classes.button}
      >
        <SaveAlt />
        <div className={classes.label}>Export</div>
      </Fab>
    )
  }
}

ExportButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default withStyles(styles)(ExportButton)