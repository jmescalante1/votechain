import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { fetchCurrentPositionList } from '../../../actions/position'

import PositionTable from './position-table'
import EditPositionDialog from '../../customized/dialogs/edit-position'
import DeletePositionDialog from '../../customized/dialogs/delete-position'

class PositionTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddPositionDialog: false,
      openEditPositionDialog: false,
      openDeletePositionDialog: false,

      positionToBeEdited: {},
      positionToBeDeleted: {}
    }

    this.handleCloseAddPositionDialog = this.handleCloseAddPositionDialog.bind(this)
    this.handleOpenAddPositionDialog = this.handleOpenAddPositionDialog.bind(this)
    
    this.handleOpenEditPositionDialog = this.handleOpenEditPositionDialog.bind(this)
    this.handleCloseEditPositionDialog = this.handleCloseEditPositionDialog.bind(this)

    this.handleOpenDeletePositionDialog = this.handleOpenDeletePositionDialog.bind(this)
    this.handleCloseDeletePositionDialog = this.handleCloseDeletePositionDialog.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.electionId !== prevProps.electionId) {
      const { web3, votechain, fetchCurrentPositionList, electionId } = this.props
      fetchCurrentPositionList(web3, votechain, electionId)
    }
  }
  
  handleOpenAddPositionDialog() {
    this.setState({ openAddPositionDialog: true })
  }

  handleCloseAddPositionDialog() {
    this.setState({ openAddPositionDialog: false })
  }

  handleOpenEditPositionDialog(positionToBeEdited) {
    this.setState({ 
      openEditPositionDialog: true, 
      positionToBeEdited: positionToBeEdited
    })
  }

  handleCloseEditPositionDialog() {
    this.setState({ openEditPositionDialog: false})
  }

  handleOpenDeletePositionDialog(positionToBeDeleted) {
    this.setState({ 
      openDeletePositionDialog: true,
      positionToBeDeleted
    })
  }

  handleCloseDeletePositionDialog() {
    this.setState({ openDeletePositionDialog: false })
  }

  render() {
    const { openAddPositionDialog, openEditPositionDialog, positionToBeEdited, positionToBeDeleted, openDeletePositionDialog } = this.state
    const { positionList, electionId } = this.props

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'max-no-of-candidates-to-be-elected', label: 'Max No. of Candidates to be Elected'},
      {id: 'hasAbstain', label: 'Has abstain'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <PositionTable 
          electionId={electionId}
          headers={headers}
          positionList={positionList}

          openAddPositionDialog={openAddPositionDialog}
          handleCloseAddPositionDialog={this.handleCloseAddPositionDialog}
          handleOpenAddPositionDialog={this.handleOpenAddPositionDialog}
          
          handleOpenEditPositionDialog={this.handleOpenEditPositionDialog}
          handleOpenDeletePositionDialog={this.handleOpenDeletePositionDialog}
        />
        <EditPositionDialog 
          openDialog={openEditPositionDialog}
          onClose={this.handleCloseEditPositionDialog}
          positionToBeEdited={positionToBeEdited}
        />
        <DeletePositionDialog 
          openDialog={openDeletePositionDialog}
          onClose={this.handleCloseDeletePositionDialog}
          positionToBeDeleted={positionToBeDeleted}
        />
      </Fragment>
    )
  }
}

PositionTableContainer.propTypes = {
  electionId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  positionList: state.position.currentPositionList,
  web3: state.web3.web3,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentPositionList
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionTableContainer)