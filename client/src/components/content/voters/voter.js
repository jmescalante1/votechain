import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import VoterTableContainer from './voter-table-container'

const styles = theme => ({
  electionSelector: {
    marginTop: theme.spacing.unit * 4,
    margin: 'auto',
    width: '90%'
  }
})

class Voter extends Component {

  render() {
    const { classes, election, handleElectionSelectChange, electionList, electionData } = this.props
    
    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}

          fontSize={18}
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
          electionData={electionData}
        />

        <VoterTableContainer 
          election={election}
          electionData={electionData}
        />
      </div>
    )
  }
}

Voter.propTypes = {
  classes: PropTypes.object.isRequired,
  
  election: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired,
}

export default withStyles(styles)(Voter)