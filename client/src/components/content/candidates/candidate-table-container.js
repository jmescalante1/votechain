import React, { Component } from 'react'

import CandidateTable from './candidate-table'

import { candidateData, electionList } from './candidate-data'

class CandidateTableContainer extends Component {
  render() {

    const headers = [
      {id: 'name', label: 'Name'},
      {id: 'election', label: 'Election'},
      {id: 'action', label: 'Position'},
    ]

    return (
      <div>
        <CandidateTable 
          headers={headers}
          candidateData={candidateData}
          electionList={electionList}
        />
      </div>
    )
  }
}

export default CandidateTableContainer