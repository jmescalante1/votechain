import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CandidateTable from './candidate-table'

class CandidateTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddCandidateDialog: false
    }

    this.getCandidateList = this.getCandidateList.bind(this)
    this.handleCloseAddCandidateDialog = this.handleCloseAddCandidateDialog.bind(this)
    this.handleOpenAddCandidateDialog = this.handleOpenAddCandidateDialog.bind(this)
  }
  

  getCandidateList(electionData, election){
    if(electionData[election])
      return electionData[election].candidates
    return []
  }

  handleCloseAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: false })
  }
  
  handleOpenAddCandidateDialog() {
    this.setState({ openAddCandidateDialog: true })
  }

  render() {
    const { electionData, election } = this.props 
    const { openAddCandidateDialog } = this.state

    const candidateList = this.getCandidateList(electionData, election)

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'position', label: 'Position'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <div>
        <CandidateTable 
          headers={headers}
          candidateList={candidateList}

          openAddCandidateDialog={openAddCandidateDialog}
          handleOpenAddCandidateDialog={this.handleOpenAddCandidateDialog}
          handleCloseAddCandidateDialog={this.handleCloseAddCandidateDialog}
        />
      </div>
    )
  }
}

CandidateTableContainer.propTypes = {
  election: PropTypes.string.isRequired,
  electionData: PropTypes.object.isRequired,
}

export default CandidateTableContainer