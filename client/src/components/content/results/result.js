import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import ElectionSelector from '../../customized/selectors/election-selector'
import ElectionResult from './election-result'
import ResultPDF from './result-pdf'
import Export from '../../export/export'


class Result extends Component {

  render() {
    const { electionId, finishedElectionList, handleElectionSelectChange, currentFinishedElection } = this.props
    return (
      <div>
        <ElectionSelector 
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={finishedElectionList}
        />
        {!isEmpty(currentFinishedElection) &&
          <div>
            <ElectionResult 
              currentFinishedElection={currentFinishedElection}
            />
            <Export 
              document={<ResultPDF currentFinishedElection={currentFinishedElection}/>}
              fileName='Election Results.pdf'
            />
          </div>
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

export default Result