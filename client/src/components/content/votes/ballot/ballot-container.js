import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import PropTypes from 'prop-types'

import Ballot from './ballot'
import SubmitBallotDialog from '../../../customized/dialogs/submit-ballot'
import Loader from '../../../customized/progress-bars/loader'

import { fetchElection } from '../../../../actions/ballot'

class BallotContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positionList: {
        /* Structure
          positionId: {
            candidateIds:{

            }
            noOfChecks,
            isAbstain:
            abstainId: 
          }
        */
      },
      openSubmitBallotDialog: false,
      candidateKeyList: [],
      abstainKeyList: [],
      errors: {},
      loading: false,
    }
    
    this.initPositionState = this.initPositionState.bind(this)

    this.handleSelectCandidate = this.handleSelectCandidate.bind(this)
    this.handleSelectAbstain = this.handleSelectAbstain.bind(this)
   
    this.handleOpenSubmitDialog = this.handleOpenSubmitDialog.bind(this)
    this.handleCloseSubmitDialog = this.handleCloseSubmitDialog.bind(this)

  }

  async componentDidMount() {
    const {votechain, fetchElection, electionId } = this.props
    await this.setState({ loading: true })

    if(electionId) {
       await fetchElection(votechain, electionId)
    }

    await this.setState({ loading: false })
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.electionId !== this.props.electionId) {
      await this.setState({ loading: true })
      
      const { votechain, electionId, fetchElection } = this.props
      
      await fetchElection(votechain, electionId)
      
      await this.setState({ loading: false })
    }
  }

  async initPositionState(positionId) {
    let noOfChecks = 0;
    let candidateIds = {}
    let isAbstain = false
    let positionState = {candidateIds, noOfChecks, isAbstain}
    
    await this.setState(prevState => ({
      positionList: {
        ...prevState.positionList,
        [positionId]: positionState
      }
    }))
  }

  async handleSelectAbstain(id, checked, position) {
    if(!this.state.positionList[position.id]){
      await this.initPositionState(position.id)
    }

    await this.setState(prevState => ({
      positionList: {
        ...prevState.positionList,
        [position.id]: {
          ...prevState.positionList[position.id],
          isAbstain: checked,
          abstainId: id
        }
      }
    }))
  }
  
  async handleSelectCandidate(candidateId, checked, position) {
    if(!this.state.positionList[position.id]){
      await this.initPositionState(position.id)
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

  async handleOpenSubmitDialog() {
    const { positionList } = this.state 
    let candidateKeyList = []
    let abstainKeyList = []

    Object.keys(positionList).forEach((positionId) => {
      let position = positionList[positionId]
      
      if(position.isAbstain) {
        abstainKeyList.push(position.abstainId)
      } else {
        Object.keys(position.candidateIds).forEach((candidateId) => {
          if(position.candidateIds[candidateId]){
            candidateKeyList.push(Number(candidateId))
          }
        })
      }
    })

    await this.setState({ 
      candidateKeyList,
      abstainKeyList,
      openSubmitBallotDialog: true 
    })
  }
  
  handleCloseSubmitDialog() {
    this.setState({ openSubmitBallotDialog: false })
  }

  render() {  
    const { election, setHasVoted, display } = this.props
    const { positionList, openSubmitBallotDialog, candidateKeyList, abstainKeyList, loading } = this.state

    if(!display) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        { loading ? 
            <Loader />
          : !isEmpty(election) 
            ? <div>
                <Ballot 
                  election={election}
                  positionListState={positionList}
                  handleSelectCandidate={this.handleSelectCandidate}
                  handleSelectAbstain={this.handleSelectAbstain}

                  handleOpenSubmitDialog={this.handleOpenSubmitDialog}
                />
                <SubmitBallotDialog 
                  election={election}
                  setHasVoted={setHasVoted}

                  openDialog={openSubmitBallotDialog}
                  handleClickCloseDialog={this.handleCloseSubmitDialog}
                  candidateKeyList={candidateKeyList}
                  abstainKeyList={abstainKeyList}
                />
              </div> 
            : null
        }
      </div>
    )
  }
}

BallotContainer.propTypes = {
  electionId: PropTypes.number,
  setHasVoted: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  election: state.ballot.election,
});

const mapDispatchToProps = {
  fetchElection,
}

export default connect(mapStateToProps, mapDispatchToProps)(BallotContainer)