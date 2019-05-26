import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import ElectionResult from './election-result'
import Spacer from '../../customized/layout/spacer'
import Loader from '../../customized/progress-bars/loader'

const styles = theme => ({
  electionSelector: {
    width: '100%'
  },
})

class Result extends Component {

  render() {
    const { classes, theme, election, finishedElectionList, handleElectionSelectChange, currentFinishedElection, loading } = this.props

    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}
          label='Finished Election'
          fontSize={18}
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={finishedElectionList}
        />
      
        <Spacer width='100%' height={theme.spacing.unit * 4}/>

        { loading
          ? <Loader />
          : !isEmpty(currentFinishedElection) &&
            <ElectionResult 
              currentFinishedElection={currentFinishedElection}
            />
        }
      </div>
    )
  }
}

Result.propTypes = {
  election: PropTypes.object,
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

  loading: PropTypes.bool.isRequired
}

export default withTheme()(withStyles(styles)(Result))