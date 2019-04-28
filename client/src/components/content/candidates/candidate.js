import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import CandidateTableContainer from './candidate-table-container'

const styles = theme => ({
  electionSelector: {
    marginTop: theme.spacing.unit * 4,
    margin: 'auto',
    width: '90%'
  }
})

class Candidate extends Component {

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

        <CandidateTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

Candidate.propTypes = {
  classes: PropTypes.object.isRequired,
  
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles)(Candidate)