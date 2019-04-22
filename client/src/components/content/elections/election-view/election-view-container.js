import React, { Component } from 'react'
import ElectionView from './election-view'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

import Ballot from './ballot'
import { fetchElection } from '../../../../actions/ballot'

class ElectionViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionList: {

      }
    }
    
    this.handleBallotChange = this.handleBallotChange.bind(this)
  }
  
  async handleBallotChange(candidateId, checked, position) {
    if(!this.state.positionList[position.id]){
      let noOfChecks = 0;
      let candidateIds = {}
      let positionState = {candidateIds, noOfChecks}
      
      await this.setState(prevState => ({
        positionList: {
          ...prevState.positionList,
          [position.id]: positionState
        }
      }))
    }

    if(this.state.positionList[position.id].noOfChecks < Number(position.maxNoOfCandidatesThatCanBeSelected) || !checked){
      let positionListClone = cloneDeep(this.state.positionList)
      positionListClone[position.id].candidateIds[candidateId] = checked

      if(checked){
        positionListClone[position.id].noOfChecks++
      } else {
        positionListClone[position.id].noOfChecks--
      }

      await this.setState({
        positionList: positionListClone
      })
    }
  }

  componentDidMount() {
    if(this.props.location.params) {
      const { web3, votechain, fetchElection, location } = this.props
      fetchElection(web3, votechain, location.params.election.id)
    }
  }
  
  render() {  
    if(!this.props.location.params){
      return <Redirect to='/elections' />
    }
    
    const { election } = this.props
    const { positionList } = this.state

    return (
      <div>
        {!isEmpty(election) ?   
          <div>
            <ElectionView election={election}/>
            <Ballot 
              election={election}
              positionListState={positionList}
              handleBallotChange={this.handleBallotChange}
            />
          </div> 
        : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
  election: state.ballot.election 
});

const mapDispatchToProps = {
  fetchElection
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectionViewContainer)