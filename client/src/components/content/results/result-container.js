import React from 'react'
import { connect } from 'react-redux'

import Result from './result'

import { fetchFinishedElectionList, fetchFinishedElectionResult } from '../../../actions/result' 

class ResultContainer extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      election: null,
      loading: true,
    }

    this.handleElectionSelectChange = this.handleElectionSelectChange.bind(this)
  }

  async componentDidMount() {
    const { fetchFinishedElectionList, votechain } = this.props

    await this.setState({ loading: true })

    if(votechain)
      await fetchFinishedElectionList(votechain)

    await this.setState({ loading: false })
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.props.votechain !== prevProps.votechain) {
      const {votechain, fetchFinishedElectionList } = this.props
      
      await this.setState({ loading: true })
      await fetchFinishedElectionList(votechain)
      await this.setState({ loading: false })
    }

    if(this.state.election !== prevState.election){
      const { votechain, fetchFinishedElectionResult } = this.props
      const { election } = this.state
      
      await this.setState({ loading: true })
      await fetchFinishedElectionResult(votechain, election.id)
      await this.setState({ loading: false })
    }
  }

  handleElectionSelectChange(option) {
    if(option){
      this.setState({ election: option.value })
    } else {
      this.setState({ election: '' })
    }
  }

  render() {
    const { election, loading } = this.state
    const { finishedElectionList, currentFinishedElection } = this.props

    return(
      <div>
        <Result
          loading={loading}
          election={election}
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