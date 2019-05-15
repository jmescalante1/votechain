import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import ElectionResult from './election-result'
import Spacer from '../../customized/layout/spacer'

const styles = theme => ({
  electionSelector: {
    width: '100%'
  },
})

class Result extends Component {

  render() {
    const { classes, theme, electionId, finishedElectionList, handleElectionSelectChange, currentFinishedElection } = this.props
    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}

          fontSize={18}
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={finishedElectionList}
        />
      
        <Spacer width='100%' height={theme.spacing.unit * 4}/>

        {!isEmpty(currentFinishedElection) &&
          <ElectionResult 
            currentFinishedElection={currentFinishedElection}
          />
        }
      </div>
    )
  }
}

Result.propTypes = {
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  finishedElectionList: PropTypes.arrayOf(PropTypes.object).isRequired,
 
  currentFinishedElection: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,

    positionList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      hasAbstain: PropTypes.bool,
      maxNoOfCandidatesThatCanBeSelected: PropTypes.number,

      candidateList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        positionId: PropTypes.number,
        positionName: PropTypes.string,
        noOfVotesReceived: PropTypes.number,
      }))
    }))
  }).isRequired,
}

export default withTheme()(withStyles(styles)(Result))