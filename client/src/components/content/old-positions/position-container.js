import React from 'react'

import Position from './position'

import { electionList, electionData } from './position-data'

class PositionContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      election: "",
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  } 
  
  handleElectionSelectChange(option) {
    if(option){
      this.setState({ election: option.value })
    } else {
      this.setState({ election: "" })
    }
  }

  render() {
    const { election } = this.state

    return(
      <Position
        election={election}
        handleElectionSelectChange={this.handleElectionSelectChange}
        electionList={electionList}
        electionData={electionData}
      />
    )
  }
}

export default PositionContainer