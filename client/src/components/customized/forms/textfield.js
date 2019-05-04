import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import FormValidator from '../forms/form-validator'

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
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      input: null,
      errorHelperText: null,
    }

    this.onChange = this.onChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.removeErrorState = this.removeErrorState.bind(this)
  }

  onChange(event) {
    const { onChange } = this.props
    const value = event.target.value
    this.setState({ input: value })

    this.validateInput(value)

    onChange(event)
  }

  removeErrorState() {
    this.setState({ 
      hasError: false, 
    });
  }

  validateInput(input) {
    const { formValidator, type } = this.props

    // if(formValidator) {
    //   if(formValidator.isRequired && type === 'text'){
    //     if(input === '' || input === undefined || input === null || input.trim().length === 0 ){
    //       this.setState({ 
    //         hasError: true,
    //         errorHelperText: formValidator.isRequired.helperText ? formValidator.isRequired.helperText : 'This field should not be empty'
    //       })
    //     } else {
    //       this.removeErrorState() }
    //   }
    // }
    
  }
  

  render() {
    const { classes, id, variant, label, defaultValue, type, fullWidth, required, autoFocus, onChange, errorMessage } = this.props

    // const { errorHelperText, hasError } = this.state

    return(
      <TextField
        error={Boolean(errorMessage)}
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
          }
        }}
        
        InputLabelProps={{
          classes:{
            root: classes.cssLabel,
            focused: classes.cssFocused,
            error: classes.cssLabelError
          }
        }}
        
        helperText={errorMessage}
        onChange={this.onChange}
      />
    )
  }
}

CustomizedTextField.propTypes = {
  classes: PropTypes.object.isRequired,

  variant: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number', 'text']).isRequired,

  required: PropTypes.bool,
  fullWidth: PropTypes.bool,

  onChange: PropTypes.func,
  helperText: PropTypes.string,
  formValidator: PropTypes.object ,
  errorMessage: PropTypes.string,
}

export default withStyles(styles)(CustomizedTextField)