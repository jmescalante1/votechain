import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {},
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
    const { classes, id, variant, label, defaultValue, type, fullWidth, required, autoFocus } = this.props

    return(
      <TextField
        className={classes.root}
        type={type}
        autoFocus={autoFocus}
        required={required}
        id={id}
        label={label}
        fullWidth={fullWidth}
        defaultValue={defaultValue}
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
  type: PropTypes.string.isRequired,

  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
}

export default withStyles(styles)(CustomizedTextField)