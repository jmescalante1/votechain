import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import StatusSymbol from '../elections/status-symbol'

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
  }),
}

const styles = theme => ({
 
})

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
  constructor(){
    super()

    this.getStatus = this.getStatus.bind(this)
  }

  getStatus(election) {
    if(election){
      return election.status
    } 

    return ""
  }

  render(){
    const { election, handleElectionSelectChange, electionList, electionData } = this.props
    
    const options = electionList.map((election) => {
      return {
        value: election,
        label: election
      }
    })

    return(
      <Grid 
        container
        direction='column'
        justify='flex-start'
        alignItems='flex-start'
        spacing={16}
      >
        <Grid item>
          <Select 
            options={options} 
            placeholder={<Typography>Choose an election</Typography>}
            styles={selectStyles}
            isClearable={true}
            components={{ DropdownIndicator }}
            onChange={handleElectionSelectChange}
          />
        </Grid>

        <Grid item>      
          <Grid 
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
            spacing={8}
          >
            <Grid item>
              <Typography>Status: </Typography>
            </Grid>

            <Grid item >
              <StatusSymbol 
                variant={this.getStatus(electionData[election])} 
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

PositionToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  election: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired
}

export default withStyles(styles)(PositionToolbar)