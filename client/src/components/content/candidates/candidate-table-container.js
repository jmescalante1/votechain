import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import CandidateTable from './candidate-table'

import { fetchCandidateListOfElection } from '../../../actions/candidate'

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
      this.props.fetchCandidateListOfElection(this.props.electionId)
    }
  }

  handleCloseAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: false })
  }
  
  handleOpenAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: true })
  }

  render() {
    const { openAddCandidateDialog } = this.state
    const { currentCandidateList } = this.props

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'position', label: 'Position'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <div>
        <CandidateTable 
          headers={headers}
          candidateList={currentCandidateList}

          openAddCandidateDialog={openAddCandidateDialog}
          handleOpenAddCandidateDialog={this.handleOpenAddCandidateDialog}
          handleCloseAddCandidateDialog={this.handleCloseAddCandidateDialog}
        />
      </div>
    )
  }
}

CandidateTableContainer.propTypes = {
  electionId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  currentCandidateList: state.election.currentCandidateList
});

const mapDispatchToProps = {
  fetchCandidateListOfElection
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateTableContainer)