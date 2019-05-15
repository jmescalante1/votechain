import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchOfficialList } from '../../../actions/official'

import OfficialTable from './official-table'

import EditOfficialDialog from '../../customized/dialogs/edit-official'
import DeleteOfficialDialog from '../../customized/dialogs/delete-official'

class OfficialTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddOfficialDialog: false,
      openEditOfficialDialog: false,
      openDeleteOfficialDialog: false,

      officialToBeEdited: {},
      officialToBeDeleted: {}
    }

    this.handleCloseAddOfficialDialog = this.handleCloseAddOfficialDialog.bind(this)
    this.handleOpenAddOfficialDialog = this.handleOpenAddOfficialDialog.bind(this)
  
    this.handleOpenEditOfficialDialog = this.handleOpenEditOfficialDialog.bind(this)
    this.handleCloseEditOfficialDialog = this.handleCloseEditOfficialDialog.bind(this)

    this.handleOpenDeleteOfficialDialog = this.handleOpenDeleteOfficialDialog.bind(this)
    this.handleCloseDeleteOfficialDialog = this.handleCloseDeleteOfficialDialog.bind(this)
  }

  componentDidMount(){
    const { fetchOfficialList, votechain } = this.props
    if(votechain)
      fetchOfficialList(votechain)
  }
  
  handleCloseAddOfficialDialog() {
    this.setState({ openAddOfficialDialog: false })
  }
  
  handleOpenAddOfficialDialog() {
    this.setState({ openAddOfficialDialog: true })
  }

  handleOpenEditOfficialDialog(officialToBeEdited) {
    this.setState({ 
      openEditOfficialDialog: true, 
      officialToBeEdited
    })
  }

  handleCloseEditOfficialDialog() {
    this.setState({ openEditOfficialDialog: false})
  }

  handleOpenDeleteOfficialDialog(officialToBeDeleted) {
    this.setState({ 
      openDeleteOfficialDialog: true,
      officialToBeDeleted
    })
  }

  handleCloseDeleteOfficialDialog() {
    this.setState({ openDeleteOfficialDialog: false })
  }

  render() {
    const { openAddOfficialDialog, openEditOfficialDialog, officialToBeEdited, openDeleteOfficialDialog, officialToBeDeleted } = this.state
    const { officialList } = this.props

    const headers = [
      {id: 'id', label: 'Official ID'},
      {id: 'name', label: 'Name'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <OfficialTable 
          headers={headers}
          officialList={officialList}

          openAddOfficialDialog={openAddOfficialDialog}
          handleOpenAddOfficialDialog={this.handleOpenAddOfficialDialog}
          handleCloseAddOfficialDialog={this.handleCloseAddOfficialDialog}

          handleOpenEditOfficialDialog={this.handleOpenEditOfficialDialog}
          handleOpenDeleteOfficialDialog={this.handleOpenDeleteOfficialDialog}
        />
        
        <EditOfficialDialog 
          openDialog={openEditOfficialDialog}
          handleClickCloseDialog={this.handleCloseEditOfficialDialog}
          officialToBeEdited={officialToBeEdited}
        />

        <DeleteOfficialDialog 
          openDialog={openDeleteOfficialDialog}
          handleClickCloseDialog={this.handleCloseDeleteOfficialDialog}
          officialToBeDeleted={officialToBeDeleted}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  officialList: state.official.officialList,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchOfficialList
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficialTableContainer)