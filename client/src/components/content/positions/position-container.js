import React from 'react'

import Position from './position'

import { electionList, electionData } from './position-data'

class PositionContainer extends React.Component {
  render() {
    return(
      <Position 
        electionList={electionList}
        electionData={electionData}
      />
    )
  }
}

export default PositionContainer