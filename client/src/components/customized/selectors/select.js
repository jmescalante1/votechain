import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { withStyles } from '@material-ui/core/styles'

const selectStyles = {
  control: styles => ({
    ...styles, 
    backgroundColor: '#fafafa',
    width: '100%',
    fontSize: 20,
  }),
  placeholder: styles => ({
    ...styles,
  }),
  menu: styles => ({
    ...styles,
    width: '100%',
    fontSize: 18
  }),
}

const styles = theme => ({
  placeholder: {
    fontSize: 18
  },
  label: {
    fontSize: 18
  }
})

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ArrowDropDown style={{fontSize: 30}}/>
      </components.DropdownIndicator>
    )
  )
}

class CustomizedSelect extends Component {
  render() {
    const { classes, label, placeholder, options, isClearable, onChange } = this.props

    return (
      <Grid 
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={16}
      >
        <Grid item>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>

        <Grid item style={{width: '60%'}}>
          <Select 
            options={options} 
            placeholder={<Typography className={classes.placeholder}>{placeholder}</Typography>}
            styles={selectStyles}
            isClearable={isClearable}
            components={{ DropdownIndicator }}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    )
  }
}

CustomizedSelect.propTypes = {
  classes: PropTypes.object.isRequired,

  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}


export default withStyles(styles)(CustomizedSelect)