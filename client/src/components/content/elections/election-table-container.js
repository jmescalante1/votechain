import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import ElectionTable from '../elections/election-table'

import ViewElectionDialog from '../../customized/dialogs/view-election'
import EditElectionDialog from '../../customized/dialogs/edit-election'
import DeleteElectionDialog from '../../customized/dialogs/delete-election'
import StartElectionDialog from '../../customized/dialogs/start-election'
import StopElectionDialog from '../../customized/dialogs/stop-election'

import { fetchElectionList } from '../../../actions/election'

class ElectionTableContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openViewElectionDialog: false,
      openAddElectionDialog: false,
      openEditElectionDialog: false,
      openDeleteElectionDialog: false,

      openStartElectionDialog: false,
      openStopElectionDialog: false,

      electionToBeEdited: {},
      idOfElectionToBeDeleted: null,
      electionToStart: {},
      electionToStop: {},
      electionToView: {},
    }

    this.handleOpenAddElectionDialog = this.handleOpenAddElectionDialog.bind(this)
    this.handleCloseAddElectionDialog = this.handleCloseAddElectionDialog.bind(this)
    
    this.handleOpenEditElectionDialog = this.handleOpenEditElectionDialog.bind(this)
    this.handleCloseEditElectionDialog = this.handleCloseEditElectionDialog.bind(this)
  
    this.handleOpenDeleteElectionDialog = this.handleOpenDeleteElectionDialog.bind(this)
    this.handleCloseDeleteElectionDialog = this.handleCloseDeleteElectionDialog.bind(this)
  
    this.handleOpenStartElectionDialog = this.handleOpenStartElectionDialog.bind(this)
    this.handleCloseStartElectionDialog = this.handleCloseStartElectionDialog.bind(this)

    this.handleOpenStopElectionDialog = this.handleOpenStopElectionDialog.bind(this)
    this.handleCloseStopElectionDialog = this.handleCloseStopElectionDialog.bind(this)

    this.handleOpenViewElectionDialog = this.handleOpenViewElectionDialog.bind(this)
    this.handleCloseViewElectionDialog = this.handleCloseViewElectionDialog.bind(this)

  }

  handleOpenAddElectionDialog() {
    this.setState({ openAddElectionDialog: true })
  }

  handleCloseAddElectionDialog() {
    this.setState({ openAddElectionDialog: false })
  }

  handleOpenEditElectionDialog(electionToBeEdited) {
    this.setState({ 
      openEditElectionDialog: true, 
      electionToBeEdited,
    })
  }

  handleCloseEditElectionDialog() {
    this.setState({ openEditElectionDialog: false })
  }

  handleOpenDeleteElectionDialog(electionId) {
    this.setState({
      openDeleteElectionDialog: true,
      idOfElectionToBeDeleted: electionId
    })
  }

  handleCloseDeleteElectionDialog() {
    this.setState({ openDeleteElectionDialog: false })
  }

  handleOpenStartElectionDialog(election) {
    this.setState({
      openStartElectionDialog: true,
      electionToStart: election
    })
  }

  handleCloseStartElectionDialog() {
    this.setState({ openStartElectionDialog: false })
  }

  handleOpenStopElectionDialog(election) {
    this.setState({
      openStopElectionDialog: true,
      electionToStop: election
    })
  }

  handleCloseStopElectionDialog() {
    this.setState({ openStopElectionDialog: false })
  }

  handleOpenViewElectionDialog(election) {
    this.setState({
      openViewElectionDialog: true, 
      electionToView: election
    })
  }

  handleCloseViewElectionDialog() {
    this.setState({ openViewElectionDialog: false })
  }


  render() {
    const { openAddElectionDialog, openEditElectionDialog, openDeleteElectionDialog, idOfElectionToBeDeleted, electionToBeEdited } = this.state
    const { electionToStart, openStartElectionDialog, electionToStop, openStopElectionDialog } = this.state
    const { electionToView, openViewElectionDialog } = this.state
    const { electionList } = this.props


    const headers = [
      {id: 'id', label: 'Election ID', searchable: true},
      {id: 'name', label: 'Name', searchable: true},
      {id: 'status', label: 'Status', searchable: false},
      {id: 'action', label: 'Action', searchable: false},
    ]

    return (
      <Fragment>
        <ElectionTable 
          headers={headers}
          electionList={electionList}
          
          openDialog={openAddElectionDialog}
          handleCloseAddElectionDialog={this.handleCloseAddElectionDialog}

          handleOpenViewElectionDialog={this.handleOpenViewElectionDialog}
          handleOpenAddElectionDialog={this.handleOpenAddElectionDialog}
          handleOpenEditElectionDialog={this.handleOpenEditElectionDialog}
          handleOpenDeleteElectionDialog={this.handleOpenDeleteElectionDialog}
          handleOpenStartElectionDialog={this.handleOpenStartElectionDialog}
          handleOpenStopElectionDialog={this.handleOpenStopElectionDialog}

       />
        
        <EditElectionDialog 
          openDialog={openEditElectionDialog}
          handleClickCloseDialog={this.handleCloseEditElectionDialog}
          electionToBeEdited={electionToBeEdited}
        />
        <DeleteElectionDialog 
          openDialog={openDeleteElectionDialog}
          handleClickCloseDialog={this.handleCloseDeleteElectionDialog}
          idOfElectionToBeDeleted={idOfElectionToBeDeleted}
        />
        <StartElectionDialog 
          openDialog={openStartElectionDialog}
          handleClickCloseDialog={this.handleCloseStartElectionDialog}
          electionToStart={electionToStart}
        />
        <StopElectionDialog 
          openDialog={openStopElectionDialog}
          handleClickCloseDialog={this.handleCloseStopElectionDialog}
          electionToStop={electionToStop}
        />
        <ViewElectionDialog 
          openDialog={openViewElectionDialog}
          handleClickCloseDialog={this.handleCloseViewElectionDialog}
          electionToView={electionToView}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  electionList: state.election.electionList,
  location: state.router.location
});

const mapDispatchToProps = {
  fetchElectionList
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectionTableContainer)