import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { fetchCurrentCandidateList } from '../../../actions/candidate'

import CandidateTable from './candidate-table'

class CandidateTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddCandidateDialog: false
    }

    this.handleCloseAddCandidateDialog = this.handleCloseAddCandidateDialog.bind(this)
    this.handleOpenAddCandidateDialog = this.handleOpenAddCandidateDialog.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.electionId !== prevProps.electionId) {
      const { web3, votechain, fetchCurrentCandidateList, electionId } = this.props
      fetchCurrentCandidateList(web3, votechain, electionId)
    }
  }

  handleOpenAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: true })
  }

  handleCloseAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: false })
  }

  render() {
    const { openAddCandidateDialog } = this.state
    const { currentCandidateList, electionId } = this.props

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'position-key', label: 'Position Key'},
      {id: 'position-name', label: 'Position Name'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <CandidateTable 
          electionId={electionId}
          headers={headers}
          candidateList={currentCandidateList}

          openAddCandidateDialog={openAddCandidateDialog}
          handleCloseAddCandidateDialog={this.handleCloseAddCandidateDialog}
          handleOpenAddCandidateDialog={this.handleOpenAddCandidateDialog}
        />
      </Fragment>
    )
  }
}

CandidateTableContainer.propTypes = {
  electionId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
  currentCandidateList: state.candidate.currentCandidateList
});

const mapDispatchToProps = {
  fetchCurrentCandidateList
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateTableContainer)