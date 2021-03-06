import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { fetchCurrentCandidateList } from '../../../actions/candidate'

import CandidateTable from './candidate-table'
import EditCandidateDialog from '../../customized/dialogs/edit-candidate'
import DeleteCandidateDialog from '../../customized/dialogs/delete-candidate'

class CandidateTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddCandidateDialog: false,
      openEditCandidateDialog: false,
      openDeleteCandidateDialog: false,

      candidateToBeEdited: {},
      candidateToBeDeleted: {},
    }

    this.handleCloseAddCandidateDialog = this.handleCloseAddCandidateDialog.bind(this)
    this.handleOpenAddCandidateDialog = this.handleOpenAddCandidateDialog.bind(this)
    
    this.handleCloseEditCandidateDialog = this.handleCloseEditCandidateDialog.bind(this)
    this.handleOpenEditCandidateDialog = this.handleOpenEditCandidateDialog.bind(this)
  
    this.handleCloseDeleteCandidateDialog = this.handleCloseDeleteCandidateDialog.bind(this)
    this.handleOpenDeleteCandidateDialog = this.handleOpenDeleteCandidateDialog.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.election !== prevProps.election) {
      const {votechain, fetchCurrentCandidateList, election } = this.props
      fetchCurrentCandidateList(votechain, election.id)
    }
  }

  handleOpenEditCandidateDialog(candidateToBeEdited) {
    this.setState({ 
      openEditCandidateDialog: true,
      candidateToBeEdited
    })
  }

  handleCloseEditCandidateDialog() {
    this.setState({ openEditCandidateDialog: false })
  }

  handleOpenAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: true })
  }

  handleCloseAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: false })
  }

  handleOpenDeleteCandidateDialog(candidateToBeDeleted) {
    this.setState({ 
      openDeleteCandidateDialog: true ,
      candidateToBeDeleted
    })
  }

  handleCloseDeleteCandidateDialog() {
    this.setState({ openDeleteCandidateDialog: false })
  }

  render() {
    const { openAddCandidateDialog, candidateToBeEdited, candidateToBeDeleted, openEditCandidateDialog, openDeleteCandidateDialog } = this.state
    const { currentCandidateList, election } = this.props

    const headers = [
      {id: 'id', label: 'Candidate ID', searchable: true},
      {id: 'name', label: 'Name', searchable: true},
      {id: 'positionName', label: 'Position', searchable: true},
      {id: 'partyName', label: 'Party', searchable: true},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <CandidateTable 
          headers={headers}
          candidateList={currentCandidateList}
          election={election}

          openAddCandidateDialog={openAddCandidateDialog}
          handleCloseAddCandidateDialog={this.handleCloseAddCandidateDialog}
          handleOpenAddCandidateDialog={this.handleOpenAddCandidateDialog}

          handleOpenEditCandidateDialog={this.handleOpenEditCandidateDialog}
          handleOpenDeleteCandidateDialog={this.handleOpenDeleteCandidateDialog}
        />

        <EditCandidateDialog 
          candidateToBeEdited={candidateToBeEdited}
          openDialog={openEditCandidateDialog}
          handleClickCloseDialog={this.handleCloseEditCandidateDialog}
        />

        <DeleteCandidateDialog 
          candidate={candidateToBeDeleted}
          openDialog={openDeleteCandidateDialog}
          handleClickCloseDialog={this.handleCloseDeleteCandidateDialog}
        />
      </Fragment>
    )
  }
}

CandidateTableContainer.propTypes = {
  election: PropTypes.object,
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  currentCandidateList: state.candidate.currentCandidateList
});

const mapDispatchToProps = {
  fetchCurrentCandidateList
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateTableContainer)