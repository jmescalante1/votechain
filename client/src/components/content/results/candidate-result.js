import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CandidateResult extends Component {
  render() {
    const { candidate } = this.props

    return (
      <div>
        <div>{candidate.name}: {candidate.noOfVotesReceived}</div>    
      </div>
    )
  }
}

CandidateResult.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    positionId: PropTypes.number,
    positionName: PropTypes.string,
    noOfVotesReceived: PropTypes.number,
  }).isRequired
}

export default CandidateResult