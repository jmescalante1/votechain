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
    if(this.props.election !== prevProps.election) {
      const {votechain, fetchCurrentPositionList, election } = this.props
      fetchCurrentPositionList(votechain, election.id)
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
    const { positionList, election } = this.props

    const headers = [
      {id: 'id', label: 'Position ID', searchable: true},
      {id: 'name', label: 'Name', searchable: true},
      {id: 'maxNoOfCandidatesThatCanBeSelected', label: 'Max No. of Candidates to be Elected', searchable: true},
      {id: 'hasAbstain', label: 'Voters can abstain'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <PositionTable 
          election={election}
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
  election: PropTypes.object,
}

const mapStateToProps = state => ({
  positionList: state.position.currentPositionList,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentPositionList
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionTableContainer)