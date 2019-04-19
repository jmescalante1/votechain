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
  constructor(props) {
    super(props)

    this.getStatus = this.getStatus.bind(this)
    this.getPlaceholder = this.getPlaceholder.bind(this)
  }
  
  getStatus(electionId) {
    const { electionList } = this.props

    if(electionId) {
      let index = electionList.findIndex(x => x.id === electionId)
      return electionList[index].status
      
    }
  }

  getPlaceholder(options){
    const { electionId } = this.props
    
    if(electionId){
      const election = options.find(option => option.value === electionId)
      return election.id + ' - ' + election.name
    }

    return 'Select'
  }

  render(){
    const { classes, fontSize, electionId, handleElectionSelectChange, electionList } = this.props
    
    const options = electionList.map((election) => {
      return {
        value: election.id,
        label: (election.id + ' - ' + election.name)
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
            placeholder={<Typography style={{fontSize: fontSize}}>{this.getPlaceholder(options)}</Typography>}
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
                variant={this.getStatus(electionId)}
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

  electionId: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
}

export default withStyles(styles)(ElectionSelector)