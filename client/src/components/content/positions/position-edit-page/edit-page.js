import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import EditPageHeader from './edit-page-header'
import EditPageContent from './edit-page-content'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textField: {
    marginTop: 20,
    width: '50%',
  },

  cssFocused: {},
  notchedOutline: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#006064',
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#006064',
    },
  },
})

class EditPage extends React.Component {
  render() {
    const { classes, position, hasAbstain, handleAbstainCheckboxChange } = this.props

    return(
      <Paper className={classes.root}>
          <EditPageHeader position={position}/>
          <EditPageContent 
            position={position}
            hasAbstain={hasAbstain}
            handleAbstainCheckboxChange={handleAbstainCheckboxChange}
          />
      </Paper>
    )
  }
} 

EditPage.propTypes = {
  classes: PropTypes.object.isRequired,

  position: PropTypes.object.isRequired,
  hasAbstain: PropTypes.bool.isRequired,
  handleAbstainCheckboxChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditPage)