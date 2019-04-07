import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  textField: {
    marginTop: 20,
    width: 500,
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

class CustomizedTextField extends React.Component {
  render() {
    const { classes, id, variant, label } = this.props

    return(
      <TextField
        className={classes.textField}
        autoFocus
        required
        id={id}
        label={label}
        fullWidth
        variant={variant}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        }}
        InputLabelProps={{
          classes:{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
      />
    )
  }
}

CustomizedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default withStyles(styles)(CustomizedTextField)