import React from 'react'
import { connect } from 'react-redux'

import Result from './result'

import { fetchFinishedElectionList, fetchFinishedElectionResult } from '../../../actions/result' 

class ResultContainer extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      electionId: null,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  }

  componentDidMount() {
    const { fetchFinishedElectionList, votechain } = this.props

    if(votechain)
      fetchFinishedElectionList(votechain)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.votechain !== prevProps.votechain) {
      const {votechain, fetchFinishedElectionList } = this.props
      fetchFinishedElectionList(votechain)
    }

    if(this.state.electionId !== prevState.electionId){
      const { votechain, fetchFinishedElectionResult } = this.props
      const { electionId } = this.state
      fetchFinishedElectionResult(votechain, electionId)
    }
  }

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ electionId: option.value })
    } else {
      this.setState({ electionId: '' })
    }
  }

  render() {
    const { electionId } = this.state
    const { finishedElectionList, currentFinishedElection } = this.props

    return(
      <div>
        <Result
          electionId={electionId}
          handleElectionSelectChange={this.handleElectionSelectChange}
          finishedElectionList={finishedElectionList}
          currentFinishedElection={currentFinishedElection}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  finishedElectionList: state.result.finishedElectionList,
  currentFinishedElection: state.result.currentFinishedElection
})

const mapDispatchToProps = {
  fetchFinishedElectionList,
  fetchFinishedElectionResult
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer)