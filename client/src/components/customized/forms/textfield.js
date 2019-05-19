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
      borderColor: theme.palette.highlight.main,
    },
  },
  cssOutlinedInputError: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.palette.highlight.main,
    },
  },
  cssLabelError: {
    '&$cssFocused': {
      color: theme.palette.error.main,
    },
  }
})

class CustomizedTextField extends React.Component {
  render() {
    const { classes, id, variant, label, defaultValue, type, fullWidth, required, autoFocus, onChange, error, startAdornment } = this.props

    return(
      <TextField
        error={Boolean(error)}
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
            notchedOutline: classes.notchedOutline,
            error: classes.cssOutlinedInputError
          },
          startAdornment: startAdornment
        }}
        
        InputLabelProps={{
          classes:{
            root: classes.cssLabel,
            focused: classes.cssFocused,
            error: classes.cssLabelError
          }
        }}
        
        helperText={error}
        onChange={onChange}
      />
    )
  }
}

CustomizedTextField.propTypes = {
  classes: PropTypes.object.isRequired,

  variant: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number', 'text']).isRequired,

  required: PropTypes.bool,
  fullWidth: PropTypes.bool,

  onChange: PropTypes.func,
  helperText: PropTypes.string,
  formValidator: PropTypes.object ,
  error: PropTypes.string,
}

export default withStyles(styles)(CustomizedTextField)