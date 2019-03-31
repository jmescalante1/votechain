import React from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'


const selectStyles = {
  control: styles => ({
    ...styles, 
    backgroundColor: '#fafafa',
    width: 600
  }),
  placeholder: styles => ({
    ...styles,
  }),
  menu: styles => ({
    ...styles,
    width: 600
  })
}

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ArrowDropDown style={{fontSize: 30}}/>
      </components.DropdownIndicator>
    )
  );
};

class PositionToolbar extends React.Component {

  render(){
    const { electionList, electionData } = this.props

    const options = electionList.map((election) => {
      return {
        value: election,
        label: election
      }
    })

    return(
      <Select 
        options={options} 
        placeholder={<Typography>Choose an election</Typography>}
        styles={selectStyles}
        isClearable={true}
        components={{ DropdownIndicator }}
      />
    )
  }
}

PositionToolbar.propTypes = {
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired
}

export default PositionToolbar