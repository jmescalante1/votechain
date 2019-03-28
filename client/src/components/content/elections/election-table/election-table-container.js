import React from 'react'

import ElectionTable from './election-table'

import electionData from './election-data'

class ElectionTableContainer extends React.Component {
  render() {
    return (
      <ElectionTable electionData={electionData} />
    )
  }
}

export default ElectionTableContainer
