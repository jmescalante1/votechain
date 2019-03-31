import React from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { withStyles } from '@material-ui/core/styles'

import StatusSymbol from '../elections/status-symbol'

const selectStyles = {
  control: styles => ({
    ...styles, 
    backgroundColor: '#fafafa',
    width: 600,
    fontSize: 20,
  }),
  placeholder: styles => ({
    ...styles,
  }),
  menu: styles => ({
    ...styles,
    width: 600,
    fontSize: 18
  }),
}

const styles = theme => ({
  root: {
    margin: 40
  },
  statusName: {
    fontSize: 18,
  },
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
    const { classes, election, handleElectionSelectChange, electionList, electionData } = this.props
    
    const options = electionList.map((election) => {
      return {
        value: election,
        label: election
      }
    })

    return(
      <Grid 
        className={classes.root}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item xs={9}>
          <Grid 
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
            spacing={16}
          >
            <Grid item>
              <Typography className={classes.label}>Position List of </Typography>
            </Grid>

            <Grid item>
              <Select 
                options={options} 
                placeholder={<Typography className={classes.placeholder}>Choose an election</Typography>}
                styles={selectStyles}
                isClearable={true}
                components={{ DropdownIndicator }}
                onChange={handleElectionSelectChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>      
          <Grid 
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
            spacing={8}
          >
            <Grid item>
              <Typography className={classes.statusName}>Status: </Typography>
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