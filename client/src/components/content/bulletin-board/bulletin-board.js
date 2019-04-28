import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ElectionSelector from '../../customized/selectors/election-selector'
import BulletinTableContainer from './bulletin-table-container'

class BulletinBoard extends Component {
  render() {
    const { electionId, handleElectionSelectChange, electionList } = this.props

    return (
      <div>
        <ElectionSelector 
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />
        <BulletinTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

BulletinBoard.propTypes = {
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
}

export default BulletinBoard