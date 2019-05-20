import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { fetchCurrentPartyList } from '../../../actions/party'

import PartyTable from './party-table'
import EditPartyDialog from '../../customized/dialogs/edit-party'
import DeletePartyDialog from '../../customized/dialogs/delete-party'

class PartyTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddPartyDialog: false,
      openEditPartyDialog: false,
      openDeletePartyDialog: false,

      partyToBeEdited: {},
      partyToBeDeleted: {}
    }

    this.handleCloseAddPartyDialog = this.handleCloseAddPartyDialog.bind(this)
    this.handleOpenAddPartyDialog = this.handleOpenAddPartyDialog.bind(this)
    
    this.handleOpenEditPartyDialog = this.handleOpenEditPartyDialog.bind(this)
    this.handleCloseEditPartyDialog = this.handleCloseEditPartyDialog.bind(this)

    this.handleOpenDeletePartyDialog = this.handleOpenDeletePartyDialog.bind(this)
    this.handleCloseDeletePartyDialog = this.handleCloseDeletePartyDialog.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.election !== prevProps.election) {
      const {votechain, fetchCurrentPartyList, election } = this.props
      fetchCurrentPartyList(votechain, election.id)
    }
  }
  
  handleOpenAddPartyDialog() {
    this.setState({ openAddPartyDialog: true })
  }

  handleCloseAddPartyDialog() {
    this.setState({ openAddPartyDialog: false })
  }

  handleOpenEditPartyDialog(partyToBeEdited) {
    this.setState({ 
      openEditPartyDialog: true, 
      partyToBeEdited: partyToBeEdited
    })
  }

  handleCloseEditPartyDialog() {
    this.setState({ openEditPartyDialog: false})
  }

  handleOpenDeletePartyDialog(partyToBeDeleted) {
    this.setState({ 
      openDeletePartyDialog: true,
      partyToBeDeleted
    })
  }

  handleCloseDeletePartyDialog() {
    this.setState({ openDeletePartyDialog: false })
  }

  render() {
    const { openAddPartyDialog, openEditPartyDialog, partyToBeEdited, partyToBeDeleted, openDeletePartyDialog } = this.state
    const { partyList, election } = this.props

    const headers = [
      {id: 'id', label: 'Party ID', searchable: true},
      {id: 'name', label: 'Name', searchable: true},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <PartyTable 
          election={election}
          headers={headers}
          partyList={partyList}

          openAddPartyDialog={openAddPartyDialog}
          handleCloseAddPartyDialog={this.handleCloseAddPartyDialog}
          handleOpenAddPartyDialog={this.handleOpenAddPartyDialog}
          
          handleOpenEditPartyDialog={this.handleOpenEditPartyDialog}
          handleOpenDeletePartyDialog={this.handleOpenDeletePartyDialog}
        />
        <EditPartyDialog 
          openDialog={openEditPartyDialog}
          onClose={this.handleCloseEditPartyDialog}
          partyToBeEdited={partyToBeEdited}
        />
        <DeletePartyDialog 
          openDialog={openDeletePartyDialog}
          onClose={this.handleCloseDeletePartyDialog}
          partyToBeDeleted={partyToBeDeleted}
        />
      </Fragment>
    )
  }
}

PartyTableContainer.propTypes = {
  election: PropTypes.object,
}

const mapStateToProps = state => ({
  partyList: state.party.currentPartyList,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentPartyList
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyTableContainer)