import React, { Component } from 'react';
import { connect } from 'react-redux'

import BulletinBoard from '../bulletin-board/bulletin-board'

class BulletinBoardContainer extends Component {
  constructor(){
    super()

    this.state = {
      electionId: null,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
    this.getFinishedAndOngoing = this.getFinishedAndOngoing.bind(this)
  } 

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ electionId: option.value })
    } else {
      this.setState({ electionId: null})
    }
  }

  getFinishedAndOngoing(electionList) {
    return electionList.filter((election) => election.status === 'Ongoing' || election.status === 'Finished')
  }

  render() {
    const { electionList } = this.props
    const{ electionId } = this.state

    let filtered = this.getFinishedAndOngoing(electionList)
    
    return (
      <div>
        <BulletinBoard 
          electionId={electionId}
          handleElectionSelectChange={this.handleElectionSelectChange}
          electionList={filtered}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  electionList: state.election.electionList
});

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoardContainer)