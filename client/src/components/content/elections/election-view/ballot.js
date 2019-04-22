import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PositionRadioGroup from '../../../customized/selectors/position-radio-group'
import SubmitButton from '../../../customized/buttons/submit'

class Ballot extends Component {
  constructor(props) {
    super(props);
    
    this.handlePositionChange = this.handlePositionChange.bind(this)
  }
  
  handlePositionChange(candidateId, checked, position) {
    this.props.handleBallotChange(candidateId, checked, position)
  }

  render() {
    const { election, positionListState, handleOpenSubmitDialog } = this.props

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
        <SubmitButton onClick={handleOpenSubmitDialog}/>
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