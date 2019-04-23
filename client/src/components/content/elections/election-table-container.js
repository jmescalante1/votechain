import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import ElectionTable from '../elections/election-table'
import EditElectionDialog from '../../customized/dialogs/edit-election'
import DeleteElectionDialog from '../../customized/dialogs/delete-election'
import StartElectionDialog from '../../customized/dialogs/start-election'
import StopElectionDialog from '../../customized/dialogs/stop-election'

import { fetchElectionList } from '../../../actions/election'

class ElectionTableContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openAddElectionDialog: false,
      openEditElectionDialog: false,
      openDeleteElectionDialog: false,

      openStartElectionDialog: false,
      openStopElectionDialog: false,

      idOfElectionToBeEdited: '',
      idOfElectionToBeDeleted: '',
      electionToStart: {},
      electionToStop: {},
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

  }

  componentDidMount(){
    const { fetchElectionList, votechain } = this.props
    if(votechain)
      fetchElectionList(votechain)
  }

  handleOpenAddElectionDialog() {
    this.setState({ openAddElectionDialog: true })
  }

  handleCloseAddElectionDialog() {
    this.setState({ openAddElectionDialog: false })
  }

  handleOpenEditElectionDialog(electionId) {
    this.setState({ 
      openEditElectionDialog: true, 
      idOfElectionToBeEdited: electionId
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


  render() {
    const { openAddElectionDialog, openEditElectionDialog, openDeleteElectionDialog, idOfElectionToBeDeleted, idOfElectionToBeEdited } = this.state
    const { electionToStart, openStartElectionDialog, electionToStop, openStopElectionDialog } = this.state
    const { electionList } = this.props


    const headers = [
      {id: 'id', label: 'Election Key'},
      {id: 'name', label: 'Name'},
      {id: 'status', label: 'Status'},
      {id: 'action', label: 'Action'},
    ]

    return (
      <Fragment>
        <ElectionTable 
          headers={headers}
          electionList={electionList}
          
          openDialog={openAddElectionDialog}
          handleCloseAddElectionDialog={this.handleCloseAddElectionDialog}

          handleOpenAddElectionDialog={this.handleOpenAddElectionDialog}
          handleOpenEditElectionDialog={this.handleOpenEditElectionDialog}
          handleOpenDeleteElectionDialog={this.handleOpenDeleteElectionDialog}
          handleOpenStartElectionDialog={this.handleOpenStartElectionDialog}
          handleOpenStopElectionDialog={this.handleOpenStopElectionDialog}

       />
        <EditElectionDialog 
          openDialog={openEditElectionDialog}
          handleClickCloseDialog={this.handleCloseEditElectionDialog}
          idOfElectionToBeEdited={idOfElectionToBeEdited}
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