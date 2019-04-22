import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PositionRadioGroup from '../../../customized/selectors/position-radio-group'

class Ballot extends Component {
  constructor(props) {
    super(props);
    
    this.handlePositionChange = this.handlePositionChange.bind(this)
  }
  
  handlePositionChange(candidateId, checked, position) {
    this.props.handleBallotChange(candidateId, checked, position)
  }

  render() {
    const { election } = this.props
    const { positionListState } = this.props

    return (
      <div>
        {election.positionList.map((position) => {
          return (
            <PositionRadioGroup 
              key={position.id}
              position={position}
              positionState={positionListState[position.id]}
              handlePositionChange={this.handlePositionChange}
            />
          )
        })}
        
      </div>
    )
  }
}

Ballot.propTypes = {
  election: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,

    positionList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hasAbstain: PropTypes.bool.isRequired,
      maxNoOfCandidatesThatCanBeSelected: PropTypes.string.isRequired,

      candidateList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        positionId: PropTypes.string.isRequired,
        positionName: PropTypes.string.isRequired,
      })).isRequired
    })).isRequired
  }).isRequired,

  handleBallotChange: PropTypes.func.isRequired
}

export default Ballot