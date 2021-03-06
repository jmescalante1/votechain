import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchCurrentVoterList } from '../../../actions/voter'

import VoterTable from './voter-table'

import EditVoterDialog from '../../customized/dialogs/edit-voter'
import DeleteVoterDialog from '../../customized/dialogs/delete-voter'

class VoterTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openUploadVoterDialog: false,
      openAddVoterDialog: false,
      openEditVoterDialog: false,
      openDeleteVoterDialog: false,

      voterToBeEdited: {},
      voterToBeDeleted: {}
    }
    
    this.handleCloseUploadVoterDialog = this.handleCloseUploadVoterDialog.bind(this)
    this.handleOpenUploadVoterDialog = this.handleOpenUploadVoterDialog.bind(this)
  
    this.handleCloseAddVoterDialog = this.handleCloseAddVoterDialog.bind(this)
    this.handleOpenAddVoterDialog = this.handleOpenAddVoterDialog.bind(this)
  
    this.handleOpenEditVoterDialog = this.handleOpenEditVoterDialog.bind(this)
    this.handleCloseEditVoterDialog = this.handleCloseEditVoterDialog.bind(this)

    this.handleOpenDeleteVoterDialog = this.handleOpenDeleteVoterDialog.bind(this)
    this.handleCloseDeleteVoterDialog = this.handleCloseDeleteVoterDialog.bind(this)
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.election !== prevProps.election) {
      const {votechain, fetchCurrentVoterList, election } = this.props
      fetchCurrentVoterList(votechain, election.id)
    }
  }

  handleOpenUploadVoterDialog() {
    this.setState({ openUploadVoterDialog: true})
  }

  handleCloseUploadVoterDialog() {
    this.setState({ openUploadVoterDialog: false})
  }
  
  handleCloseAddVoterDialog() {
    this.setState({ openAddVoterDialog: false })
  }
  
  handleOpenAddVoterDialog() {
    this.setState({ openAddVoterDialog: true })
  }

  handleOpenEditVoterDialog(voterToBeEdited) {
    this.setState({ 
      openEditVoterDialog: true, 
      voterToBeEdited
    })
  }

  handleCloseEditVoterDialog() {
    this.setState({ openEditVoterDialog: false})
  }

  handleOpenDeleteVoterDialog(voterToBeDeleted) {
    this.setState({ 
      openDeleteVoterDialog: true,
      voterToBeDeleted
    })
  }

  handleCloseDeleteVoterDialog() {
    this.setState({ openDeleteVoterDialog: false })
  }

  render() {
    const { openUploadVoterDialog, openAddVoterDialog, openEditVoterDialog, voterToBeEdited, openDeleteVoterDialog, voterToBeDeleted } = this.state
    const { voterList, election } = this.props

    const headers = [
      {id: 'id', label: 'Voter ID', searchable: true},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <VoterTable 
          election={election}
          headers={headers}
          voterList={voterList}

          openAddVoterDialog={openAddVoterDialog}
          handleOpenAddVoterDialog={this.handleOpenAddVoterDialog}
          handleCloseAddVoterDialog={this.handleCloseAddVoterDialog}

          openUploadVoterDialog={openUploadVoterDialog}
          handleOpenUploadVoterDialog={this.handleOpenUploadVoterDialog}
          handleCloseUploadVoterDialog={this.handleCloseUploadVoterDialog}

          handleOpenEditVoterDialog={this.handleOpenEditVoterDialog}
          handleOpenDeleteVoterDialog={this.handleOpenDeleteVoterDialog}
        />
        
        {election &&
          <>
            <EditVoterDialog 
              openDialog={openEditVoterDialog}
              handleClickCloseDialog={this.handleCloseEditVoterDialog}
              voterToBeEdited={voterToBeEdited}
            />

            <DeleteVoterDialog 
              openDialog={openDeleteVoterDialog}
              handleClickCloseDialog={this.handleCloseDeleteVoterDialog}
              voterToBeDeleted={voterToBeDeleted}
              electionId={election.id}
            />
          </>
        }
      </Fragment>
    )
  }
}

VoterTableContainer.propTypes = {
  election: PropTypes.object,
  
}

const mapStateToProps = state => ({
  voterList: state.voter.currentVoterList,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentVoterList
}

export default connect(mapStateToProps, mapDispatchToProps)(VoterTableContainer)