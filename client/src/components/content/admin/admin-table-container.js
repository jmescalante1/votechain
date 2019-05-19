import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { fetchAdminList } from '../../../actions/admin'

import AdminTable from './admin-table'

import EditAdminDialog from '../../customized/dialogs/edit-admin'
import DeleteAdminDialog from '../../customized/dialogs/delete-admin'

class AdminTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddAdminDialog: false,
      openEditAdminDialog: false,
      openDeleteAdminDialog: false,

      adminToBeEdited: {},
      adminToBeDeleted: {}
    }

    this.handleCloseAddAdminDialog = this.handleCloseAddAdminDialog.bind(this)
    this.handleOpenAddAdminDialog = this.handleOpenAddAdminDialog.bind(this)
  
    this.handleOpenEditAdminDialog = this.handleOpenEditAdminDialog.bind(this)
    this.handleCloseEditAdminDialog = this.handleCloseEditAdminDialog.bind(this)

    this.handleOpenDeleteAdminDialog = this.handleOpenDeleteAdminDialog.bind(this)
    this.handleCloseDeleteAdminDialog = this.handleCloseDeleteAdminDialog.bind(this)
  }

  componentDidMount(){
    const { fetchAdminList, votechain } = this.props
    if(votechain)
      fetchAdminList(votechain)
  }
  
  handleCloseAddAdminDialog() {
    this.setState({ openAddAdminDialog: false })
  }
  
  handleOpenAddAdminDialog() {
    this.setState({ openAddAdminDialog: true })
  }

  handleOpenEditAdminDialog(adminToBeEdited) {
    this.setState({ 
      openEditAdminDialog: true, 
      adminToBeEdited
    })
  }

  handleCloseEditAdminDialog() {
    this.setState({ openEditAdminDialog: false})
  }

  handleOpenDeleteAdminDialog(adminToBeDeleted) {
    this.setState({ 
      openDeleteAdminDialog: true,
      adminToBeDeleted
    })
  }

  handleCloseDeleteAdminDialog() {
    this.setState({ openDeleteAdminDialog: false })
  }

  render() {
    const { openAddAdminDialog, openEditAdminDialog, adminToBeEdited, openDeleteAdminDialog, adminToBeDeleted } = this.state
    const { adminList } = this.props

    const headers = [
      {id: 'id', label: 'Admin ID', searchable: true},
      {id: 'name', label: 'Name', searchable: true},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <AdminTable 
          headers={headers}
          adminList={adminList}

          openAddAdminDialog={openAddAdminDialog}
          handleOpenAddAdminDialog={this.handleOpenAddAdminDialog}
          handleCloseAddAdminDialog={this.handleCloseAddAdminDialog}

          handleOpenEditAdminDialog={this.handleOpenEditAdminDialog}
          handleOpenDeleteAdminDialog={this.handleOpenDeleteAdminDialog}
        />
        
        <EditAdminDialog 
          openDialog={openEditAdminDialog}
          handleClickCloseDialog={this.handleCloseEditAdminDialog}
          adminToBeEdited={adminToBeEdited}
        />

        <DeleteAdminDialog 
          openDialog={openDeleteAdminDialog}
          handleClickCloseDialog={this.handleCloseDeleteAdminDialog}
          adminToBeDeleted={adminToBeDeleted}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  adminList: state.admin.adminList,
  account: state.account.account,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchAdminList
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTableContainer)