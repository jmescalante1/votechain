import React, { Component } from 'react';
import PropTypes from 'prop-types'

import CandidateResult from './candidate-result' 

class PositionResult extends Component {
  render() {
    const { position } = this.props

    return (
      <div>
        {position.name}
        {position.candidateList.map((candidate) => {
          return (
            <CandidateResult 
              key={candidate.id}
              candidate={candidate}
            />
          )
        })}
      </div>
    );
  }
}

PositionResult.propTypes = {
  position: PropTypes.shape({
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
  }).isRequired,
  
}

export default PositionResult;