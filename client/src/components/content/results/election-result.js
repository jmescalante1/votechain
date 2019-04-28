import React, { Component } from 'react';
import PropTypes from 'prop-types'

import PositionResult from './position-result'

class ElectionResult extends Component {
  render() {
    const { currentFinishedElection } = this.props

    return (
      <div>
        {currentFinishedElection.positionList.map((position) => {
          return (
            <PositionResult 
              key={position.id}
              position={position}
            />
          )
        })}        
      </div>
    )
  }
}

ElectionResult.propTypes = {
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

export default ElectionResult;