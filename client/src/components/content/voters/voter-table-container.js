import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VoterTable from './voter-table'

class VoterTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddVoterDialog: false
    }

    this.getVoterList = this.getVoterList.bind(this)
    this.handleCloseAddVoterDialog = this.handleCloseAddVoterDialog.bind(this)
    this.handleOpenAddVoterDialog = this.handleOpenAddVoterDialog.bind(this)
  }
  

  getVoterList(electionData, election){
    if(electionData[election])
      return electionData[election].voters
    return []
  }

  handleCloseAddVoterDialog() {
    this.setState({ openAddVoterDialog: false })
  }
  
  handleOpenAddVoterDialog() {
    this.setState({ openAddVoterDialog: true })
  }

  render() {
    const { electionData, election } = this.props 
    const { openAddVoterDialog } = this.state

    const voterList = this.getVoterList(electionData, election)

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'student-number', label: 'Student Number'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <div>
        <VoterTable 
          headers={headers}
          voterList={voterList}

          openAddVoterDialog={openAddVoterDialog}
          handleOpenAddVoterDialog={this.handleOpenAddVoterDialog}
          handleCloseAddVoterDialog={this.handleCloseAddVoterDialog}
        />
      </div>
    )
  }
}

VoterTableContainer.propTypes = {
  election: PropTypes.string.isRequired,
  electionData: PropTypes.object.isRequired,
}

export default VoterTableContainer