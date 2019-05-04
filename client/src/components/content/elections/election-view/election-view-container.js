import React, { Component } from 'react'
import ElectionView from './election-view'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

import { fetchElectionDetails } from '../../../../actions/election'
import { fetchCurrentVoteList } from '../../../../actions/vote'

class ElectionViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionList: {
        /* Structure
          positionId: {
            candidateIds:{

            }
            noOfChecks
          }
        */
      },
      openSubmitBallotDialog: false,
      candidateKeyList: [],
    }
    
    this.handleBallotChange = this.handleBallotChange.bind(this)
   
    this.handleCloseSubmitDialog = this.handleCloseSubmitDialog.bind(this)
    this.handleOpenSubmitDialog = this.handleOpenSubmitDialog.bind(this)
  }

  handleCloseSubmitDialog() {
    this.setState({ openSubmitBallotDialog: false })
  }

  handleOpenSubmitDialog() {
    const { positionList } = this.state 
    let candidateKeyList = []

    Object.keys(positionList).forEach((positionId) => {
      let position = positionList[positionId]
      
      Object.keys(position.candidateIds).forEach((candidateId) => {
        if(position.candidateIds[candidateId]){
          candidateKeyList.push(candidateId)
        }
      })
    })

    this.setState({ 
      candidateKeyList,
      openSubmitBallotDialog: true 
    })
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
      const {votechain, fetchElectionDetails, location, fetchCurrentVoteList } = this.props
      const electionId = location.params.election.id
      fetchElectionDetails(votechain, electionId)
      fetchCurrentVoteList(votechain, electionId)
    }
  }
  
  render() {  
    if(!this.props.location.params){
      return <Redirect to='/elections' />
    }
    
    const { election, voteList } = this.props

    return (
      <div>
        {!isEmpty(election) ?   
          <div>
            <ElectionView 
              election={election}
              voteList={voteList}
            />
          </div> 
        : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  election: state.election.electionDetails,
  voteList: state.vote.currentVoteList,
});

const mapDispatchToProps = {
  fetchElectionDetails,
  fetchCurrentVoteList
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectionViewContainer)