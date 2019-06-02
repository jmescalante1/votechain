import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'

import Grid from '@material-ui/core/Grid'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

const defaultSelectStyles = {
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
    const { label, placeholder, options, isClearable, onChange, selectStyles, width } = this.props

    return (
      <Grid 
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={16}
      >
        <Grid item>
          {label}
        </Grid>

        <Grid item style={{width: width}}>
          <Select 
            options={options} 
            placeholder={placeholder}
            styles={selectStyles ? selectStyles: defaultSelectStyles}
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
  label: PropTypes.object.isRequired,
  placeholder: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
}


export default CustomizedSelect