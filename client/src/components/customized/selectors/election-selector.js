import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import StatusSymbol from '../symbols/status-symbol'
import CustomizedSelect from './select'

const styles = theme => ({
  root: {},
  statusName: {
    fontSize: 18,
  },
})

class ElectionSelector extends React.Component {
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
    const { classes, fontSize, election, handleElectionSelectChange, electionList, electionData } = this.props
    
    const options = electionList.map((election) => {
      return {
        value: election,
        label: election
      }
    })

    const selectStyles = {
      control: styles => ({
        ...styles, 
        backgroundColor: '#fafafa',
        width: '100%',
        fontSize: fontSize,
      }),
      menu: styles => ({
        ...styles,
        width: '100%',
        fontSize: fontSize
      }),
    }

    return(
      <Grid 
        className={classes.root}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item xs={9}>
          <CustomizedSelect 
            selectStyles={selectStyles}
            options={options}
            onChange={handleElectionSelectChange}
            placeholder={<Typography style={{fontSize: fontSize}}>Select</Typography>}
            label={<Typography style={{fontSize: fontSize}}>Election</Typography>}
            isClearable
          />
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

ElectionSelector.propTypes = {
  classes: PropTypes.object.isRequired,

  election: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired
}

export default withStyles(styles)(ElectionSelector)