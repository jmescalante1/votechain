import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchCurrentVoterList } from '../../../actions/voter'

import VoterTable from './voter-table'

class VoterTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddVoterDialog: false,
      openEditVoterDialog: false,
      openDeleteVoterDialog: false,

      voterToBeEdited: {},
      voterToBeDeleted: {}
    }

    this.handleCloseAddVoterDialog = this.handleCloseAddVoterDialog.bind(this)
    this.handleOpenAddVoterDialog = this.handleOpenAddVoterDialog.bind(this)
  
    this.handleOpenEditVoterDialog = this.handleOpenEditVoterDialog.bind(this)
    this.handleCloseEditVoterDialog = this.handleCloseEditVoterDialog.bind(this)

    this.handleOpenDeleteVoterDialog = this.handleOpenDeleteVoterDialog.bind(this)
    this.handleCloseDeleteVoterDialog = this.handleCloseDeleteVoterDialog.bind(this)
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.electionId !== prevProps.electionId) {
      const { web3, votechain, fetchCurrentVoterList, electionId } = this.props
      fetchCurrentVoterList(web3, votechain, electionId)
    }
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
    const { openAddVoterDialog } = this.state
    const { voterList, electionId } = this.props

    const headers = [
      {id: 'id', label: 'Voter Address'},
      {id: 'name', label: 'Name'},
      {id: 'student-number', label: 'Student Number'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <Fragment>
        <VoterTable 
          electionId={electionId}
          headers={headers}
          voterList={voterList}

          openAddVoterDialog={openAddVoterDialog}
          handleOpenAddVoterDialog={this.handleOpenAddVoterDialog}
          handleCloseAddVoterDialog={this.handleCloseAddVoterDialog}

          handleOpenEditVoterDialog={this.handleOpenEditVoterDialog}
          handleOpenDeleteVoterDialog={this.handleOpenDeleteVoterDialog}
        />
      </Fragment>
    )
  }
}

VoterTableContainer.propTypes = {
  electionId: PropTypes.string.isRequired,
  
}

const mapStateToProps = state => ({
  voterList: state.voter.currentVoterList,
  web3: state.web3.web3,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentVoterList
}

export default connect(mapStateToProps, mapDispatchToProps)(VoterTableContainer)