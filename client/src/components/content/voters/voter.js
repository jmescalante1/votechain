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
    const { classes, electionId, handleElectionSelectChange, electionList } = this.props
    
    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}

          fontSize={18}
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />

        <VoterTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

Voter.propTypes = {
  classes: PropTypes.object.isRequired,
  
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
}

export default withStyles(styles)(Voter)